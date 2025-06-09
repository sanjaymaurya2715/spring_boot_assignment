import { Routes, Route } from "react-router-dom";
import Home from "../components/common/Home";
import Register from "../components/student/Register";
import Login from "../components/student/Login";
import TestSeries from "../components/pages/TestSeries";
import StudentHome from "../components/student/StudentHome";
import Test from "../components/student/Test";
import { StudentDashboard } from "../components/student/StudentDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test-series" element={<TestSeries />} />
      <Route path="/student" element={<StudentHome></StudentHome>}></Route>
      <Route path="/student/test" element={<Test/>}></Route>
      <Route path="/dashboard" element={<StudentDashboard></StudentDashboard>}></Route>
    </Routes>
  );
}
