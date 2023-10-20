import { useState, useRef, FormEvent } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

import Message from './Message';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { changePassword } = useAuthContext();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!passwordRef.current?.value || !passwordConfirmRef.current?.value) {
      console.error('Password Ref is null');
    }

    if (passwordRef.current?.value.trim() === '' || passwordConfirmRef.current?.value.trim() === '') {
      setErrorMsg('Please enter password');
      return;
    }

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      await changePassword(passwordRef.current?.value || '');
      setSuccessMsg(`Password has been updated.`);
      setIsSucceed(true);
      setTimeout(() => {
        navigate('/login');    
      }, 1500)
      
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to change password.');
      setIsSucceed(false);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Change Password</h2>
          {errorMsg && <Message type='danger' message={errorMsg}/>}
          {successMsg && <Message type='success' message={successMsg} />}

          <Form onSubmit={handleFormSubmit}>
            
            <Form.Group id='password' className='mb-4'>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='Must have a least 6 characters'
              />
            </Form.Group>

            <Form.Group id='password-confirm'>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
                placeholder='Confirm your password'
              />
            </Form.Group>
            
            <Button 
              variant='primary'
              disabled={isLoading || isSucceed} 
              className='w-100 mt-4' 
              type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button 
          variant="link" 
          onClick={() => {navigate(-1)}}
        > 
          Cancel          
        </Button>

      </div>
    </>
  )
}

export default ChangePassword;
