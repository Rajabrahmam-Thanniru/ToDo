const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./routers/userRoutes');
const loginRoutes = require('./routers/LoginRoute');
const taskRoutes = require('./routers/postTaskRoute');
const homeRoutes = require("./routers/HomeRoute");
const deleteToDo = require("./routers/DeleteToDoRoute");
const updateToDo = require("./routers/editToDoRoute");
const profileRoute = require("./routers/profileRoute");
const editProfile = require("./routers/editProfile");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization,x-api-key",
  })
);

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e);
  });

app.use('/user', userRoutes);
app.use('/auth', loginRoutes);
app.use('/task', taskRoutes);
app.use('/users', homeRoutes);
app.use('/delete-ToDo', deleteToDo);
app.use('/update-ToDo', updateToDo);
app.use('/profile', profileRoute);
app.use('/user',editProfile);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
