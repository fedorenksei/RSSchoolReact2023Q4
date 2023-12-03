import { FormSubmitHistory } from '@/widgets';
import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <main className="space-y-5">
      <div className="flex justify-around flex-wrap gap-5">
        <Link to="/uncontrolled-form">Uncontrolled form</Link>
        <Link to="/hook-form">Hook form</Link>
      </div>
      <FormSubmitHistory />
    </main>
  );
};
