import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {

  const [leads, setLeads] = useState([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  // Fetch Leads
  const fetchLeads = async () => {

    const res = await axios.get(
      'http://localhost:5000/api/leads'
    );

    setLeads(res.data);
  };

  // Load Data
  useEffect(() => {
    fetchLeads();
  }, []);

  // Add Lead
  const addLead = async () => {

    if (!name || !company) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(
      'http://localhost:5000/api/leads',
      {
        name,
        company,
        status: 'New',
        value: 1000
      }
    );

    setName('');
    setCompany('');

    fetchLeads();
  };

  // Update Lead
  const updateLead = async (
    id,
    status,
    value
  ) => {

    await axios.put(
      `http://localhost:5000/api/leads/${id}`,
      {
        status,
        value
      }
    );

    fetchLeads();
  };

  return (

    <div className='container mt-5'>

      <h2>CRM Dashboard</h2>

      {/* Name Input */}

      <input
        className='form-control mb-2'
        placeholder='Lead Name'
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      {/* Company Input */}

      <input
        className='form-control mb-2'
        placeholder='Company'
        value={company}
        onChange={(e) =>
          setCompany(e.target.value)
        }
      />

      {/* Add Button */}

      <button
        className='btn btn-success mb-4'
        onClick={addLead}
      >
        Add Lead
      </button>

      {/* Table */}

      <table className='table'>

        <thead>

          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Value</th>
          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (

            <tr key={lead._id}>

              <td>{lead.name}</td>

              <td>{lead.company}</td>

              {/* Status */}

              <td>

                <select
                  value={lead.status}
                  onChange={(e) =>
                    updateLead(
                      lead._id,
                      e.target.value,
                      lead.value
                    )
                  }
                >

                  <option>New</option>
                  <option>Contacted</option>
                  <option>Closed</option>

                </select>

              </td>

              {/* Value */}

              <td>

                <input
                  type='number'
                  value={lead.value}
                  onChange={(e) =>
                    updateLead(
                      lead._id,
                      lead.status,
                      e.target.value
                    )
                  }
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Dashboard;