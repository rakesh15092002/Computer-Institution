import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import "./Downloads.css";
import StoreContext from "../../context/StoreContext";

const Downloads = () => {
  const { url } = useContext(StoreContext);

  const [materials, setMaterials] = useState({
    notes: [],
    pyq: [],
    ebooks: [],
    assignments: [],
  });
  const [loading, setLoading] = useState(false);
  // NEW: State to track the active category for styling
  const [activeCategory, setActiveCategory] = useState("notes");

  const notesRef = useRef(null);
  const pyqRef = useRef(null);
  const ebooksRef = useRef(null);
  const assignmentsRef = useRef(null);

  // UPDATED: Function to scroll and set the active category
  const scrollToSection = (ref, categoryName) => {
    setActiveCategory(categoryName);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMaterials = async (category) => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/materials/${category}`);
      setMaterials((prev) => ({ ...prev, [category]: res.data }));
    } catch (err) {
      console.error(`❌ Failed to fetch ${category}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials("notes");
    fetchMaterials("pyq");
    fetchMaterials("ebooks");
    fetchMaterials("assignments");
  }, []);

  const renderMaterialItems = (items) => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (items.length === 0) {
      return <p>No materials found.</p>;
    }

    return items.map((item, index) => (
      <div className="download-material-item" key={index}>
        <div className="download-material-item-img">
          <img src={item.imgUrl} alt={item.title} />
        </div>
        <h2>{item.title}</h2>
        <div className="download-buttons">
          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
            <button className="view-btn"> View</button>
          </a>
        </div>
      </div>
    ));
  };

  return (
    <div className="material-section">
      {/* Category Buttons - UPDATED STRUCTURE */}
      <div className="material-title-items">
        {/* NOTES Button */}
        <div 
          className={`material-title-item ${activeCategory === "notes" ? "active-material-title-item" : ""}`}
          onClick={() => scrollToSection(notesRef, "notes")}
        >
          <section>Notes</section>
        </div>
        
        {/* PYQ Button */}
        <div 
          className={`material-title-item ${activeCategory === "pyq" ? "active-material-title-item" : ""}`}
          onClick={() => scrollToSection(pyqRef, "pyq")}
        >
          <section>PYQ</section>
        </div>
        
        {/* E-Books Button */}
        <div 
          className={`material-title-item ${activeCategory === "ebooks" ? "active-material-title-item" : ""}`}
          onClick={() => scrollToSection(ebooksRef, "ebooks")}
        >
          <section>E-Books</section>
        </div>
        
        {/* Assignments Button */}
        <div 
          className={`material-title-item ${activeCategory === "assignments" ? "active-material-title-item" : ""}`}
          onClick={() => scrollToSection(assignmentsRef, "assignments")}
        >
          <section>Assignments</section>
        </div>
      </div>

      {/* Notes Section */}
      <div className="download-material" ref={notesRef}>
        <div className="material-heading">
          <h1>Notes</h1>
        </div>
        <div className="download-material-items">
          {renderMaterialItems(materials.notes)}
        </div>
      </div>

      {/* PYQ Section */}
      <div className="download-material" ref={pyqRef}>
        <div className="material-heading">
          <h1>PYQ</h1>
        </div>
        <div className="download-material-items">
          {renderMaterialItems(materials.pyq)}
        </div>
      </div>

      {/* E-Books Section */}
      <div className="download-material" ref={ebooksRef}>
        <div className="material-heading">
          <h1>E-Books</h1>
        </div>
        <div className="download-material-items">
          {renderMaterialItems(materials.ebooks)}
        </div>
      </div>

      {/* Assignments Section */}
      <div className="download-material" ref={assignmentsRef}>
        <div className="material-heading">
          <h1>Assignments</h1>
        </div>
        <div className="download-material-items">
          {renderMaterialItems(materials.assignments)}
        </div>
      </div>
    </div>
  );
};

export default Downloads;