import { DEFAULT_LIMIT } from "@/shared/data/constants";
import { getQueryParams, getStringQueryParam } from "@/shared/utils";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
interface FormFields {
  limit: number;
}

export const Limit = () => {
  const router = useRouter();
  const initLimit = getStringQueryParam("limit", router) || `${DEFAULT_LIMIT}`;

  const { register, handleSubmit } = useForm<FormFields>({
    mode: "onChange",
    defaultValues: { limit: +initLimit },
  });

  const onSubmit: SubmitHandler<FormFields> = ({ limit }) => {
    const params = new URLSearchParams(getQueryParams(router));
    limit ? params.set("limit", `${limit}`) : params.delete("limit");
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex gap-1">
        <p>Items per page:</p>
        <input
          type="number"
          min={1}
          max={100}
          {...register("limit")}
          className="border rounded-sm"
        />
      </label>
      <input className="hidden" type="submit" />
    </form>
  );
};
