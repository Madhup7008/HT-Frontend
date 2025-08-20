import React, { useState, useEffect } from "react";
import api from "./api";

export default function FeeList() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);

  const fetchFees = () => {
    setLoading(true);
    // GET /all_fees
    api
      .get("/all_fees")
      .then((res) => setFees(res.data || []))
      .catch(() => setFees([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleTogglePaid = async (fee) => {
    setUpdating(fee._id);
    try {
      // PUT /update_fee/:feeId
      await api.put(`/update_fee/${fee._id}`, { paid: !fee.paid });
      fetchFees();
    } catch (err) {
      alert(err.message || "Failed to update payment status");
    } finally {
      setUpdating(null);
    }
  };

  const filteredFees = fees.filter((fee) => {
    if (filter === "paid") return fee.paid;
    if (filter === "unpaid") return !fee.paid;
    return true;
  });

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>All Fees</h2>

      <div
        style={{
          display: "flex",
          gap: 15,
          margin: "20px 0",
          justifyContent: "center",
        }}
      >
        <button
          className={filter === "all" ? "active-tab" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "paid" ? "active-tab" : ""}
          onClick={() => setFilter("paid")}
        >
          Paid
        </button>
        <button
          className={filter === "unpaid" ? "active-tab" : ""}
          onClick={() => setFilter("unpaid")}
        >
          Unpaid
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : filteredFees.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>
          No fees to show.
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Paid On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFees.map((fee) => (
              <tr key={fee._id}>
                <td>{fee.student?.name || "N/A"}</td>
                <td>{fee.student?.phone || "N/A"}</td>
                <td>{fee.amount}</td>
                <td>
                  {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : "-"}
                </td>
                <td
                  style={{
                    color: fee.paid ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {fee.paid ? "Paid" : "Unpaid"}
                </td>
                <td>
                  {fee.paidOn ? new Date(fee.paidOn).toLocaleDateString() : "-"}
                </td>
                <td>
                  <button
                    className="btn"
                    style={{
                      background: fee.paid ? "#ffc107" : "#00b265",
                      color: fee.paid ? "#333" : "#fff",
                      fontWeight: 500,
                      minWidth: 90,
                      cursor: updating === fee._id ? "not-allowed" : "pointer",
                    }}
                    onClick={() => handleTogglePaid(fee)}
                    disabled={updating === fee._id}
                  >
                    {updating === fee._id
                      ? "Updating..."
                      : fee.paid
                      ? "Mark Unpaid"
                      : "Mark Paid"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
