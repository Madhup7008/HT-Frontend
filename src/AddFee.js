import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddFee() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: '',
    amount: '',
    dueDate: '',
    paid: false,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5050/api/students')
      .then(res => setStudents(res.data))
      .catch(() => setStudents([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentId || !form.amount || !form.dueDate) {
      setError('All fields are required.');
      return;
    }
    try {
      await axios.post('http://localhost:5050/add_fee', form);
      setSuccess('Fee added successfully!');
      setError('');
      setForm({
        studentId: '',
        amount: '',
        dueDate: '',
        paid: false,
      });
    } catch (err) {
      setError('Failed to add fee.');
      setSuccess('');
    }
  };

  return (
    <form className="add-fee-card" onSubmit={handleSubmit} autoComplete="off">
      <h2>Add Fee</h2>
      <label htmlFor="studentId">Student</label>
      <select
        name="studentId"
        id="studentId"
        value={form.studentId}
        onChange={handleChange}
        required
      >
        <option value="">Select Student</option>
        {students.map(student => (
          <option key={student._id} value={student._id}>
            {student.name} ({student.phone})
          </option>
        ))}
      </select>

      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        id="amount"
        placeholder="Enter amount"
        value={form.amount}
        onChange={handleChange}
        required
        min="1"
      />

      <label htmlFor="dueDate">Due Date</label>
      <input
        type="date"
        name="dueDate"
        id="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        required
      />

      <label>
        <input
          type="checkbox"
          name="paid"
          checked={form.paid}
          onChange={handleChange}
        />
        Paid?
      </label>

      <button type="submit" className="add-fee-btn">Add Fee</button>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
}
