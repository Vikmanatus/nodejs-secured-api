import 'module-alias/register';
import http from 'http';
import expressApp from './app';

import { PORT } from '@/config';

const server = http.createServer(expressApp);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
