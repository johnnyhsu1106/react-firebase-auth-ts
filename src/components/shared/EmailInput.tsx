import { forwardRef, useId } from 'react';
import { Form } from 'react-bootstrap';

interface EmailInputProps {
  className?: string;
};

type Ref = HTMLInputElement;

const EmailInput = forwardRef<Ref, EmailInputProps>(({ className }, ref) => {
  const emailInputId: string = useId();

  return (
    <Form.Group 
      controlId={`email-${emailInputId}`} className={className}>
      <Form.Control 
        type='email' 
        ref={ref} 
        required
        placeholder='example@gmail.com'
      />
    </Form.Group>
  )
});

export default EmailInput;
