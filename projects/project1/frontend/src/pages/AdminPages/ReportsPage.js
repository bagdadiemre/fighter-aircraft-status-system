import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../services/authApi";

const ReportsPage = () => {
  const { context, setContext } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const data = await checkLogin();
        setContext(data.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    handleCheckLogin();
  }, []);

  return (
    <div>
      {context?.role !== "admin" && <div>{navigate("./unauthorized")}</div>}
      {context?.role === "admin" && (
        <div>
          <h2>Reports Page</h2>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
