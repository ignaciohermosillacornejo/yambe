import * as functions from 'firebase-functions';
import { sinon } from '../chai.commons';

export const startLoggingStubs = (logStubs: any) => {
  logStubs.info = sinon.stub(functions.logger, 'info');
  logStubs.debug = sinon.stub(functions.logger, 'debug');
  logStubs.warn = sinon.stub(functions.logger, 'warn');
  logStubs.error = sinon.stub(functions.logger, 'error');
  logStubs.log = sinon.stub(functions.logger, 'log');
  logStubs.write = sinon.stub(functions.logger, 'write');
};

export const stopLoggingStubs = (logStubs: any) => {
  logStubs.info.restore();
  logStubs.debug.restore();
  logStubs.warn.restore();
  logStubs.error.restore();
  logStubs.log.restore();
  logStubs.write.restore();
};

export const resetLoggingStubs = (logStubs: any) => {
  logStubs.info.resetHistory();
  logStubs.debug.resetHistory();
  logStubs.warn.resetHistory();
  logStubs.error.resetHistory();
  logStubs.log.resetHistory();
  logStubs.write.resetHistory();
};
