import React, { useState } from "react";
import AddFee from "./AddFee";
import FeeList from "./FeeList";
import RegisterStudent from "./RegisterStudent";
import StudentList from "./StudentList";
import UnpaidFees from "./UnpaidFees";
import "./styles.css";

export default function App() {
  const [tab, setTab] = useState("register");

  return (
    <div className="container">
      <div className="header-logo">
        <div className="logo-box">
          <h1>Hostel Tuition – Admin</h1>
          <p className="subtitle">Manage students & fees</p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={tab === "register" ? "active-tab" : ""}
          onClick={() => setTab("register")}
        >
          Register Student
        </button>
        <button
          className={tab === "add-fee" ? "active-tab" : ""}
          onClick={() => setTab("add-fee")}
        >
          Add Fee
        </button>
        <button
          className={tab === "fees" ? "active-tab" : ""}
          onClick={() => setTab("fees")}
        >
          All Fees
        </button>
        <button
          className={tab === "unpaid" ? "active-tab" : ""}
          onClick={() => setTab("unpaid")}
        >
          Unpaid Fees
        </button>
        <button
          className={tab === "students" ? "active-tab" : ""}
          onClick={() => setTab("students")}
        >
          Students
        </button>
      </div>

      {tab === "register" && <RegisterStudent />}
      {tab === "add-fee" && <AddFee />}
      {tab === "fees" && <FeeList />}
      {tab === "unpaid" && <UnpaidFees />}
      {tab === "students" && <StudentList />}
    </div>
  );
}
