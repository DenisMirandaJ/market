import axios from 'axios';
import Bottleneck from 'bottleneck';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const a = process.env.EXTERNAL_MARKET_URL;

export const axiosInstance = axios.create({
  baseURL: process.env.EXTERNAL_MARKET_URL,
});

export const apiRateLimiter = new Bottleneck({
  minTime: 100, //miliseconds,
  maxConcurrent: 1,
});
