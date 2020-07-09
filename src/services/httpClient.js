import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

const httpClient = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { accept: 'application/json' },
    params: {},
  })
);

export { default as applyAuthMiddleware } from './middlewares/auth';

export default httpClient;
