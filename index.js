import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booknotes",
  password: "",
  port: 5432
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
db.connect();

let items = [];

app.get("/", async (req, res) => {
  try {
  const result = await db.query("SELECT * FROM books ORDER BY id ASC");
  items = result.rows;

  res.render("index.ejs", {
    books: items
  });
} catch (err) {
  console.log(err);
  res.status(500).send("Error retrieving books");
}
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
