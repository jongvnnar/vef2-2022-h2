export type PagedResponse<T> = {
  limit: number;
  offset: number;
  items: T[];
  _links: {
    self: Link;
    next?: Link;
    prev?: Link;
  };
};

type Link = {
  href: string;
};
