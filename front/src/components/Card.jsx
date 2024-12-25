import dayjs from "dayjs";

function Card({ name, place, price, isMin, createdAt, imgUrl, link }) {
  return (
    <div
      className={`rounded-lg px-4 py-3 bg-white/75 flex gap-2 ${
        isMin && "border border-pink-main"
      }`}
      onClick={() => window.open(link, "_blank")}
    >
      <img
        src={imgUrl}
        alt="상품 이미지"
        className="w-[96px] h-[96px] flex-shrink-0 bg-pink-bg rounded-sm"
      />
      <div className="flex flex-col gap-1 text-14 w-full">
        <p className={`font-medium text-16 ${isMin && "text-pink-main"}`}>
          {place}
        </p>
        <p>{name}</p>
        <p
          className={`text-18 font-bold text-end ${isMin && "text-pink-main"}`}
        >
          {price.toLocaleString("ko-kr")} 원
        </p>
        <p className="text-12 text-gray-400 text-end">
          {dayjs(createdAt).format("YYYY-MM-DD")} 기준
        </p>
      </div>
    </div>
  );
}

export default Card;
