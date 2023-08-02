import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const MessagesPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <header>
        {user && (
          <>
            <h1>Messages Page</h1>
            {user.role === 'admin' && (
              <nav>
                <ul>
                  <li><Link to="/messages">Messages</Link></li>
                  <li><Link to="/reports">Reports</Link></li>
                  <li><Link to="/users">Users</Link></li>
                </ul>
              </nav>
            )}
          </>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MessagesPage;
