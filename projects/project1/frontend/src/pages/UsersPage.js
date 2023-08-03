import React, { useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User in UsersPage:', user);
    console.log('Role in UsersPage:', role);

    if (!(user && role === 'admin')) {
      console.log('Redirecting to /unauthorized');
      navigate('/unauthorized');
    }
  }, [user, role, navigate]);

  if (user && role === 'admin') {
    return (
      <div>
        <h2>Users Page</h2>
      </div>
    );
  } else {
    return null; // No need for an explicit return here
  }
};

export default UsersPage;
