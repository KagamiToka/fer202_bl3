import React from "react";
import UserForm from "./component/UserForm";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const handleFormSubmit = (data) => {
    console.log("Dữ liệu gửi:", data);
    alert("Form hợp lệ! Dữ liệu đã được gửi lên console.");
  };

  return (
    <div className="App">
      <h1>Ứng Dụng React</h1>
      <UserForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
