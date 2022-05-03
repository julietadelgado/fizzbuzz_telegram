const Reader = require("./../../lib/utils/Reader");
const ExplorerService = require("./../../lib/services/ExplorerService");
const FizzbuzzService = require("./../../lib/services/FizzbuzzService");

class ExplorerController {
    static getExplorersByMission(mission){
        const explorers = Reader.readJsonFile("./explorers.json");
        return ExplorerService.filterByMission(explorers, mission);
    }
    static getExplorersUsernamesByMission(mission){
        const explorers = Reader.readJsonFile("./explorers.json");
        return ExplorerService.getExplorersUsernamesByMission(explorers, mission);
    }
    static getExplorersAmonutByMission(mission){
        const explorers = Reader.readJsonFile("./explorers.json");
        return ExplorerService.getAmountOfExplorersByMission(explorers,mission);
    }
    static applyFizzbuzz(number){
        return FizzbuzzService.applyValidationInNumber(number);
    }

    static getTelegramResponse(message){
        let responseBot = "hola";
        
        if(!isNaN(parseInt(message))){
            const numberToApplyFb = parseInt(message);
            const fizzbuzzTrick = ExplorerController.applyFizzbuzz(numberToApplyFb);
            responseBot = `FizzBuzz \n\nTu número es: ${numberToApplyFb}. Validación: ${fizzbuzzTrick}`;
        }
        else {
            const explorersByMission = ExplorerController.giveStringFormatExplorersByMission(ExplorerController.getExplorersByMission((message.toLowerCase())));
            console.log(explorersByMission)
            if (explorersByMission != "")
                 responseBot = "Validación por misión \n\nLos explorers en "+ message + " son: \n\n" + explorersByMission;
            else
                responseBot = "Envía un número o misión válido";
        }
        
        
        return responseBot;
    }
    static giveStringFormatExplorersByMission(students){
        let string = "";

        students.forEach(student => 
            string +=    "Name: "+ student.name + "\n"+
                        "GitHub username: "+ student.username + "\n"+
                        "Score: "+ student.score + "\n"+
                        "Mission: "+ student.mission + "\n"+
                        "Stacks: "+ student.stacks + "\n\n"
        )
        return string;
    }
}

module.exports = ExplorerController;