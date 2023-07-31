// src/components/App.js
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Login from "./components/Auth/Login";
import Messages from "./Messages/Messages"; // You need to implement the Messages component
import Users from "./Users/Users"; // You need to implement the Users component
import Reports from "./Reports/Reports"; // You need to implement the Reports component
import NotFound from "./Auth/NotFound";
import NotAuthorized from "./Auth/NotAuthorized";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      {user ? (
        <>
          <Route path="/messages" component={Messages} />
          {user.role === "admin" && <Route path="/users" component={Users} />}
          {user.role === "admin" && (
            <Route path="/reports" component={Reports} />
          )}
          <Redirect exact from="/" to="/messages" />
          <Route path="/not-authorized" component={NotAuthorized} />
          <Route component={NotFound} />
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </Switch>
  );
};

export default App;
