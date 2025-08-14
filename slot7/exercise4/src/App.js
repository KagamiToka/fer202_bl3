import React from "react";
import "./App.css";
import NameList from "./components/NameList";
import UserProfile from "./components/UserProfile";
import Welcome from "./components/Welcome";
import StudentCard from "./components/StudentCard";

function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const namesList = ["traltb@fe.edu.vn", "test@fe.edu.vn"];
  //Danh sach students
  const students = [
    { name: "traltb1@fe.edu.vn", age: 39, avatar: "image/Screenshot 2025-06-11 161033.png" },
    { name: "traltb2@fe.edu.vn", age: 40, avatar: "image/Screenshot 2025-06-11 161048.png" },
    { name: "traltb3@fe.edu.vn", age: 41, avatar: "image/Screenshot 2025-06-11 161059.png" },
  ];
  return (
    <div className="App">
      <Welcome name="traltb@fe.edu.vn" />
      <UserProfile user={userData} />
      <NameList names={namesList} />
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "0 1rem" 
      }}>
        <h1 style={{ 
          textAlign: "center", 
          margin: "2rem 0", 
          color: "#333" 
        }}>
          Student information
        </h1>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          padding: "1rem"
        }}>
          {/*Duyệt qua mảng students và truyền từng đối tượng student vào Student Card*/}
          {students.map((student, index) => (
            <div key={index}>
              <StudentCard student={student} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
