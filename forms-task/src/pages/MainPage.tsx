import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div>
      MainPage
      <Link to="/hook-form">Hook form</Link>
      <Link to="/uncontrolled-form">Uncontrolled form</Link>
    </div>
  );
};
