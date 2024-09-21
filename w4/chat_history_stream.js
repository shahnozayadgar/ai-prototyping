import { basicPrompt, streamPrompt } from '../utils/prompts.js';
import chalk from 'chalk';

let messages = [];

process.stdout.write('You: ');

process.stdin.addListener('data', async (data) => {
  const aiResponseStream = await streamPrompt(
    data.toString().trim(),
    {},
    messages
  );
  // messages.push(aiResponse);
  process.stdout.write(chalk.magenta('AI: '));
  let result = '';
  for await (const chunk of aiResponseStream) {
    const text = chunk.choices[0]?.delta?.content || '';
    process.stdout.write(chalk.magenta(text));
    result += text;
  }
  if (result) {
    messages.push({
      role: 'assistant',
      content: result,
    });
  }
  process.stdout.write('\nYou: ');
});

process.on('SIGINT', function () {
  console.log(chalk.magenta('\nGoodbye!'));
  process.exit();
});
