import * as chai from 'chai';
import originalSinon from 'sinon';
import 'sinon-chai';
import 'chai-as-promised';

chai.should();
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

export const { assert, expect } = chai;
export const sinon = originalSinon;
