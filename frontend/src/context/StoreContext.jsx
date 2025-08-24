// context/StoreContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const StoreContext = createContext({});

export const StoreContextProvider = ({ children }) => {
  const url = import.meta.env.VITE_APP_BACKEND_BASE_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [course_list, setCourseList] = useState([]); // ✅ course_list is an array now

  // 🧠 Fetch all courses from backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${url}/api/course/get`);
      if (response.data.success) {
        setCourseList(response.data.courses); // ✅ save to course_list
      } else {
        console.error("⚠️ Failed to fetch courses:", response.data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching courses:", error.message);
    }
  };

  // Optionally auto-fetch on app load
  useEffect(() => {
    fetchCourses();
  }, []);

  // Sync with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [role]);

  const logout = () => {
    setToken("");
    setRole("");
  };

  const contextValue = {
    url,
    token,
    setToken,
    role,
    setRole,
    logout,
    course_list,     // ✅ array of all courses
    fetchCourses,    // ✅ function to fetch courses
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
