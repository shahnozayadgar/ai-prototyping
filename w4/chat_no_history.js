import { basicPrompt } from '../utils/prompts.js';
import chalk from 'chalk';
process.stdout.write('You: ');

process.stdin.addListener('data', async (data) => {
  const aiResponse = await basicPrompt(data.toString().trim());
  console.log(chalk.magenta('AI: ' + aiResponse.content));
  process.stdout.write('You: ');
});

process.on('SIGINT', function () {
  console.log(chalk.magenta('\nGoodbye!'));
  process.exit();
});
