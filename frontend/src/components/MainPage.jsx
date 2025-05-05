import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";

function MainPage() {
  const navigate = useNavigate();
  const [nations, setNations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    const fetchNations = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/nation");
        if (!response.ok) {
          throw new Error("Fetch error");
        }
        const data = await response.json();
        setNations(data);
      } catch {
        console.log("Catched fetch error.");
      }
    };
    fetchNations();
  }, []);

  return (
    <div className="Main fade-in-bg">
      <div className="main-content slide-up">
        <h1>Добро пожаловать</h1>
        <p>Исследуйте культуры, людей и наследие мира</p>

        <div className="search-and-button">
          <input
            type="text"
            placeholder="Поиск народа..."
            className="search-bar"
            value={searchTerm}
            onChange= {(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <button onClick={() => navigate("/map")} className="explore-button">
            🌍 Исследовать карту
          </button>
        </div>
        <div className="nation-cards-container">
        {nations
  .filter((nation) =>
    nation.name.toLowerCase().includes(searchTerm) || nation.slug.toLowerCase().includes(searchTerm)
  )
  .slice(0,3)
  .map((nation) => (
    <div
      className="nation-card"
      key={nation.slug}
      onClick={() => navigate(`/${nation.slug}`)}
      style={{
        backgroundImage: `url(http://localhost:8000${nation.images[0]?.image})`,
      }}
    >
      <div className="overlay">
        <h3>{nation.name}</h3>
      </div>
    </div>
))}

        </div>
      </div>
    </div>
  );
}

export default MainPage;
