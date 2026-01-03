import React from "react";
import Herosection from "./Herosection";
import Rooms from "./Rooms";
import Ourcoverage from "./Ourcoverage";
import Footer from "../Common/Footer";
import { useSelector } from "react-redux";
import AdminDashboard from "../Admin/AdminDashboard";
const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="md:mt-10">
      {user && user.role === "tenant" ? (
        <>
          {" "}
          <Herosection />
          <Ourcoverage />
          <Rooms />
          <Footer />
        </>
      ) : (
        <>
        <AdminDashboard/>
        </>
      )}
    </div>
  );
};

export default Dashboard;
