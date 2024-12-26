const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config(); //dotenv 초기화

const cors = require("cors");
const mongoose = require("mongoose");
const Cosmetic = require("./models/cosmetic");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db 연결이 완료되었습니다."))
  .catch(() => console.log("db 연결에 실패하였습니다."));

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.json());
app.use(cors(corsOptions));

//한 달 간 브랜드 별 데이터 검색
app.get("/search/:keyword/:place", async (req, res) => {
  try {
    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const normalizedKeyword = req.params.keyword.replace(/\s+/g, "");
    const regex = new RegExp(normalizedKeyword, "i");

    const searchedData = await Cosmetic.find({
      searchName: { $regex: regex },
      createdAt: {
        $gte: startDate,
        $lte: today,
      },
      place: req.params.place,
    }).sort({ price: 1 });
    res.status(200).json(searchedData);
  } catch (err) {
    res.status(500).json({
      message: "데이터를 가져오는 데 실패하였습니다.",
      error: err.message,
    });
  }
});

//name으로 검색
app.get("/search/:keyword", async (req, res) => {
  try {
    const startDate = new Date(); //하루 전으로 설정
    startDate.setDate(startDate.getDate() - 1);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();

    const normalizedKeyword = req.params.keyword.replace(/\s+/g, "");
    const regex = new RegExp(normalizedKeyword, "i");

    const searchedData = await Cosmetic.find({
      searchName: { $regex: regex },
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ price: 1 });
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
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const already = await Cosmetic.find({
      name: req.body.name,
      place: req.body.place,
      price: req.body.price,
      createdAt: { $gte: start, $lte: end },
    });
    if (already.length > 0) throw Error("이미 동일한 데이터가 존재합니다.");

    const newCosmetic = new Cosmetic({
      name: req.body.name,
      searchName: req.body.name.replace(/\s+/g, ""),
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
    res.status(400).json({
      message: "생성에 실패하였습니다.",
      error: err.message,
    });
  }
});

app.listen(port);
