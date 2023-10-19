import { Alert } from 'react-bootstrap'

interface MessageProps {
  type: string;
  message: string; 
};

const Message = ({ 
  type, 
  message 
}: MessageProps) => {

  return (
    <>
      <Alert variant={type}>{message}</Alert>
    </>
  )
}

export default Message;
