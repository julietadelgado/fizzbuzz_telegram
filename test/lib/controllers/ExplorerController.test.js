const ExplorerController = require("./../../../lib/controllers/ExplorerController");

describe("Test for ExplorerController", () => {
    test("1. Validate if returns list of explorers with mission node", () => {
        const explorersInNode = ExplorerController.getExplorersByMission("node");
        expect(explorersInNode).toEqual(
            expect.arrayContaining([
                expect.objectContaining({mission: "node"})
            ])
        );
    });
    test("2. Get Explorers UsernamesByMission", () => {
        const explorerUserNamesInNode = ExplorerController.getExplorersUsernamesByMission("node");
        expect(explorerUserNamesInNode).toContain("ajolonauta13");
    });
    test("3. Get Explorers Amount by mission", () => {
        const quantityExplorersInNode = ExplorerController.getExplorersAmonutByMission("node");
        expect(quantityExplorersInNode).toBe(10);
    });
    test("4. Get Validation Fizzbuzz", () => {
        expect(ExplorerController.applyFizzbuzz("one")).toBe("Error: The value is not a number"); 
        expect(ExplorerController.applyFizzbuzz(1)).toBe(1); 
        expect(ExplorerController.applyFizzbuzz(3)).toBe("FIZZ");
        expect(ExplorerController.applyFizzbuzz(5)).toBe("BUZZ");
        expect(ExplorerController.applyFizzbuzz(15)).toBe("FIZZBUZZ");
    });
    test("5. Get Bot Response Fizzbuzz", () => {
        const responseBot1 = ExplorerController.getTelegramResponse(1);
        expect(responseBot1).toBe("FizzBuzz \n\nTu número es: 1. Validación: 1"); 
        const responseBot3 = ExplorerController.getTelegramResponse(3);
        expect(responseBot3).toBe("FizzBuzz \n\nTu número es: 3. Validación: FIZZ");
        const responseBot5 = ExplorerController.getTelegramResponse(5);
        expect(responseBot5).toBe("FizzBuzz \n\nTu número es: 5. Validación: BUZZ");
        const responseBot15 = ExplorerController.getTelegramResponse(15);
        expect(responseBot15).toBe("FizzBuzz \n\nTu número es: 15. Validación: FIZZBUZZ");
        const responseBot_string = ExplorerController.getTelegramResponse("string");
        expect(responseBot_string).toBe("Envía un número o misión válido");
        const responseBot_node = ExplorerController.getTelegramResponse("node");
        expect(responseBot_node).toContain('Los explorers en node');
    });
});