import { POSTMAN_PROJECT_NAME } from '@/config';
import fs from 'fs';
import { Collection, Item, Header } from 'postman-collection';
export const generatePostmanCollection = (): void => {
  const postmanCollection = new Collection({
    info: {
      // Name of the collection
      name: POSTMAN_PROJECT_NAME,
    },
    // Requests in this collection
    item: [],
  });
  // This string will be parsed to create header
  const rawHeaderString = '';
  // const rawHeaderString = 'Authorization:\nContent-Type:\ncache-control:no-cache\n';
  // Parsing string to postman compatible format
  const rawHeaders = Header.parse(rawHeaderString);
};
