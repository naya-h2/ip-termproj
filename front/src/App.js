import { Route, Routes } from "react-router-dom";
import SearchPage from "./page/search";
import ResultPage from "./page/result";
import PostPage from "./page/post";
import TracePage from "./page/trace";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/result/:keyword" element={<ResultPage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/trace/:keyword" element={<TracePage />} />
    </Routes>
  );
}

export default App;
