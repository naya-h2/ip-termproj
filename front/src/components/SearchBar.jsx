import searchIcon from "../asset/Search.svg";

function SearchBar({ keyword, setKeyword, defaultValue }) {
  return (
    <div className="relative w-full">
      <img
        className="absolute left-4 top-[14px]"
        src={searchIcon}
        alt="검색 아이콘"
      />
      <input
        className="searchBar w-full h-12 border border-pink-main rounded-3xl pr-4 pl-11 py-3"
        name="searchBar"
        value={keyword}
        onChange={setKeyword}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default SearchBar;
