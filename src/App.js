import React, {createContext, useState} from "react";
import {Routes, Route} from "react-router-dom";

import './scss/app.scss';

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

export const SearchContext = createContext(null)

const App = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue}/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
