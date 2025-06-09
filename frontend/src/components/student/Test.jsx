
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Test() {
  const location = useLocation();
  const testSeriesId = location.state.test_series_id;

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score,setScore] = useState(0);

  useEffect(() => {
    if (!testSeriesId) return;

    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/questions/test-series/${testSeriesId}`);
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };

    fetchQuestions();
  }, [testSeriesId]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext =async () => {
    if (!selectedOption) return alert("Please select an option");

    setAnswers((prev) => [
      ...prev,
      {
        questionId: questions[currentQIndex].id,
        questionText: questions[currentQIndex].questionText,
        selected: selectedOption,
        correct: questions[currentQIndex].correctOption,
        options: {
          optionA: questions[currentQIndex].optionA,
          optionB: questions[currentQIndex].optionB,
          optionC: questions[currentQIndex].optionC,
          optionD: questions[currentQIndex].optionD,
        },
      },
    ]);
    if(selectedOption==questions[currentQIndex].correctOption){
      setScore(score+1);
    }

    setSelectedOption("");
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
       try {
      const resultData = {
        studentId: localStorage.getItem("student_key"),
        testSeriesId: testSeriesId,
        score: score,
        totalQuestions:questions.length,
      };

      const response = await axios.post('http://localhost:8080/results/submit', resultData);

      console.log('Score submitted successfully:', response.data);
      alert('Score submitted!');
    } catch (error) {
      console.error('Error submitting score:', error);
      alert('Failed to submit score');
    }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading questions...</div>;




  if (showResults) {
    return (
      <>

   
   <div>
        <h1>Final Score: {score}</h1>
      </div>
       
      <div className="container mt-5" style={{ maxWidth: "800px" }}>
        <h3 className="mb-4">Test Completed!</h3>
        {answers.map((ans, index) => (
          <div key={ans.questionId} className="card p-3 mb-3 shadow-sm">
            <h5>Q{index + 1}. {ans.questionText}</h5>
            {Object.entries(ans.options).map(([key, value]) => (
              <div key={key} className="ms-3">
                <span
                  style={{
                    fontWeight:
                      value === ans.correct
                        ? "bold"
                        : value === ans.selected
                        ? "bold"
                        : "normal",
                    color:
                      value === ans.correct
                        ? "green"
                        : value === ans.selected && value !== ans.correct
                        ? "red"
                        : "black",
                  }}
                >
                  {key.slice(-1)}. {value}
                  {value === ans.correct && " (Correct Answer)"}
                  {value === ans.selected && value !== ans.correct && " (Your Answer)"}
                </span>
              </div>
            ))}

          
          </div>

 
          
        ))}
      </div>


       </>
    );
  }

  const currentQuestion = questions[currentQIndex];

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h4>Question {currentQIndex + 1} of {questions.length}</h4>
      <div className="card p-4 shadow-sm">
        <h5>{currentQuestion.questionText}</h5>
        <div className="mt-3">
          {["optionA", "optionB", "optionC", "optionD"].map((optKey) => (
            <div key={optKey} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id={optKey}
                value={currentQuestion[optKey]}
                checked={selectedOption === currentQuestion[optKey]}
                onChange={() => handleOptionSelect(currentQuestion[optKey])}
              />
              <label className="form-check-label" htmlFor={optKey}>
                {currentQuestion[optKey]}
              </label>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-4" onClick={handleNext}>
          {currentQIndex + 1 === questions.length ? "Finish Test" : "Next"}


        </button>
      
      </div>
    </div>
  );
}
