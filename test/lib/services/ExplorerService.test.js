const Reader = require("./../../../lib/utils/Reader");
const ExplorerService = require("./../../../lib/services/ExplorerService");

const explorers = Reader.readJsonFile("./explorers.json");

describe("Test for ExplorerService", () => {
    test("1. Validate if filter array has node mission", () => {
        const explorersInNode = ExplorerService.filterByMission(explorers, "node");
        expect(explorersInNode).toEqual(
            expect.arrayContaining([
                expect.objectContaining({mission: "node"})
            ])
        );
    });
    test("2. Validate length explorers by mission", () => {
        const quantityExplorersInNode = ExplorerService.getAmountOfExplorersByMission(explorers, "node");
        expect(quantityExplorersInNode).toBe(10);
    });
    test("3. Get Explorers UsernamesByMission", () => {
        const explorerUserNamesInNode = ExplorerService.getExplorersUsernamesByMission(explorers, "node");
        expect(explorerUserNamesInNode).toContain("ajolonauta13");
    });
    
});