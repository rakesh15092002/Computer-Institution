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

  const notesRef = useRef(null);
  const pyqRef = useRef(null);
  const ebooksRef = useRef(null);
  const assignmentsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMaterials = async (category) => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/materials/${category}`,
        
      );
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
        <p>{item.desc}</p>
        <div className="download-buttons">
          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
            <button className="view-btn">👁️ View</button>
          </a>
          <a href={item.fileUrl} download>
            <button className="download-btn">⬇️ Download</button>
          </a>
        </div>
      </div>
    ));
  };

  return (
    <div className="material-section">
      {/* Category Buttons */}
      <div className="material-title-items">
        <div className="material-title-item" onClick={() => scrollToSection(notesRef)}>
          <section>Notes</section>
        </div>
        <div className="material-title-item" onClick={() => scrollToSection(pyqRef)}>
          <section>PYQ</section>
        </div>
        <div className="material-title-item" onClick={() => scrollToSection(ebooksRef)}>
          <section>E-Books</section>
        </div>
        <div className="material-title-item" onClick={() => scrollToSection(assignmentsRef)}>
          <section>Assignments</section>
        </div>
      </div>

      {/* Notes Section */}
      <div className="download-material" ref={notesRef}>
        <div className="material-heading">
          <h1>Download your Notes</h1>
        </div>
        <div className="download-material-items">
          {renderMaterialItems(materials.notes)}
        </div>
      </div>

      {/* PYQ Section */}
      <div className="download-material" ref={pyqRef}>
        <div className="material-heading">
          <h1>Download your PYQ</h1>
        </div>
        <div className="download-material-items">
          {renderMaterialItems(materials.pyq)}
        </div>
      </div>

      {/* E-Books Section */}
      <div className="download-material" ref={ebooksRef}>
        <div className="material-heading">
          <h1>Download your E-Books</h1>
        </div>
        <div className="download-material-items">
          {renderMaterialItems(materials.ebooks)}
        </div>
      </div>

      {/* Assignments Section */}
      <div className="download-material" ref={assignmentsRef}>
        <div className="material-heading">
          <h1>Download your Assignments</h1>
        </div>
        <div className="download-material-items">
          {renderMaterialItems(materials.assignments)}
        </div>
      </div>
    </div>
  );
};

export default Downloads;
