import React from "react";
import "../styles/Sidebar.css";
import { FaHome, FaGlobe, FaPlus, FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h1 className="logo">D</h1>
      <nav className="nav">
        <Link to="/" className="nav-item">
        <FaHome />
        </Link>
        <Link to="/map" className="nav-item"><FaGlobe /></Link>
        <Link to="/add" className="nav-item" ><FaPlus /></Link>
      </nav>
    </div>
  );
}

export default Sidebar;
