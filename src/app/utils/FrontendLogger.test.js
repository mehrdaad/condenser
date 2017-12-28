/* global describe, it */
import chai, { expect } from 'chai';

import { formatEventReport } from './FrontendLogger';

describe('formatEventReport', () => {
    it('should handle modern firefox/chrome errors with a stacktrace', () => {
        const modernErrorEvent = {
            error: {
                stack: 'i am a stacktrace',
            },
            message: 'i am a message',
        };

        const logged = formatEventReport(
            modernErrorEvent,
            'location',
            'version'
        );

        expect(logged.trace).to.equal('i am a stacktrace');
        expect(logged.message).to.equal('i am a message');
        expect(logged.version).to.equal('version');
        expect(logged.href).to.equal('location');
    });
    it('should handle errors from browsers that do not provide a stack trace', () => {
        const lameErrorEvent = {
            message: 'i am an old error',
        };

        const logged = formatEventReport(lameErrorEvent, 'location', 'version');

        expect(logged.trace).to.equal(false);
        expect(logged.message).to.equal('i am an old error');
        expect(logged.version).to.equal('version');
        expect(logged.href).to.equal('location');
    });
});
