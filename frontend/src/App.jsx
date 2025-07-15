import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop"; // ✅ import this
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import Facilities from './pages/Facilities/Facilities';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Downloads from './pages/Downloads/Downloads';
import ContactUs from './pages/ContactUs/ContactUs';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Gallery from './pages/Gallery/Gallery';
import UserRegister from './pages/UserRegister/UserRegister';

import ManageStudent from './pages/Admin/ManageStudent/ManageStudent';
// import HomeAdmin from './pages/Admin/HomeAdmin/HomeAdmin';
import AdminLayout from './pages/Admin/components/AdminLayout/AdminLayout';
import ManageCourse from './pages/Admin/ManageCourse/ManageCourse';
import StudyMaterial from './pages/Admin/StudyMaterial/StudyMaterial';
// import AdminLayout from './components/AdminLayout/AdminLayout';
import RegisterStudent from './pages/Admin/components/RegisterStudent/RegisterStudent'
import UpdateStudent from './pages/Admin/components/UpdateStudent/UpdateStudent';
import AddCourse from './pages/Admin/components/AddCourse/AddCourse';
import AddTestimonial from './pages/Admin/components/AddTestimonials/AddTestimonial';
import Testimonials from './pages/Admin/Testimonials/Testimonials';
import AddMaterial from './pages/Admin/components/AddMaterial/AddMaterial';
import Notifications from './pages/Notifications/Notifications';
import AddNotifications from './pages/Admin/components/AddNotifications/AddNotifications';
import ManageNotifications from './pages/Admin/ManageNotifications/ManageNotifications';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  // Hide Navbar/Footer for admin pages
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}
       <ScrollToTop />
      <div className='app'>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/facility' element={<Facilities />} />
          <Route path='/downloads' element={<Downloads />} />
          <Route path='/notifications' element={<Notifications/>}/>
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/register' element={<UserRegister />} />

          {/* Admin Routes wrapped in AdminLayout */}
          <Route path='/admin' element={<AdminLayout />}>
            {/* <Route index element={<HomeAdmin />} /> */}
            <Route path='manage-student' element={<ManageStudent/>} />
            <Route path='manage-course' element={<ManageCourse/>}/>
            <Route path='manage-testimonials' element={<Testimonials/>}/>
            <Route path= 'manage-download' element={<StudyMaterial/>}/>
            <Route path='manage-notifications' element={<ManageNotifications/>} />
            <Route path='register-student' element={<RegisterStudent/>} />
            <Route path='update-student/:id' element={<UpdateStudent/>}/>
            <Route path='add-course' element={<AddCourse/>}/>
            <Route path='add-testimonials' element={<AddTestimonial/>}/>
            <Route path='add-material' element={<AddMaterial/>}/>
            <Route path='add-notifications' element={<AddNotifications/>}/>
          </Route>

          <Route path='*' element={<h1>404 page not found</h1>} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
