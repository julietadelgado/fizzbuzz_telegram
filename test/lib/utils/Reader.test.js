const Reader = require("./../../../lib/utils/Reader");
describe("Test for Reader", () => {
    test("1. Validate if read file and returns explorers", () => {
        const explorers = Reader.readJsonFile("./explorers.json");
        expect(explorers.length).toBe(15);
        expect(explorers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({mission: "node"})
            ])
        );
    });
});