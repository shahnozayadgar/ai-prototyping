import { basicPrompt } from '../utils/prompts.js';
import chalk from 'chalk';

let messages = [];

process.stdout.write('You: ');

process.stdin.addListener('data', async (data) => {
  const aiResponse = await basicPrompt(data.toString().trim(), {}, messages);
  messages.push(aiResponse);
  console.log(chalk.magenta('AI: ' + aiResponse.content));
  process.stdout.write('You: ');
});

process.on('SIGINT', function () {
  console.log(chalk.magenta('\nGoodbye!'));
  process.exit();
});
