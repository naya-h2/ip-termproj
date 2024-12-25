import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DATA = [
  {
    _id: "676c11a945853c22399ea175",
    name: "쥬시래스팅틴트",
    price: 4800,
    place: "올리브영",
    createdAt: "2024-12-25T14:07:37.144Z",
    updatedAt: "2024-12-25T14:07:37.144Z",
    __v: 0,
  },
  {
    _id: "676c1dbc45853c22399ea17a",
    name: "쥬시래스팅틴트",
    price: 9800,
    place: "올리브영",
    createdAt: "2024-12-25T14:59:08.478Z",
    updatedAt: "2024-12-25T14:59:08.478Z",
    url: "/",
    __v: 0,
  },
];

function ResultPage() {
  const { keyword } = useParams();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["result", keyword],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/search/${keyword}`);
      return res.data;
    },
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newKeyword = e.target.elements.searchBar.value;
    window.location.href = `/result/${newKeyword}`;
  };

  return (
    <>
      <form
        className="flex flex-col gap-1 my-6 text-[#3d3d3d]"
        onSubmit={handleSearchSubmit}
      >
        검색하신
        <SearchBar defaultValue={keyword} />
        <p className="text-end text-[#3d3d3d]">의 최저가를 찾아드릴게요.</p>
      </form>
      <main>
        <p className="text-gray-500 text-12 mb-1">
          가격 순으로 정렬한 검색 결과입니다.
        </p>
        {isLoading && <p>로딩중 ...</p>}
        {isSuccess && data.length > 0 ? (
          <div className="flex flex-col gap-2">
            {data.map((item, idx) => (
              <Card
                key={item._id}
                name={item.name}
                place={item.place}
                price={item.price}
                createdAt={item.createdAt}
                isMin={idx === 0}
                imgUrl={item.imgUrl}
                link={item.url}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6 items-center my-16">
            <div>데이터가 존재하지 않아요 😥</div>
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

export default ResultPage;
