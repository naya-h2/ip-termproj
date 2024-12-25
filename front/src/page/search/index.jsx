import logo from "../../asset/logo.svg";
import SearchBar from "../../components/SearchBar";

function SearchPage() {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newKeyword = e.target.elements.searchBar.value;
    window.location.href = `/result/${newKeyword}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center pt-[128px] pb-6 gap-1">
        <img src={logo} alt="logo" className="w-[230px] h-[43px]" />
        <p className="text-12 text-[#9c9c9c]">
          화장품 이름을 검색하여 가격을 비교해 보세요.
        </p>
      </div>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSearchSubmit}
      >
        <SearchBar />
        <button className="w-[134px] my-24">검색하기</button>
      </form>
      <a
        href="/post"
        className="text-14 border-b text-pink-main border-b-pink-main"
      >
        원하는 정보가 없으신가요?
      </a>
    </div>
  );
}

export default SearchPage;
