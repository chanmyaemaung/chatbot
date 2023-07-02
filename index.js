const readLineSync = require("readline-sync");
const colors = require("colors");
const ai = require("./config/open-ai");
const log = console.log;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  log(colors.bold.cyan("Welcome to simple CLI Chatbot!"));
  log(colors.bold.cyan("You can start chatting with the bot now!"));

  const chatMemories = [];

  while (true) {
    const userInput = readLineSync.question(colors.yellow("You: "));

    try {
      const messages = chatMemories.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: "user", content: userInput });

      const completion = await ai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      // Delay for 2 seconds before making the next API call
      await delay(2000);

      const completionText = completion.data.choices[0].message.content.trim();

      if (userInput.toLowerCase() === "exit") {
        log(colors.green("Bot:") + completionText);
        return;
      }

      log(colors.green("Bot:") + completionText);

      chatMemories.push(["user", userInput]);
      chatMemories.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error.message));
    }
  }
}

main();