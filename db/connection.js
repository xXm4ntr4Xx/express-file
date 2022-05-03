import pg from "pg";

const pool = new pg.Pool({
  database:'postgres',
  user:'postgres',
  password:"300488",
  host:'localhost',
  port:5432,
});

export default pool;
