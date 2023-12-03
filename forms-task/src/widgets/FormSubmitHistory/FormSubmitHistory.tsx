import { FormDataTile } from '@/features';
import { useAppSelector } from '@/shared/hooks';

export const FormSubmitHistory = () => {
  const { history } = useAppSelector((state) => state.formData);

  return (
    <div className="grid gap-3">
      {history.map((record, i) => (
        <FormDataTile key={i} record={record} />
      ))}
    </div>
  );
};
