import { HookForm } from '@/features';
import { GoToMain } from '@/shared/ui-kit/GoToMain';

export const HookFormPage = () => {
  return (
    <section className="space-y-3">
      <GoToMain />
      <HookForm />
    </section>
  );
};
