import fs from 'fs';
import { API_URL, postmanConfig, POSTMAN_PROJECT_NAME } from '@/config';
import { Collection, Item, HeaderDefinition, RequestBodyDefinition } from 'postman-collection';
import { CONTENT_TYPES, PostmanObjectConfigType, POSTMAN_FORM_TYPES, REQUEST_TYPES } from '@/types';

const generateHeaders = (element: PostmanObjectConfigType): HeaderDefinition[] => {
  const headersArray: HeaderDefinition[] = [];
  if (element.isAuthRequired) {
    const header: HeaderDefinition = { key: 'Authorization', value: '' };
    headersArray.push(header);
  }
  if (element.requestInformation.type === REQUEST_TYPES.POST && element.requestInformation.contentType) {
    const header: HeaderDefinition = { key: CONTENT_TYPES.KEY, value: element.requestInformation.contentType };
    headersArray.push(header);
  }
  return headersArray;
};

const generatePostmanBody = (element: PostmanObjectConfigType): RequestBodyDefinition => {
  if (element.requestInformation.postmanFormType === POSTMAN_FORM_TYPES.NONE) {
    const requestBodyDef: RequestBodyDefinition = {
      mode: element.requestInformation.postmanFormType.toString(),
    };
    return requestBodyDef;
  }
  if (element.requestInformation.postmanFormType === POSTMAN_FORM_TYPES.RAW) {
    const requestBodyDef: RequestBodyDefinition = {
      mode: element.requestInformation.postmanFormType.toString(),
      raw: JSON.stringify({ email: 'John_Doe@gmail.com', password: 'Some fake pswd' }),
    };
    return requestBodyDef;
  }
  if (element.requestInformation.postmanFormType === POSTMAN_FORM_TYPES.FILES) {
    const requestBodyDef: RequestBodyDefinition = {
      mode: element.requestInformation.postmanFormType.toString(),
      file: { src: '/images/saitama.jpeg' },
    };
    return requestBodyDef;
  }
  if (element.requestInformation.postmanFormType === POSTMAN_FORM_TYPES.ENCODED) {
    const requestBodyDef: RequestBodyDefinition = {
      mode: element.requestInformation.postmanFormType.toString(),
      urlencoded: 'fake-url-encoded',
    };
    return requestBodyDef;
  }
  return {} as RequestBodyDefinition;
};
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

  postmanConfigObject.map((element) => {
    const postmanRequest = new Item({
      name: element.requestName,
      request: {
        header: generateHeaders(element),
        url: `${API_URL}${element.matchUrl}`,
        method: element.requestInformation.type,
        body: generatePostmanBody(element),
      },
    });
    postmanCollection.items.add(postmanRequest);
  });

  const collectionJSON = postmanCollection.toJSON();

  fs.writeFile('./collection.json', JSON.stringify(collectionJSON), (err) => {
    if (err) {
      throw Error(err.message);
    }
    console.log('Postman collection configuration successfully created !');
  });
};
