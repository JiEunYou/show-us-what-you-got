import Logger from './helpers/logger';

let logger = new Logger();

class Bosshog {
    constructor() {

    }

    print(min, max) {
        for (var i = min; i <= max; i++) {

            if (i % 3 === 0 && i % 5 === 0) {
                logger.log('BossHog');
                continue;
            }

            if (i % 3 === 0) {
                logger.log('Boss');
                continue;
            }

            if (i % 5 === 0) {
                logger.log('Hog');
                continue;
            }

            logger.log(i);
        }
    }
}

module.exports = Bosshog;