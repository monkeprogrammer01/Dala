import React, { useState } from "react";
import "../styles/AddNationForm.css";

function AddNationForm() {
  const [suggestion, setSuggestion] = useState("");
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      alert("Пожалуйста, введите сообщение.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/nation/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ suggestion: suggestion }),
      });

      if (response.ok) {
        alert("Спасибо за ваше предложение!");
        setSuggestion("");
      } else {
        alert("Ошибка при отправке.");
      }
    } catch (error) {
      alert("Ошибка при подключении к серверу.");
    } finally {
        setSuggestion("")
    }
  };

  return (
    <form className="add-nation-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Ваше предложение</h2>
      <div className="form-group">
        <label className="form-label" htmlFor="suggestion">
          Напишите, какую информацию о народе вы бы хотели видеть на сайте
        </label>
        <textarea
          id="suggestion"
          name="suggestion"
          className="form-input"
          rows="5"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Ваше мнение..."
        />
      </div>
      <button type="submit" className="submit-button">
        Отправить
      </button>
    </form>
  );
}

export default AddNationForm;
