import { HookForm } from '@/features';
import { Link } from 'react-router-dom';

export const HookFormPage = () => {
  return (
    <section className="space-y-3">
      <Link to="/">Go to the main page</Link>
      <HookForm />
    </section>
  );
};
