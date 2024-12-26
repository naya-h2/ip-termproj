import { useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import dayjs from "dayjs";
import { PLACE_LIST } from "../../constants";
import { useState } from "react";

function TracePage() {
  const [tab, setTab] = useState("공식 홈페이지");

  const { keyword } = useParams();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newKeyword = e.target.elements.searchBar.value;
    if (!newKeyword) alert("검색어를 입력하세요.");
    else window.location.href = `/trace/${newKeyword}`;
  };

  const today = new Date();

  return (
    <div>
      <form
        className="flex flex-col gap-1 my-6 text-[#3d3d3d]"
        onSubmit={handleSearchSubmit}
      >
        검색하신
        <SearchBar defaultValue={keyword} />
        <p className="text-end text-[#3d3d3d]">
          의 <span className="font-medium">한 달간 최저가</span>를 추적할게요.
        </p>
      </form>
      <div className="flex gap-[6px] overflow-x-scroll hiddenScroll">
        {PLACE_LIST.map((item) => (
          <span
            onClick={() => setTab(item)}
            className={`text-nowrap py-2 px-3 bg-white rounded-full cursor-pointer border border-gray-200 hover:text-pink-main ${
              tab === item && "bg-black text-white border-none"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
      <main>
        <p className="text-gray-500 text-12 mb-1 mt-2">
          {dayjs(today).format("YYYY-MM")} 기준
        </p>
      </main>
    </div>
  );
}

export default TracePage;
