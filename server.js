import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "sushi",
  })
  .promise();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser());

app.get("/", async (req, res) => {
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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
