import React from "react";
import "../styles/Sidebar.css";
import { FaHome, FaGlobe, FaPlus, FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h1 className="logo">D</h1>
      <nav className="nav">
        <a href="" className="nav-item" title="Главная">
          <FaHome />
        </a>
        <a href="" className="nav-item" title="Исследовать">
          <FaGlobe />
        </a>
        <a href="#" className="nav-item" title="Добавить">
          <FaPlus />
        </a>
        <a href="#" className="nav-item" title="О проекте">
          <FaInfo />
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
