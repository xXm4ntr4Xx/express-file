import db from "../../connection.js";



const createTable = async ()=>{
  const response = await db.query(
    `CREATE TABLE IF NOT EXISTS cocktails (id SERIAL PRIMARY KEY, name TEXT, image TEXT, ingridients TEXT , instructions TEXT);`
  );
 console.log(response)
}

// db.end();

createTable();
