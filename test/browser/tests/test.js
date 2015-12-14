import assert from 'assert';
import app from 'app/app';
// import { Storage } from '../src/common/storage';

describe('Browser tests', function() {
    it('imports angular', function() {
        assert.equal(typeof angular, 'object');
    });

    it('imports app', function() {
        assert.equal(typeof app, 'object');
    });
});
