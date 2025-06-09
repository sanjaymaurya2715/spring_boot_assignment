import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function StudentDashboard() {
  const [scores, setScores] = useState([]);

  const [result,setResult] = useState(false)
  const [messgage,setMessage]=useState("No result found please login or submit your test")

  useEffect(() => {
    // Get student from localStorage (after login)
    const studentId = localStorage.getItem('student_key')
   

      axios.get(`http://localhost:8080/results/student/${studentId}`)
        .then((res) => {
          setScores(res.data);
          setResult(true)
          setMessage("")
        })
        .catch((err) => {
          console.error('Error fetching scores:', err);
        });
    
  }, []);

  return (


    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Student Dashboard</h2>
    <h1>{messgage}</h1>
    { result && 
        <>
        
          <h3>Your Test Scores:</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Test Series ID</th>
                <th>Score</th>
                <th>Total question</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index}>
                  <td>{score.testSeriesId}</td>
                  <td>{score.score}</td>
                  <td>{score.totalQuestions}</td>
                  <td>{new Date(score.submittedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
   
            }
   
    </div>
  );
}


