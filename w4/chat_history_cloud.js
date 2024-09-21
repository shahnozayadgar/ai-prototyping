import { basicPrompt } from '../utils/prompts.js';
import chalk from 'chalk';
import { getInput, printAnswer } from './chat_utils.js';
import {
  createThread,
  addMessageToThread,
  getThread,
} from './firebase_utils.js';

await getInput('Do you want to load the previous chat history? (y/n): ').then(
  async (response) => {
    if (response === 'n') {
      await createThread([
        {
          role: 'system',
          content: 'You are a helpful assistant. You can ask me anything.',
        },
      ]);
    }
  }
);

while (true) {
  const input = await getInput('You:');
  const thread = await getThread();

  const aiResponse = await basicPrompt(input, {}, thread);

  // // update the thread with the new messages
  addMessageToThread({
    role: 'user',
    content: input,
  });
  addMessageToThread(aiResponse);
  printAnswer('AI', aiResponse.content);
}
