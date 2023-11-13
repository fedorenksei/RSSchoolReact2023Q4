import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/ui-kit/Button';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
      <h1>404 Not Found</h1>
      <p>Page is not found on this URL</p>
      <Button onClick={() => navigate('/')}>Go home</Button>
    </div>
  );
};
