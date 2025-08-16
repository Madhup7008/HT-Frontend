import React, { useState } from 'react';
import './styles.css';
import RegisterStudent from './RegisterStudent';
import AddFee from './AddFee';
import UnpaidFees from './UnpaidFees';
import StudentList from './StudentList';

function App() {
  const [activeTab, setActiveTab] = useState('register');

  const renderSection = () => {
    switch (activeTab) {
      case 'register':
        return <RegisterStudent />;
      case 'addFee':
        return <AddFee />;
      case 'unpaid':
        return <UnpaidFees />;
      case 'students':
        return <StudentList />;
      default:
        return <RegisterStudent />;
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
  <img src="/logo.jpg" alt="Astha Library" height="180" style={{ marginRight: '20px' }} />
  <h1>Astha Library Admin Panel</h1>
</div>

      <h1>Astha Library </h1>

      <div className="tabs">
        <button onClick={() => setActiveTab('register')} className={activeTab === 'register' ? 'active-tab' : ''}>Register Student</button>
        <button onClick={() => setActiveTab('addFee')} className={activeTab === 'addFee' ? 'active-tab' : ''}>Add Fee</button>
        <button onClick={() => setActiveTab('unpaid')} className={activeTab === 'unpaid' ? 'active-tab' : ''}>Unpaid Students</button>
        <button onClick={() => setActiveTab('students')} className={activeTab === 'students' ? 'active-tab' : ''}>All Students</button>
      </div>

      <div className="section-content">
        {renderSection()}
      </div>
    </div>
  );
}

export default App;
