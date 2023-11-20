import { NextRouter } from "next/router";

export const getQueryParams = (router: NextRouter) => {
  const questionPos = router.asPath.indexOf("?");
  return questionPos < 0 ? "" : router.asPath.slice(questionPos);
};
