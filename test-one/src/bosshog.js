class Bosshog {
    constructor() {

    }

    getResult(min, max) {
        let result = [];

        for (var i = min; i <= max; i++) {

            if (i % 3 === 0 && i % 5 === 0) {
                result.push('BossHog');
                continue;
            }

            if (i % 3 === 0) {
                result.push('Boss');
                continue;
            }

            if (i % 5 === 0) {
                result.push('Hog');
                continue;
            }

            result.push(i);
        }

        return result;
    }
}

module.exports = Bosshog;