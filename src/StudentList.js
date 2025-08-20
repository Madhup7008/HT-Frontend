import React, { useEffect, useState } from "react";
import api from "./api";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // GET /api/students_with_fees
    api
      .get("/api/students_with_fees")
      .then((res) => {
        setStudents(res.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.phone || "").includes(search)
  );

  function getStatus(student) {
    if (!student.fees || student.fees.length === 0) return "No Fees";
    return student.fees.some((fee) => !fee.paid) ? "Unpaid" : "Paid";
    }

  return (
    <div className="fees-card">
      <h2>All Students & Fees Status</h2>
      <input
        type="search"
        className="search-input"
        placeholder="Search by name or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th className="wrap-cell">Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          )}
          {!loading && filtered.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#bbb" }}>
                No students found.
              </td>
            </tr>
          )}
          {!loading &&
            filtered.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td className="wrap-cell">{student.email}</td>
                <td>
                  <span
                    className={
                      getStatus(student) === "Paid" ? "badge-paid" : "badge-unpaid"
                    }
                  >
                    {getStatus(student)}
                  </span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedStudent(student)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedStudent && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedStudent(null)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Fee Details for {selectedStudent.name}</h3>
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Paid On</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.fees && selectedStudent.fees.length > 0 ? (
                  selectedStudent.fees.map((fee, idx) => (
                    <tr key={idx}>
                      <td>₹{fee.amount}</td>
                      <td>{fee.dueDate ? fee.dueDate.slice(0, 10) : "--"}</td>
                      <td>
                        <span className={fee.paid ? "badge-paid" : "badge-unpaid"}>
                          {fee.paid ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td>{fee.paidOn ? fee.paidOn.slice(0, 10) : "--"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      No fee records.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="btn" onClick={() => setSelectedStudent(null)} style={{ marginTop: 18 }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
