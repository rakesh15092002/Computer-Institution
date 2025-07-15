import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./StudyMaterial.css";
import axios from "axios";
import StoreContext from "../../../context/StoreContext";
import { toast } from "react-toastify";

const StudyMaterial = () => {
  console.log("hi")
  const { url, token } = useContext(StoreContext);
  const [materials, setMaterials] = useState({
    notes: [],
    pyq: [],
    ebooks: [],
    assignments: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = ["notes", "pyq", "ebooks", "assignments"];

  useEffect(() => {
    fetchAllMaterials();
  }, [url]);

  const fetchAllMaterials = async () => {
    setLoading(true);
    setError(null);

    try {
      const allData = {};
      for (const category of categories) {
        const res = await axios.get(`${url}/api/materials/${category}`);
        if (Array.isArray(res.data)) {
          allData[category] = res.data.map((mat, index) => ({
            id: index + 1,
            title: mat.title,
            description: mat.desc,
            category: mat.category,
            fileUrl: mat.fileUrl,
            _id: mat._id,
          }));
        } else {
          allData[category] = [];
        }
      }
      setMaterials(allData);
    } catch (err) {
      console.error("❌ Error fetching materials:", err);
      setError("Error fetching materials");
      toast.error("❌ Error fetching materials");
    }

    setLoading(false);
  };

  const handleRemove = async (id, category) => {
    const confirm = window.confirm("Are you sure you want to delete this material?");
    if (!confirm) return;

    try {
      const res = await axios.delete(`${url}/api/materials/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        toast.success("🗑️ Material deleted successfully");
        setMaterials((prev) => ({
          ...prev,
          [category]: prev[category].filter((item) => item._id !== id),
        }));
      } else {
        toast.error("❌ Failed to delete material");
      }
    } catch (error) {
      toast.error("❌ Error deleting material");
      console.error(error);
    }
  };

  return (
    <div className="study-material">
      <div className="heading-study-material">
        <h2>Study Materials</h2>
        <div className="registration-button">
          <button onClick={() => navigate("/admin/add-material")}>
            Add New Download
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        categories.map((cat) => (
          <div key={cat} style={{ marginBottom: "40px" }}>
            <h3 style={{ textTransform: "capitalize", marginBottom: "10px" }}>
              {cat}
            </h3>
            <div className="material-table">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>File</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {materials[cat]?.length > 0 ? (
                    materials[cat].map((mat) => (
                      <tr key={mat._id}>
                        <td>{mat.id}</td>
                        <td>{mat.title}</td>
                        <td>{mat.description}</td>
                        <td>{mat.category}</td>
                        <td>
                          {mat.fileUrl ? (
                            <a
                              href={mat.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View/Download
                            </a>
                          ) : (
                            "No file"
                          )}
                        </td>
                        <td>
                          <button
                            className="remove-btn"
                            onClick={() => handleRemove(mat._id, cat)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No materials found in this category
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StudyMaterial;
