import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../axios";
import { Helmet } from "react-helmet-async";

function ResultPage() {
  const { keyword } = useParams();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["result", keyword],
    queryFn: async () => {
      const res = await instance.get(`/search/${keyword}`);
      return res.data;
    },
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newKeyword = e.target.elements.searchBar.value;
    if (!newKeyword) alert("검색어를 입력하세요.");
    else window.location.href = `/result/${newKeyword}`;
  };

  return (
    <>
      <Helmet>
        <title>검색 결과: {keyword}</title>
      </Helmet>
      <form
        className="flex flex-col gap-1 my-6 text-[#3d3d3d]"
        onSubmit={handleSearchSubmit}
      >
        검색하신
        <SearchBar defaultValue={keyword} />
        <p className="text-end text-[#3d3d3d]">의 최저가를 찾아드릴게요.</p>
      </form>
      <main className="mb-32">
        <p className="text-gray-500 text-12 mb-1">
          가격 순으로 정렬한 검색 결과입니다.
        </p>
        {isLoading && <p>로딩중 ...</p>}
        {isSuccess && data.length > 0 ? (
          <div className="flex flex-col gap-2 items-center">
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
            <a
              href="/post"
              className="text-14 border-b text-pink-main border-b-pink-main text-center w-fit mt-6"
            >
              원하는 데이터가 없다면 직접 추가해 보세요.
            </a>
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
      <button
        className="fixedButton"
        onClick={() => (window.location.href = `/trace/${keyword}`)}
      >
        최저가 추적하기
      </button>
    </>
  );
}

export default ResultPage;
