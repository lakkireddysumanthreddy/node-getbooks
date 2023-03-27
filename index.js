const express = require("express");
const app = express();

const path = require("path");
const dbpath = path.join(__dirname, "goodreads.db");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

let db = null;

const initaliseDBandServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("server running at");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initaliseDBandServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT * FROM book ORDER BY book_id;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
