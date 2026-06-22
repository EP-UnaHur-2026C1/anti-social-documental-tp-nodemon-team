const express = require('express')
const connectToDatabase = require('./config/db')
const PORT = process.env.PORT || 3000
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require("./routes/commentRoutes")
const userRoutes = require("./routes/userRoutes")
const tagRoutes = require("./routes/tagRoutes")

const app = express()

app.use(express.json());
app.use('/post', postRoutes);
app.use("/comment",commentRoutes)
app.use("/user", userRoutes)
app.use("/tag",tagRoutes)

async function startServer() {
  await connectToDatabase(); 
  app.listen(PORT, () => {
    console.log(`App iniciada en el puerto ${PORT}`);
  });
}

startServer();
