import mysql from "mysql2";

export const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "sushi",
  })
  .promise();

export async function getCatalogItems() {
  const [rows] = await pool.query("SELECT * FROM catalog");
  return rows;
}

export async function getLastId() {
  const [rows] = await pool.query(
    "SELECT id FROM orders ORDER BY id DESC LIMIT 1"
  );
  return rows;
}

// export async function getLastId() {
//   const [rows] = pool.mysqli_insert_id()
//   return rows;
// }
