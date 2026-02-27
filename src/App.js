import "./App.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const [category, setCategory] = useState("business");
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const path = location.pathname.slice(1);
    if (path && path !== category) {
      setCategory(path);
    }
  }, [location, category]);

  useEffect(() => {
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    document.title = `News Monkey - ${categoryTitle}`;
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setNotFoundMessage("");
    navigate(`/${newCategory}`);
  };

  const handleNotFound = (message) => {
    setNotFoundMessage(message);
    setTimeout(() => {
      setNotFoundMessage("");
    }, 1000); // Clear the message after 1 second
  };

  return (
    <div>
      <NavBar
        category={category}
        handleCategoryChange={handleCategoryChange}
        handleNotFound={handleNotFound}
      />
      {notFoundMessage && (
        <div className="alert alert-danger" role="alert">
          {notFoundMessage}
        </div>
      )}
      <Routes>
        <Route path="/" element={<News key="home" category="business" />} />
        <Route path="/business" element={<News key="business" category="business" />} />
        <Route path="/health" element={<News key="health" category="health" />} />
        <Route path="/technology" element={<News key="technology" category="technology" />} />
        <Route path="/general" element={<News key="general" category="general" />} />
        <Route path="/sports" element={<News key="sports" category="sports" />} />
        <Route path="/entertainment" element={<News key="entertainment" category="entertainment" />} />
        <Route path="/science" element={<News key="science" category="science" />} />
        <Route path="/politics" element={<News key="politics" category="politics" />} />
        <Route path="/india" element={<News key="india" category="india" />} />
      </Routes>
    </div>
  );
}
