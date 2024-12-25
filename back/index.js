const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config(); //dotenv 초기화

const mongoose = require("mongoose");
const Cosmetic = require("./models/cosmetic");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db 연결 완"))
  .catch(() => console.log("db 연결 실패"));

app.use(express.json());

app.get("/search/:keyword", async (req, res) => {
  try {
    const searchedData = await Cosmetic.find({ name: req.params.keyword });
    res.status(200).json(searchedData);
  } catch (err) {
    res.status(500).json({
      message: "데이터를 가져오는 데 실패하였습니다.",
      error: err.message,
    });
  }
});

app.get("/cosmetic", async (req, res) => {
  try {
    const cosmetics = await Cosmetic.find({});
    res.status(200).json(cosmetics);
  } catch (err) {
    res.status(500).json({
      message: "데이터를 가져오는 데 실패하였습니다.",
      error: err.message,
    });
  }
});

app.post("/cosmetic", async (req, res) => {
  try {
    const newCosmetic = new Cosmetic({
      name: req.body.name,
      price: req.body.price,
      place: req.body.place,
    });
    await newCosmetic.save(); //db에 저장
    res.status(201).json({
      message: "created successfully",
      data: newCosmetic,
    });
  } catch (err) {
    res.json({
      message: "생성에 실패하였습니다.",
      error: err.message,
    });
  }
});

app.listen(port);
