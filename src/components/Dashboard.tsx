import { useState } from 'react';
import { Card, Button } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';

import Message from './Message';
import { useAuthContext } from '../context/AuthContext';


const Dashboard = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  
  const handleUserLogout = async () => {
    setErrorMsg('')

    try {
      await logout();
      navigate('/login');      
    
    } catch (err) {
      setErrorMsg('Failed to log out');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>

          <h2 className="text-center mb-4">Profile</h2>
          {errorMsg && <Message type='danger' message={errorMsg} />}
          <div><strong>Email: </strong> { user?.email }</div>
          <div><strong>Last Sign In:</strong> { user?.metadata.lastSignInTime}</div>
          
          <Link 
            to="/change-password" 
            className="btn btn-primary w-100 mt-3">
            Change Password
          </Link>

        </Card.Body>
      </Card>
      
      <div className="w-100 text-center mt-2">
        <Button 
          variant="link" 
          onClick={handleUserLogout}
        >
          Log Out
        </Button>
      </div>
    </> 
  )
}

export default Dashboard;
