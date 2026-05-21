'use client';
import { useState } from 'react';

export default function TaxStrategistPro() {
  const [income, setIncome] = useState('');

  return (
    <div style={{ padding: '40px', background: '#01150b', color: '#fff', minHeight: '100vh' }}>
      <h1>Tax Strategist Pro</h1>
      <p style={{ color: '#10B981' }}>Sandbox Mode</p>
      
      <div style={{ marginTop: '20px', maxWidth: '400px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>Annual Revenue (ZAR):</label>
        <input 
          type="number" 
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #10B981' }}
        />
        
        <button 
          style={{ marginTop: '20px', padding: '10px 20px', background: '#10B981', border: 'none', cursor: 'pointer' }}
          onClick={() => alert(`Calculating strategy for: ${income}`)}
        >
          Run Audit
        </button>
      </div>
    </div>
  );
}
