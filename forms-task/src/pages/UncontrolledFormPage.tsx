import { UncontrolledForm } from '@/features';
import { Link } from 'react-router-dom';

export const UncontrolledFormPage = () => {
  return (
    <section className="space-y-3">
      <Link to="/">Go to the main page</Link>
      <UncontrolledForm />
    </section>
  );
};
