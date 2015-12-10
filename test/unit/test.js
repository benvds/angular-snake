import { describe, it } from 'mocha';
import assert from 'assert';
import { Storage } from '../../src/common/storage';

describe('Storage', function() {
    const localStorage = {
        getItem: () => {},
        setItem: () => {},
    };
    const $window = { localStorage: localStorage };

    it('contains the getItem method', function() {
        assert.equal(typeof (new Storage($window)).getItem, 'function');
    });
});
