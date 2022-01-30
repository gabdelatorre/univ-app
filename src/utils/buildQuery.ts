export const buildQuery = (params: unknown): string => {
  const typedParams = params as Record<string, string>;
  const paramKeys = Object.keys(typedParams);
  let queryStr = '';
  console.log('paramKeys', paramKeys);
  paramKeys.forEach(
    (pKey, idx) =>
      (queryStr = queryStr.concat(
        `${idx === 0 ? `?` : ``}${pKey}=${typedParams[pKey]}${idx !== paramKeys.length - 1 ? `&` : ``}`
      ))
  );

  return queryStr;
};
