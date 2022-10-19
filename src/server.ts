import 'module-alias/register';
import http from 'http';
import expressApp from './app';

import { connectDb, generateOauthExampleData, PORT } from '@/config';

/**
 * Creating HTTP server
 */
const server = http.createServer(expressApp);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDb()
    .then((result) => {
      //generateOauthExampleData()
      console.log(result);
    })
    .catch((err) => {
      throw Error('Error with database connection' + err);
    });
});
