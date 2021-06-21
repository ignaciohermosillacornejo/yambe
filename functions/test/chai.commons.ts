import 'mocha';
import * as chai from 'chai';
import originalSinon from 'sinon';
import chaiExclude from 'chai-exclude';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiExclude);
chai.use(deepEqualInAnyOrder);

export const { assert, expect } = chai;
export const sinon = originalSinon;
