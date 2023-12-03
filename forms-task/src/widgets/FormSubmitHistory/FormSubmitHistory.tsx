import { FormDataTile } from '@/features';
import { useAppSelector } from '@/shared/hooks';

export const FormSubmitHistory = () => {
  const { history } = useAppSelector((state) => state.formData);

  return (
    <div className="grid gap-3">
      {history.map((record, i) => (
        <FormDataTile key={i} record={record} />
      ))}
      {history.length === 0 && (
        <p className="text-center">
          Please, submit one of the form. Your data will be displayed here after
          submit
        </p>
      )}
    </div>
  );
};
