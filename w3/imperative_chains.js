import axios from 'axios';
import 'dotenv/config';

function prompt(userPrompt, options = {}, context = []) {
  return axios({
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: {
      model: 'gpt-4o-mini',
      max_tokens: 500,
      temperature: 0,
      ...options,
      messages: [
        ...context,
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    },
  }).then((res) => {
    const choice = res.data.choices[0];
    if (choice.finish_reason === 'stop') {
      return [choice.message];
    }
    throw new Error('No response from AI');
  });
}

async function imperativeChain(userPrompts = [], options = {}, context = []) {
  let result = context;
  for (const userPrompt of userPrompts) {
    result = await prompt(userPrompt, options, result);
  }
  return result;
}

// Calling the chain

try {
  const result = await imperativeChain(
    [
      'Tell a joke',
      'Translate it to Italian',
      'Ensure that the joke is funny or make a new one',
    ],
    { max_tokens: 500 },
    [
      {
        role: 'user',
        content: 'You are a funny AI',
      },
    ]
  );

  console.log(result[0].content);
} catch (error) {
  console.error(error.message);
}
