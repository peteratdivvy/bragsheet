import { ParsedUrlQuery } from "querystring";

// TODO: Allow this to take in multiple keys
export function getRequiredParams(params: ParsedUrlQuery, key: string) {
  // if (!Array.isArray(keys)) {
  const paramValue = params[key];

  const resultingParamValue = Array.isArray(paramValue)
    ? paramValue[0]
    : paramValue;

  if (!resultingParamValue) {
    console.error(`Missing param value for key $${key}`);
    return "";
  }

  return resultingParamValue;

  // } else {
  //   const paramObj = keys.reduce<{
  //     [key: (typeof keys)[number]]: string;
  //   }>((acc, key) => {
  //     acc = {
  //       ...acc,
  //       [key]: params[key],
  //     };
  //     return acc;
  //   }, {});

  //   return paramObj;
  // }
}
