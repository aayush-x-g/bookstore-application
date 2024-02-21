import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBooks from "./pages/CreateBooks.js";
import DeleteBook from "./pages/DeleteBook.js";

const App = () => {
  return (
    <Routes>
      <Route path="" element = {CreateBooks}/>
      <Route path="" element = {DeleteBook}/>
    </Routes>
  )
};

export default App;
