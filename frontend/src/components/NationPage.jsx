import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/NationPage.css";

function NationPage() {
  const [nation, setNation] = useState();
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState();
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [question, setQuestion] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const image = document.querySelector(".zoom-image");
      if (image) {
        const baseSize = 90;
        const maxIncrease = 80;
        const increase = Math.min(scrollY / 8, maxIncrease);
        const newWidth = baseSize + increase;
        const newHeight = baseSize + increase;

        image.style.width = `${newWidth}vw`;
        image.style.height = `${newHeight}vh`;
        image.style.filter = `brightness(${100 + increase / 2}%)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [slug])

  useEffect(() => {
    const getNationData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/nation/${slug}`
        );
        if (!response.ok) {
          throw new Error("Network error");
        }
        const data = await response.json();
        setNation(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    getNationData();
  }, [slug]);



  if (!nation) return <div className="loading">Loading...</div>;
  const askAI = async (userQuestion) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuestion,
          nation_info: `
Название: ${nation.name}
Описание: ${nation.description}
История: ${nation.history}
Культура: ${nation.culture}
Язык: ${nation.language}
Религия: ${nation.religion}
Численность: ${nation.population}
                `,
        }),
      });
      const data = await response.json();
      setAiAnswer(data.answer);
      setLoading(false);
    } catch {
      setAiAnswer("Error");
    }
  };
  return (
    <>
      <div className="nation">
        <header className="nation-header">
          <h1 className="nation-title">{nation.name}</h1>
        </header>

        {nation.images[0] && (
          <div className="image-container">
            <img
              src={`${apiUrl}${nation.images[0].image}`}
              className="zoom-image"
              alt={nation.name}
            />
          </div>
        )}

        <section className="nation-description">
          <h2>Описание</h2>
          <p>{nation.description}</p>
        </section>

        <section className="nation-history">
          <h2>История</h2>
          <p>{nation.history}</p>
        </section>

        {nation.images[1] && (
          <div className="image-container">
            <img
              src={`${apiUrl}${nation.images[1].image}`}
              className="zoom-image"
              alt={nation.name}
            />
          </div>
        )}

        <section className="nation-culture">
          <h2>Культура</h2>
          <p>{nation.culture}</p>
        </section>

        <section className="nation-language">
          <h2>Язык</h2>
          <p>{nation.language}</p>
        </section>

        {nation.images[2] && (
          <div className="image-container">
            <img
              src={`${apiUrl}${nation.images[2].image}`}
              className="zoom-image"
              alt={nation.name}
            />
          </div>
        )}
        <section className="nation-religion">
          <h2>Религия</h2>
          <p>{nation.religion}</p>
        </section>

        <section className="nation-population">
          <h2>Численность</h2>
          <p>{Number(nation.population).toLocaleString("ru-RU")} человек</p>
        </section>

        <section className="ai-question-section">
          <h2>Узнать больше задав вопрос AI</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (question.trim()) {
                askAI(question);
              }
            }}
          >
            <input
              type="text"
              placeholder="Напишите вопрос..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="ai-input"
            />
            <button type="submit" className="ai-button" disabled={loading}>
              {loading ? "Загружается..." : "Спросить"}
            </button>
          </form>
          {aiAnswer && (
            <div className="ai-answer">
              <strong>Ответ:</strong>
              <h3>{aiAnswer}</h3>
            </div>
          )}
        </section>
        <div className="next-nation">
          <Link to={`/${nation.nextSlug}`} className="next-nation-link">
            <span className="arrow">→</span> Следующий народ
          </Link>
        </div>
        </div>
    </>
  );
}

export default NationPage;
