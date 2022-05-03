import db from "../../connection.js";

const response = db.query(
  `CREATE TABLE IF NOT EXISTS cocktails (id SERIAL PRIMARY KEY, name TEXT, image TEXT, ingridients TEXT , instructions TEXT);`
);

console.log(response);

db.end();
