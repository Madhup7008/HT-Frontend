import React, { useEffect, useState } from "react";
import api from "./api";

function UnpaidFeesTable() {
  const [unpaid, setUnpaid] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GET /unpaid_fees
    api
      .get("/unpaid_fees")
      .then((res) => setUnpaid(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="unpaid-fees-card">
      <h2>Unpaid Fees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          )}
          {!loading && unpaid.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", color: "#bbb" }}>
                No unpaid fees.
              </td>
            </tr>
          )}
          {!loading &&
            unpaid.map((fee, idx) => (
              <tr key={idx}>
                <td>{fee.name}</td>
                <td>{fee.phone}</td>
                <td>₹{fee.amount}</td>
                <td>{fee.dueDate ? fee.dueDate.slice(0, 10) : "--"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UnpaidFeesTable;
