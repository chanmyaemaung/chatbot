const dotenv = require("dotenv")
dotenv.config()
const openai = require("openai");

const { Configuration, OpenAIApi } = openai;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const ai = new OpenAIApi(configuration);

module.exports = ai;