import fs from 'fs';
import { API_URL, postmanConfig, POSTMAN_PROJECT_NAME } from '@/config';
import { Collection, Item, Header, HeaderDefinition,RequestBodyDefinition } from 'postman-collection';
import { CONTENT_TYPES, PostmanConfigType, PostmanObjectConfigType, REQUEST_TYPES } from '@/types';

const generateHeaders = (element: PostmanObjectConfigType): HeaderDefinition[] => {
  const headersArray: HeaderDefinition[] = [];
  if (element.isAuthRequired) {
    const header: HeaderDefinition = { key: 'Authorization', value: '' };
    headersArray.push(header);
  }
  if (element.requestInformation.type === REQUEST_TYPES.POST) {
    const header: HeaderDefinition = { key: CONTENT_TYPES.KEY, value: CONTENT_TYPES.JSON };
    headersArray.push(header);
  }
  return headersArray;
};

const generatePostmanBody = (element: PostmanObjectConfigType):RequestBodyDefinition =>{
  return {} as RequestBodyDefinition
}
export const generatePostmanCollection = (): void => {
  const postmanCollection = new Collection({
    info: {
      // Name of the collection
      name: POSTMAN_PROJECT_NAME,
    },
    // Requests in this collection
    item: [],
  });

  const postmanConfigObject: PostmanObjectConfigType[] = Object.values(postmanConfig);
  console.log(postmanConfigObject);
  postmanConfigObject.map((element) => {
    console.log({ element });
    const postmanRequest = new Item({
      name: element.requestName,
      request: {
        header: generateHeaders(element),
        url: `${API_URL}${element.matchUrl}`,
        method: element.requestInformation.type,
        body:generatePostmanBody(element)
      },
    });
  });
};
