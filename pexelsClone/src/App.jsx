import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Saved from "./components/Saved";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("nature");
  const [loader, setLoader] = useState(true);
  const [saved, setSaved] = useState([]);

  const API_KEY = "5lnJ9DsAruSUhiu8RUzDz0bzESKKYwY1kzBiHCEGSqVkJWIFzytkUYTB";

  useEffect(() => {
    const fetchImage = async () => {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${search}&per_page=80`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      //console.log("resonse api=", res.data.photos);
      setLoader(false);
      setImages(res.data.photos);
      console.log(images);
    };
    const data = JSON.parse(localStorage.getItem("Images"))
    if(data){
      setSaved(data);
    }

    fetchImage();
  }, [search]);

  useEffect(() => {
    if(saved.length != 0) {
      const json = JSON.stringify(saved)
      localStorage.setItem("Images", json)
    }
  }, [saved])
 // console.log("image", saved)
  return (
    <>
      <Router>
        <Navbar setSearch={setSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                images={images}
                loader={loader}
                saved={saved}
                setSaved={setSaved}
              />
            }
          />
          <Route path="/saved" element={<Saved  saved={saved} loader={loader} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
