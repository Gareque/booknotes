import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import methodOverride from "method-override";

// Import the .env file
dotenv.config();

const app = express();
const port = 3000;

// Configuring the database
const db = new pg.Client({
  user: process.env.User,
  host: process.env.Host,
  database: process.env.Db,
  password: process.env.Password,
  port: process.env.Port,
});

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
db.connect();

let items = [];

//Set up the root path to show all books listed
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY id ASC");
    items = result.rows;

    res.render("index.ejs", {
      books: items,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving books");
  }
});

app.get("/title", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY title ASC")
    items = result.rows;

    res.render("index.ejs", {
      books: items,
    }); 
  } catch (err) {
      console.error(err);
    }
});

app.get("/author", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY author ASC");
    items = result.rows;

    res.render("index.ejs", {
      books: items,
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/rating", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY rating ASC");
    items = result.rows;

    res.render("index.ejs", {
      books: items,
    });
  } catch (err) {
    console.error(err);
  }
});

// Show the form for editing book entries
app.get("/books/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    const book = result.rows[0];
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.render("edit", { book });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, rating, comments, isbn } = req.body;

  if (Number(rating) > 10) {
    return res.status(400).send("Rating must not be greater than 10");
  }
  
  try {
      await db.query(
        "UPDATE books SET title=$1, author=$2, rating=$3, comments=$4, isbn=$5 WHERE id=$6",
        [title, author, rating, comments, isbn, id]
      );
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
