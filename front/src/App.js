import { Route, Routes } from "react-router-dom";
import SearchPage from "./page/search";
import ResultPage from "./page/result";

function App() {
  return (
    <Routes>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/result/:keyword" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
