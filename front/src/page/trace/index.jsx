import { useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import dayjs from "dayjs";
import { PLACE_LIST } from "../../constants";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";

// Chart.js에 필요한 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TracePage() {
  const { keyword } = useParams();
  const [tab, setTab] = useState("공식 홈페이지");
  const [graphData, setGraphData] = useState(null);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["trace", keyword, tab],
    queryFn: async () => {
      const res = await instance.get(`/search/${keyword}/${tab}`);
      if (res.data.length === 0) return null;
      const labels = res.data.map((item) =>
        dayjs(item.createdAt).format("MM-DD")
      );
      const values = res.data.map((item) => item.price);
      return { labels, values };
    },
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newKeyword = e.target.elements.searchBar.value;
    if (!newKeyword) alert("검색어를 입력하세요.");
    else window.location.href = `/trace/${newKeyword}`;
  };

  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );

  useEffect(() => {
    if (isSuccess && data) {
      setGraphData({
        labels: data.labels,
        datasets: [
          {
            label: "가격",
            data: data.values,
            borderColor: "#ff8989",
            borderWidth: 1.5,
          },
        ],
      });
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>최저가 추적: {keyword}</title>
      </Helmet>
      <Header />
      <form
        className="flex flex-col gap-1 mt-[60px] mb-6 text-[#3d3d3d]"
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
            key={item}
            onClick={() => setTab(item)}
            className={`text-nowrap py-2 px-3 bg-white rounded-full cursor-pointer border border-gray-200 hover:text-pink-main ${
              tab === item && "!bg-black text-white border-none"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
      <main>
        <p className="text-gray-500 text-12 mb-1 mt-4">
          {dayjs(startDate).format("YYYY-MM-DD")} ~{" "}
          {dayjs(today).format("YYYY-MM-DD")} 데이터 기준
        </p>
        {isLoading && <p>로딩중 ...</p>}
        {isSuccess && data && graphData ? (
          <Line data={graphData} />
        ) : (
          <div className="flex flex-col gap-6 items-center my-16">
            <div>최근 한 달간 데이터가 존재하지 않아요 😥</div>
            <a
              href="/post"
              className="text-14 border-b text-pink-main border-b-pink-main"
            >
              데이터 추가하러 가기
            </a>
          </div>
        )}
      </main>
    </>
  );
}

export default TracePage;
