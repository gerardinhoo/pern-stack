import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcject.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); //Helmet is a security middleware that helps you protect your app by setting various HTTP headers 
app.use(morgan('dev')) //Log http requests

app.use('/api/products', productRoutes )


// Apply Arcject rate-limit to all routes

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1 // specifies that each request consumes 1 token
    });

    if(decision.isDenied()) {
      if(decision.reason.isRateLimit()) {
        res.status(429).json({error: "Too many requests"})
      } else if(decision.reason.isBot()) {
        res.status(403).json({error: "Bot Access denied"})
      } else {
        res.status(403).json({error: "Forbidden"})
      }
      return;
    }

    // Check for spoofed bots
    if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({error: "Spoofed Bot Detected"});
      return;
    }
    next();
    
  } catch (error) {
    console.log("Arcjet error", error);
    next(error)
  }
})






// Create table for the database
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('DB initialized successfully')
  } catch (error) {
    console.log('Error in initDB', error)
  }
}

initDB().then(() => {
   app.listen(PORT, () => {
      console.log(`Server is listenning on Port ${PORT}`)
   })
})





