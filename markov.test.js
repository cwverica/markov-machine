const { MarkovMachine } = require('./markov')
let text = '';

describe("Should return a string of 25 words or less", () => {

    beforeAll(() => {
        let mm = new MarkovMachine("The cat in the hat is a bat")
        text = mm.makeText(25);
    });

    test("Should be defined", () => {
        expect(text).toBeDefined();
    });

    test("Should be a string", () => {
        expect(typeof (text)).toEqual('string');
    });

    test("Should have 25 words or less", () => {
        expect(text.split(' ').length).toBeLessThanOrEqual(25);
    });
});