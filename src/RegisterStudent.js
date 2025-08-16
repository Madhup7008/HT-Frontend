import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterStudent() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});  // clear errors on input
    setSuccess('');
  };

  const validateForm = () => {
    const { name, phone, email } = form;
    const newErrors = {};

    const phonePattern = /^[6-9]\d{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phonePattern.test(phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!emailPattern.test(email)) newErrors.email = 'Enter a valid email address';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:5050/register', form);
      setSuccess('Student registered successfully!');
      setForm({ name: '', phone: '', email: '' });
    } catch (err) {
      setSuccess('');
      setErrors({ submit: 'Registration failed. Try again.' });
    }
  };

  return (
    <div>
      <h2>Register Student</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Register</button>

        {errors.submit && <div style={{ color: 'red', marginTop: '8px' }}>{errors.submit}</div>}
        {success && <div style={{ color: 'green', marginTop: '8px' }}>{success}</div>}
      </form>
    </div>
  );
}
