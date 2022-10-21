import fs from 'fs';
import { API_URL, postmanConfig, POSTMAN_PROJECT_NAME } from '@/config';
import { Collection, Item, HeaderDefinition, RequestBodyDefinition } from 'postman-collection';
import {
  CONTENT_TYPES,
  DefaultUnkownObjectType,
  OverridePostmanFormDataInterface,
  OverridePostmanItemConfig,
  PostmanEventInterface,
  PostmanObjectConfigType,
  PostmanRequestInformationType,
  PostmanUrlEncodedObjectForm,
  POSTMAN_FORM_TYPES,
  REQUEST_TYPES,
  UploadMediaInterface,
} from '@/types';

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
  if (element.requestInformation.postmanFormType === POSTMAN_FORM_TYPES.RAW && element.requestInformation.data) {
    const requestBodyDef: RequestBodyDefinition = {
      mode: element.requestInformation.postmanFormType.toString(),
      raw: JSON.stringify(element.requestInformation.data),
    };
    return requestBodyDef;
  }
  if (element.requestInformation.postmanFormType === POSTMAN_FORM_TYPES.FILES) {
    const typedData = element.requestInformation as PostmanRequestInformationType<UploadMediaInterface>;
    const requestBodyDef: RequestBodyDefinition = {
      mode: element.requestInformation.postmanFormType.toString(),
      formdata: [
        {
          key: typedData.data?.requestKey,
          type: POSTMAN_FORM_TYPES.FILE,
          src: typedData.data?.relativeFilePath,
        } as OverridePostmanFormDataInterface,
      ],
    };
    return requestBodyDef;
  }
  if (element.requestInformation.postmanFormType === POSTMAN_FORM_TYPES.ENCODED) {
    const formData = element.requestInformation.data as DefaultUnkownObjectType;
    const urlEncodedForm = [];
    for (const key in formData) {
      urlEncodedForm.push({ key: key, value: formData[key] } as PostmanUrlEncodedObjectForm);
    }
    const requestBodyDef: RequestBodyDefinition = {
      mode: element.requestInformation.postmanFormType.toString(),
      urlencoded: urlEncodedForm,
    };
    return requestBodyDef;
  }
  return {} as RequestBodyDefinition;
};

const generatePostmanTests = (element: PostmanObjectConfigType): PostmanEventInterface[] => {
  if (element.event && element.event.length) {
    console.log(element.event[0].listen);
    console.log(element.event[0].script);
    return element.event;
  }
  return [];
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
    
    const postmanRequestBody: OverridePostmanItemConfig = {
      name: element.requestName,
      request: {
        header: generateHeaders(element),
        url: `${API_URL}${element.matchUrl}`,
        method: element.requestInformation.type,
        body: generatePostmanBody(element),
      },
      event: generatePostmanTests(element),
    };

    const requestElement = new Item(postmanRequestBody);
    postmanCollection.items.add(requestElement);
  });

  const collectionJSON = postmanCollection.toJSON();

  fs.writeFile('./collection.json', JSON.stringify(collectionJSON), (err) => {
    if (err) {
      throw Error(err.message);
    }
    console.log('Postman collection configuration successfully created !');
  });
};
