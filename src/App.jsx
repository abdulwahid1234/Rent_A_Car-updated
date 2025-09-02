import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import BookingsPage from "./pages/BookingsPage";
import DriversPage from "./pages/DriversPage";
import MessagesPage from "./pages/MessagesPage";
import HelpPage from "./pages/HelpPage";
import TransactionsPage from "./pages/TransactionsPage";
import StatisticsPage from "./pages/StatisticsPage";
import CarOwnerRegistration from "./pages/CarOwnerRegistration";
import Login from "./layout/Login";
import Signup from "./layout/Signup";
import Cars from "./pages/AddCars/Cars.jsx";
import UserLanding from './pages/User/UserLanding/UserLanding.jsx'
import OperatorManagement from "./pages/OperatorManagement.jsx"
import PrivateRoute from "./AuthContext/PrivateRoute";
import AuthProvider from "./AuthContext/AuthContext.jsx";
import Profile from "./layout/Profile.jsx";
import ChangePassword from "./layout/ChangePassword.jsx";
import { Toaster } from "react-hot-toast";
import BookingLayout from "./pages/User/BookingLayout.jsx";
import UserSignUp from "./pages/User/UserSignUp/UserSignUp.jsx";
import UserLogin from './pages/User/UserLogin/UserLogin.jsx'
import Customers from "./pages/Customers.jsx";
//import "./dark-mode.css";  // After importing index.css

const App = () => {
  return (
    <AuthProvider >
      
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="register-car" element={<CarOwnerRegistration />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="customer" element={<Customers/>} />
          <Route path="cars" element={<Cars />} />
          <Route path="/operator-management" element={<OperatorManagement />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="change-password" element={<ChangePassword/>} />
          <Route path="user" element={<UserLanding/>} />
          <Route path="booking" element={<BookingLayout/>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;



// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import MainLayout from "./layout/MainLayout";
// import Dashboard from "./pages/Dashboard";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
// import BookingsPage from './pages/BookingsPage';
// import DriversPage from './pages/DriversPage';
// import MessagesPage from './pages/MessagesPage';
// import HelpPage from './pages/HelpPage';
// import TransactionsPage from './pages/TransactionsPage';
// import StatisticsPage from "./pages/StatisticsPage";
// import CarOwnerRegistration from "./pages/CarOwnerRegistration";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="bookings" element={<BookingsPage />} />
//         <Route path="/register-car" element={<CarOwnerRegistration/>} />
//         <Route path="drivers" element={<DriversPage />} />
//         <Route path="messages" element={<MessagesPage />} />
//         <Route path="transactions" element={<TransactionsPage />} />
//         <Route path="statistics" element={<StatisticsPage />} />
//         <Route path="reports" element={<Reports />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="help" element={<HelpPage />} />
      
//       </Route>
//     </Routes>
//   );
// };

// export default App;
