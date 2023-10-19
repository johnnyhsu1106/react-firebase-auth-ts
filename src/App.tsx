import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import PageNotFound from './components/PageNotFound';
import PrivateRoute from './components/PrivateRoute';

import { AuthProvider } from './context/AuthContext'

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"


function App() {

  return (
    <Container 
      className="d-flex align-items-center justify-content-center .container">
      <div className='w-100 form-wrapper'>
     
        <Router>
          <AuthProvider>
            
            <Routes>
              <Route element={<PrivateRoute/>} >
                <Route path='/' element={<Dashboard/>} />
              </Route>
              <Route element={<PrivateRoute/>} >
                <Route path='change-password' element={<ChangePassword/>} />
              </Route>
              <Route path='signup' element={<Signup/>} />
              <Route path='login' element={<Login/>} />
              <Route path='reset-password' element={<ResetPassword/>} />
              <Route path='*' element={<PageNotFound/>} />
            </Routes>

          </AuthProvider>
        </Router>
      </div>
      
    </Container>
  )
}

export default App;
