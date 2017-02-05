import Logger from "./helpers/logger";
import sinon from "sinon";
import { expect } from "chai";
import Bosshog from './bosshog';

describe("bosshog", () => {
    let bosshog;

    beforeEach(() => {
        bosshog = new Bosshog();

    });

    afterEach(() => {
    });

    it("should return Bosshog values", () => {
        //Arrange


        //Act
        let result = bosshog.getResult(1, 15);

        //Assert
        expect(result).to.be.eql([1,
            2,
            'Boss',
            4,
            'Hog',
            'Boss',
            7,
            8,
            'Boss',
            'Hog',
            11,
            'Boss',
            13,
            14,
            'BossHog']);
    });
});