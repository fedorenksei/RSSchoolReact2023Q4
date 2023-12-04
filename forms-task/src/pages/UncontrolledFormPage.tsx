import { UncontrolledForm } from '@/features';
import { GoToMain } from '@/shared/ui-kit/GoToMain';

export const UncontrolledFormPage = () => {
  return (
    <section className="space-y-3">
      <GoToMain />
      <UncontrolledForm />
    </section>
  );
};
