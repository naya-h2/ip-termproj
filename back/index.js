const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config(); //dotenv 초기화

const mongoose = require("mongoose");
const Cosmetic = require("./models/cosmetic");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db 연결이 완료되었습니다."))
  .catch(() => console.log("db 연결에 실패하였습니다."));

app.use(express.json());

app.get("/search/:keyword/all", async (req, res) => {
  try {
    const searchedData = await Cosmetic.find({
      name: req.params.keyword,
    });
    res.status(200).json(searchedData);
  } catch (err) {
    res.status(500).json({
      message: "데이터를 가져오는 데 실패하였습니다.",
      error: err.message,
    });
  }
});

app.get("/search/:keyword", async (req, res) => {
  try {
    const startDate = new Date(); //하루 전으로 설정
    startDate.setDate(startDate.getDate() - 1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();

    // console.log(startDate, endDate);

    const searchedData = await Cosmetic.find({
      name: req.params.keyword,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res.status(200).json(searchedData);
  } catch (err) {
    res.status(500).json({
      message: "데이터를 가져오는 데 실패하였습니다.",
      error: err.message,
    });
  }
});

//전체 데이터 가져오기
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

//data 생성
app.post("/cosmetic", async (req, res) => {
  try {
    const today = new Date();
    const already = await Cosmetic.find({
      name: req.body.name,
      price: req.body.price,
      createdAt: today,
    });
    if (already) throw Error("이미 동일한 데이터가 존재합니다.");

    const newCosmetic = new Cosmetic({
      name: req.body.name,
      price: req.body.price,
      place: req.body.place,
      url: req.body.url,
      imgUrl: req.body.imgUrl,
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
