# Practice Launch X

### New feature Bot Telegram

In this repository we added a Telegram bot wich will return the validation of FizzBuzz, this are the response of the bot depending on the message you send:
1 - Your number is 1. Validation: 1
3 - Your number is 3. Validation: FIZZ
5 - Your number is 5. Validation: BUZZ
15 - Your number is 15. Validation: FIZZBUZZ
Node - List of explorers in Node
Java - List of explorers in Java
Other String - Send a valid number or mission

You can find the project without the bot here [Link to repo](https://github.com/julietadelgado/fizzbuzz_new_feature)

To add the bot follow the next steps:

1. Download and create a telegram account
2. Go to Bot Father link: https://telegram.me/BotFather
3. Name your bot
4. Save the token that the app will give you
5. Open the URL that the app will give you
6. Press Start
7. Install the Telegram bot dependency (`npm install node-telegram-bot-api --save`)
8. Install dotenv dependency and add your token to .env file (`npm install dotenv --save`). DO NOT VERSION .env FILE
9. Install ESLint (`npm install eslint --save-dev`)
10. Add bot code on `lib/bot.js`

```javascript
require("dotenv").config();

if(!process.env.TOKEN){
    throw new Error("No hay configuración con Api Token");
}

const TelegramBot = require("node-telegram-bot-api");
const ExplorerController = require("./controllers/ExplorerController");

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    const responseBot = ExplorerController.getTelegramResponse(message);
    bot.sendMessage(chatId, responseBot);
});
```

11. The bot response needs to be a string, for that we create two static methods in `ExplorerController`, `getTelegramResponse` and `giveStringFormatExplorersByMission`

`getTelegramResponse` will see the message received and if it is a number, calls the fizzbuzz validation (`ExplorerController.applyFizzbuzz`), if the message is a string then we get the Explorers by mission `ExplorerController.getExplorersByMission((message.toLowerCase())`, if the result is empty then we return an error message.

```javascript
static getTelegramResponse(message){
	let responseBot = "hola";
	
	if(!isNaN(parseInt(message))){
	    const numberToApplyFb = parseInt(message);
	    const fizzbuzzTrick = ExplorerController.applyFizzbuzz(numberToApplyFb);
	    responseBot = `FizzBuzz \n\nTu número es: ${numberToApplyFb}. Validación: ${fizzbuzzTrick}`;
	}
	else {
		const explorersByMission = ExplorerController.giveStringFormatExplorersByMission(ExplorerController.getExplorersByMission((message.toLowerCase())));
		if (explorersByMission != "")
			responseBot = "Validación por misión \n\nLos explorers en "+ message + " son: \n\n" + explorersByMission;
		else
			responseBot = "Envía un número o misión válido";
	}
        
        
	return responseBot;
}
```

`giveStringFormatExplorersByMission` will give string format at the response of the explorers by mission, for that we create the next function.
```javascript
static giveStringFormatExplorersByMission(students){
	let string = "";

	students.forEach(student => string +=    "Name: "+ student.name + "\n");
	return string;
}
```

12. Before call the bot, we can add a test to validate our functions
```javascript
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
	expect(responseBot_node).toContain("Los explorers en node");
});
```

13. If the test is correct, then we just need to run our bot (node lib/bot.js) and send message in Telegram and see the result.
![image](https://user-images.githubusercontent.com/48570016/167274438-cfc1f57b-5c33-4d52-8d4f-31652c021429.png)
![image](https://user-images.githubusercontent.com/48570016/167274448-a7d22649-dc81-4d11-8092-00f21554a26d.png)
