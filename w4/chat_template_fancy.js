import { getInput, printAnswer } from './chat_utils.js';

while (true) {
  const input = await getInput('You:');
  printAnswer('AI:', input);
}
