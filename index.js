const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const booksRouter = require('./routes/books')
require("dotenv").config();

const PORT = process.env.PORT || 3003;
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ books: [] }).write();

const app = express();

app.db = db;

app.use(cors());
app.use(express.json);
app.use(morgan("dev"));

app.use('/books', booksRouter)

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));