import express from "express";

const app = express();

app.get('/', (req, res) => {
   res.send('hello pern stack')
})

app.listen(3000, () => {
   console.log(`Server is listenning on Port 3000`)
})