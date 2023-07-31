import React from "react";
import AuthProvider from "./contexts/AuthProvider";
import LoginForm from "./components/Auth/LoginForm";

const App = () => {
  return (
    <AuthProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoginForm />
      </div>
    </AuthProvider>
  );
};

export default App;
