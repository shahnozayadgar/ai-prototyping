import axios from 'axios';
import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI();

export function basicPrompt(userPrompt, options = {}, context = []) {
  const messages = [
    ...context,
    {
      role: 'user',
      content: userPrompt,
    },
  ];
  return axios({
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: {
      model: 'gpt-4o-mini',
      temperature: 0,
      ...options,
      messages,
    },
  }).then((res) => {
    const choice = res.data.choices[0];
    if (choice.finish_reason === 'stop') {
      return choice.message;
    }
    throw new Error('No response from AI');
  });
}

export function streamPrompt(userPrompt, options = {}, context = []) {
  const messages = [
    ...context,
    {
      role: 'user',
      content: userPrompt,
    },
  ];
  return openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    ...options,
    messages,
    stream: true,
  });
}
