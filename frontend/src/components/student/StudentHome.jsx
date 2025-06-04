import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentHome() {
  const [testSeries, setTestSeries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTestSeries();
  }, []);

  const fetchTestSeries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/test-series");
      setTestSeries(response.data); // assuming it's an array of objects with "title"
    } catch (err) {
      console.error("Error fetching test series", err);
    }
  };

  const handleStartTest = (id) => {
    navigate("/student/test",{state:{test_series_id:id}});
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Available Test Series</h2>
      <div className="row">
        {testSeries.map((test, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{test.title}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => handleStartTest(test.id)}
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
