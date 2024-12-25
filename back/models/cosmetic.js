const mongoose = require("mongoose");

const cosmeticSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    searchName: { type: String },
    price: { type: Number, required: true },
    place: {
      type: String,
      enum: [
        "공식 홈페이지",
        "쿠팡",
        "올리브영",
        "무신사 뷰티",
        "지그재그",
        "에이블리",
      ],
      default: "공식 홈페이지",
      required: true,
    },
    url: { type: String, required: true },
    imgUrl: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cosmetic", cosmeticSchema);
