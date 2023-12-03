import { LinkToPage } from '@/shared/ui-kit/LinkToPage';
import { FormSubmitHistory } from '@/widgets';

export const MainPage = () => {
  return (
    <main className="space-y-5">
      <div className="flex justify-around flex-wrap gap-5">
        <LinkToPage route="/uncontrolled-form" text="Uncontrolled form" />
        <LinkToPage route="/hook-form" text="Hook form" />
      </div>
      <FormSubmitHistory />
    </main>
  );
};
