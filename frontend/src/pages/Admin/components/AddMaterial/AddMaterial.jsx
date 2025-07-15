import React, { useContext, useState } from 'react';
import axios from 'axios';
import './AddMaterial.css';
import StoreContext from '../../../../context/StoreContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMaterial = () => {
  const { url, token } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    category: '',
  });
  const [file, setFile] = useState(null);        // PDF
  const [image, setImage] = useState(null);      // Image

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.warn('Please upload the material file (PDF)');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append('file', file);           // PDF
    if (image) {
      data.append('image', image);       // Image (optional)
    }

    try {
      const res = await axios.post(`${url}/api/materials/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('✅ Material uploaded successfully!');
      setFormData({ title: '', desc: '', category: '' });
      setFile(null);
      setImage(null);
    } catch (err) {
      toast.error('❌ Upload failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="add-material-container">
      <h2>Add Material</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="desc"
          placeholder="Enter Description"
          value={formData.desc}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="notes">Notes</option>
          <option value="pyq">PYQ</option>
          <option value="ebooks">Ebooks</option>
          <option value="assignments">Assignments</option>
        </select>

        <label>Upload Preview Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <label>Upload Material File (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Upload Material</button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AddMaterial;
