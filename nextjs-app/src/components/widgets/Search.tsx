import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "@/pages";
import { getQueryParams } from "@/shared/utils";
import { SearchResults } from "@/components/features/SearchResults";
import { SearchInput } from "@/components/features/SearchInput";
import { Limit } from "../features/Limit";
import { Pagination } from "../features/Pagination";

export const Search = ({
  results,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center pt-[10vh] flex-shrink-0 gap-5"
      onClick={() => router.push(`/${getQueryParams(router)}`)}
    >
      <h1 className="text-3xl">Search for Products of DummyJSON</h1>
      <SearchInput />
      {results && (
        <div className="flex flex-col gap-4 items-center">
          <div className="self-stretch flex justify-between gap-5 flex-wrap items-center">
            <p>Total: {total}</p>
            <Limit />
          </div>
          <Pagination total={total} />
        </div>
      )}
      <SearchResults results={results} />
    </div>
  );
};
