import { FormEvent, useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Message from './shared/Message';
import EmailInput from './shared/EmailInput';
import PasswordInput from './shared/PasswordInput';

import { useAuthContext } from '../context/AuthContext';
import { FirebaseError } from 'firebase/app';
 
export interface AuthError extends FirebaseError {
  message: string;
};

const Signup = () => {
  const [successMsg, setSuccessMsg] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const handSignupleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    if (passwordRef.current?.value.trim() === '' || passwordConfirmRef.current?.value.trim() === '') {
      setErrorMsg('Please enter password');
      return;
    }   

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setIsLoading(true)
    setErrorMsg('');

    try { 
      await signup(emailRef.current?.value || '',  passwordRef.current?.value || '');
      setSuccessMsg('New Account is created.');
      setIsSucceed(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    
    } catch (err) {
      setErrorMsg('Failed to create an account');

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
            {errorMsg && <Message type='danger' message={errorMsg}/>}
            {successMsg && <Message type='success' message={successMsg} />}

            <Form onSubmit={handSignupleSubmit}>
              <EmailInput
                className='mb-3' 
                ref={emailRef} 
              />
              <PasswordInput
                className='mb-3'
                placeholder='Must have a least 6 characters' 
                ref={passwordRef}
              />
              <PasswordInput 
                placeholder='confirm your password'
                ref={passwordConfirmRef}
              />
              
              <Button 
                variant='primary'
                disabled={isLoading || isSucceed} 
                className='w-100 mt-4' 
                type='submit'>
                Sign Up
              </Button>
            </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}

export default Signup;
