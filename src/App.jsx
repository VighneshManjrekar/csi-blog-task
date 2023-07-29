import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.component";
import Upload from "./components/Upload.component";
import Home from "./components/Home.component";
import Blog from "./components/Blog.component";
import NotFound from "./components/NotFound.component";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="upload" element={<Upload />} />
        <Route path="blog/:id" element={<Blog />} />
        <Route path="blog/edit/:id" element={<Upload />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
