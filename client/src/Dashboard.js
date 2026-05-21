import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const fetchLeads = async () => {
    const res = await axios.get('http://localhost:5000/api/leads');
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async () => {
    await axios.post('http://localhost:5000/api/leads', {
      name,
      company,
      status: 'New',
      value: 1000
    });

    fetchLeads();
  };


  return (
    <div className='container mt-5'>
      <h2>CRM Dashboard</h2>

      <input
        className='form-control mb-2'
        placeholder='Lead Name'
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Company'
        onChange={(e) => setCompany(e.target.value)}
      />

      <button className='btn btn-success mb-4' onClick={addLead}>
        Add Lead
      </button>

      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
  <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.company}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;