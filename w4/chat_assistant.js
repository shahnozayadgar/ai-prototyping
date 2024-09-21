import 'dotenv/config';
import OpenAI from 'openai';
import { getInput, printAnswer } from './chat_utils.js';

const openai = new OpenAI();
const ASSISTANT_NAME = 'Tutor';

const assistant = await getAssistant(ASSISTANT_NAME);
const thread = await createThread();

while (true) {
  const input = await getInput('You:');
  if (input === '') continue; // skip empty input

  try {
    const reply = await invokeAssistant(
      assistant, //
      thread,
      input
    );
    printAnswer('AI:', reply);
  } catch (e) {
    printAnswer('AI:', 'Sorry, I could not understand that.');
  }
}

// Assistant helpers functions

async function getAssistant(
  name,
  model = 'gpt-4o-mini',
  instructions = 'A simple assistant'
) {
  const assistant = await openai.beta.assistants
    .list({
      limit: 100,
    })
    .then((res) => {
      return res.data.find((assistant) => assistant.name === name);
    });
  if (assistant) return assistant;
  // else craete a new assistant
  return openai.beta.assistants.create({
    name,
    model,
    instructions,
  });
}

function deleteAssistant(assistant_id) {
  return openai.beta.assistants.del(assistant_id);
}

// Threads
function createThread() {
  return openai.beta.threads.create();
}

async function deleteThread(thread, verbose = false) {
  const response = await openai.beta.threads.del(thread.id);
  if (verbose) {
    console.log('Thread deleted\n', response);
  }
}

function addMessageToThread(thread, message) {
  return openai.beta.threads.messages.create(thread.id, message);
}

async function invokeAssistant(
  assistant,
  thread,
  prompt,
  model = 'gpt-4o-mini',
  instructions = 'A simple assistant'
) {
  addMessageToThread(thread, {
    role: 'user',
    content: prompt,
  });
  // run
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
    instructions: prompt,
    model,
  });

  // console.log(run);

  if (run.status === 'completed') {
    let messages = await openai.beta.threads.messages.list(thread.id);
    const answer = messages.data[0];
    return answer.content[0].text.value;
  } else {
    throw new Error("Couldn't complete the run");
  }
}

// Chat
function input(strings) {
  process.stdout.write(chalk.magenta(`${strings} `));
}
function ai(strings) {
  console.log(chalk.green('AI: ' + chalk.green(strings)));
}
