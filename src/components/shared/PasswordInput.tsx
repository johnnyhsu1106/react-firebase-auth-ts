import { useState, useId, forwardRef } from 'react';
import { Form } from 'react-bootstrap';
import showPasswordIcon from '/images/show-password.svg';
import hidePasswordIcon from '/images/hide-password.svg';

interface PasswordInputProps {
  className?: string;
  placeholder: string;
};

type Ref = HTMLInputElement;

const PasswordInput = forwardRef<Ref, PasswordInputProps>(({
  className='',
  placeholder,
}, ref) => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const passwordInputId: string = useId();
    
  const handlePasswordToggle = () => {
    setIsPasswordShown((isPrevPasswordShown) => {
      return !isPrevPasswordShown;
    });
  };

  return ( 
    <Form.Group 
      controlId={`password-${passwordInputId}`} 
      className={`${className} position-relative`}
    >
      <Form.Control
        type={isPasswordShown ? 'text' : 'password'}
        required 
        placeholder={placeholder}
        ref={ref}
      />
      <img 
        className='position-absolute bottom-0 end-0 mx-3' 
        style={{height: '75%', cursor: 'pointer'}}
        src={isPasswordShown ? hidePasswordIcon : showPasswordIcon}
        onClick={handlePasswordToggle}
      />
    </Form.Group>
  )
})

export default PasswordInput;
