import { ParsedUrlQuery } from 'querystring';

type QueryOptions = 'category' | 'search' | 'offset' | 'limit';
type QueryItem = string;
type Query = Partial<Record<QueryOptions, QueryItem>>;

export const createQuery = (query: ParsedUrlQuery): Query => {
  const retVal: Query = {};
  if (parseReactQueryParam(query.category))
    retVal.category = parseReactQueryParam(query.category);
  if (parseReactQueryParam(query.search))
    retVal.search = parseReactQueryParam(query.search);
  if (parseReactQueryParam(query.offset))
    retVal.offset = parseReactQueryParam(query.offset);
  if (parseReactQueryParam(query.limit))
    retVal.limit = parseReactQueryParam(query.limit);
  return retVal;
};

export const parseReactQueryParam = (val: string | string[] | undefined) => {
  if (Array.isArray(val)) return undefined;
  return val;
};
