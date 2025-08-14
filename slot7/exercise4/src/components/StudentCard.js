import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div className="student-card" style={{ 
      width: "18rem", 
      border: "1px solid #ddd", 
      borderRadius: "8px", 
      marginBottom: "1rem",
      padding: "1rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <img
        src={student.avatar}
        alt={`${student.name}'s avatar`}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "4px",
          marginBottom: "1rem"
        }}
      />
      <div>
        <h5 style={{ marginBottom: "0.5rem" }}>{student.name}</h5>
        <p style={{ marginBottom: "1rem", color: "#666" }}>Age: {student.age}</p>
        <button 
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
