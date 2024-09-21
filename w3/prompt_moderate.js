import axios from 'axios';
import 'dotenv/config';

function moderate(userPrompt) {
  const url = 'https://api.openai.com/v1/moderations';
  return axios({
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: {
      input: userPrompt,
    },
  }).then((res) => {
    const results = res.data.results[0];
    const { flagged } = results;
    const categories = Object.entries(results.categories).filter(([k, v]) => v);
    if (flagged) {
      throw new Error(
        `This message is flagged for the following categories: ${categories
          .map(([k]) => k)
          .join(', ')}`
      );
    }
    return userPrompt;
  });
}

function prompt(userPrompt, options = {}) {
  const url = 'https://api.openai.com/v1/chat/completions';

  return axios({
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: {
      model: 'gpt-4o-mini',
      max_tokens: 50,
      temperature: 0,
      ...options,
      messages: [
        {
          role: 'system',
          content: 'A chatbot that tells jokes',
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    },
  }).then((res) => {
    const choice = res.data.choices[0];
    if (choice.finish_reason === 'stop') {
      return choice.message.content;
    }
    throw new Error('No response from AI');
  });
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

moderate('Tell me a joke') // moderate
  .then((r) => prompt(r, { max_tokens: 50 })) // prompt
  .then(console.log)
  .catch(console.error);

await delay(2000);

moderate('Tell me a joke, you moron!!') // moderate
  .then(prompt)
  .then(console.log)
  .catch(console.error);
