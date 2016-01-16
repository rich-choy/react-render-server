/**
 * Simple tools for logging profiling data.
 *
 * You can use it like this:
 *
 *     const profile = require("./profile.js");
 *
 *     const fooProfile = profile.start("doing foo");
 *     foo();
 *     fooProfile.end();
 *
 * Which will log something that looks like this:
 *
 *     PROFILE: doing foo (finished after 16.7658 ms)
 */

const logging = require('winston');


const hrtToMs = (hrt) => {
    // high resolution timestamps are a tuple [seconds, nanoseconds]
    return hrt[0] * 1000 + hrt[1] / 1e6;
};

const start = (msg, includeStartMessage) => {
    // TODO(csilvers): return an empty function if the log-level is >= debug?
    if (includeStartMessage) {
        logging.debug('PROFILE: %s (start)', msg);
    }
    const startTime = process.hrtime();
    return {
        end: () => {
            const endTime = process.hrtime();
            logging.debug('PROFILE: %s (finished after %d ms)',
                msg,
                (hrtToMs(endTime) - hrtToMs(startTime)).toFixed(4));
        },
    };
};

module.exports = { start: start };