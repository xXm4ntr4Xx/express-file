import pg from "pg";

// const pool = new pg.Pool({
//   database:'postgres',
//   user:'postgres',
//   password:"300488",
//   host:'localhost',
//   port:5432,
// });

const pool = new pg.Pool({
  host:process.env.DB_HOST,
  database:process.env.DB_DATABASE,
  user:process.env.DB_USER,
  port:process.env.DB_PORT,
  password:process.env.DB_PASSWORD,
  ssl:{rejectUnauthorized:false}
});

export default pool;
