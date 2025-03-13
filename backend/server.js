import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); //Helmet is a security middleware that helps you protect your app by setting various HTTP headers 
app.use(morgan('dev')) //Log http requests

app.get('/api/products', productRoutes )

app.listen(PORT, () => {
   console.log(`Server is listenning on Port ${PORT}`)
})