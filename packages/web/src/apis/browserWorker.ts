import { setupWorker } from 'msw/browser';
import { getMusseukMock } from './orval/orval.msw';

export const worker = setupWorker(...getMusseukMock());
