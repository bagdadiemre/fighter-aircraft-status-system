import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import LoginForm from "./components/Auth/LoginForm";
import NotFound from "./components/Auth/NotFound";
import ProtectedPage from "./components/Auth/ProtectedPage";

const App = () => {
  return (
    <Router>
      <Switch>
        {/* Public Route - Login Form */}
        <Route exact path="/login" component={LoginForm} />

        {/* Protected Route - Add more protected routes later */}
        <Route exact path="/">
          <MainLayout>
            <Route exact path="/" component={ProtectedPage} />
          </MainLayout>
        </Route>

        {/* 404 Not Found Page */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
