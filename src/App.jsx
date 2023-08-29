import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";

// import des pages

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Paiement from "./pages/Paiement";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [priceMini, setPriceMini] = useState("");
  const [sort, setSort] = useState("");

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };
  return (
    <>
      <Router>
        <Header
          setUser={setUser}
          token={token}
          handleToken={handleToken}
          setToken={setToken}
          search={search}
          setSearch={setSearch}
          priceMin={priceMini}
          setPriceMini={setPriceMini}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          sort={sort}
          setSort={setSort}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                setSearch={setSearch}
                priceMini={priceMini}
                setPriceMin={setPriceMini}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                sort={sort}
                setSort={setSort}
              />
            }
          />
          <Route path="/offers/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/paiement" element={<Paiement token={token} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
