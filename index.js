import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";

import mysql from "mysql2";

config();

const pool = mysql
  .createPool({
    // host: "b83ybiotvmvzs5niqhbd-mysql.services.clever-cloud.com",
    // user: "uzfwuahfcjvpnazq",
    // password: "OgxJmrjP9DnFoRXRGyt6",
    // database: "b83ybiotvmvzs5niqhbd",
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
  })
  .promise();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser());
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

app.use("/", async (req, res) => {
  pool.query("SELECT * FROM catalog").then(function (data) {
    res.json(data[0]);
  });
});

app.post("/newOrder", async (req, res) => {
  const data = [
    req.body.id,
    req.body.number,
    req.body.name,
    req.body.address_delivery,
    req.body.address_pickup,
    req.body.comment,
    req.body.type_delivery,
    req.body.type_pay,
    req.body.total_price,
  ];

  pool.query(
    "INSERT INTO `orders`(`id`, `number`, `name`, `address_delivery`, `address_pickup`, `comment`, `type_delivery`, `type_pay`, `total_price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    data,
    (err, results, fields) => {
      !err ? res.json(results) : res.json(err);
    }
  );
});

app.post("/newCart", async (req, res) => {
  const data = [
    req.body.id,
    req.body.order_id,
    req.body.product_id,
    req.body.imageUrl,
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.weight,
    req.body.amount,
    req.body.count,
  ];

  pool.query(
    "INSERT INTO `cart`(`id`, `order_id`, `product_id`, `imageUrl`, `name`, `description`, `price`, `weight`, `amount`, `count`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    data,
    (err, results, fields) => {
      !err ? res.json(results) : res.json(err);
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
