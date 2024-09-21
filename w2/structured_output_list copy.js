import 'dotenv/config';
import OpenAI from 'openai';

import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const openai = new OpenAI();

const Person = z.object({
  name: z.string(),
  phone_number: z.object({
    area_code: z.string(),
    number: z.string(),
  }),
  city: z.string(),
  country: z.string().optional(),
});

const PersonList = z.object({
  entries: z.array(Person),
});

const completion = await openai.beta.chat.completions.parse({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'user',
      content: 'Give me a list of 2 people with this format.',
    },
  ],
  response_format: zodResponseFormat(PersonList, 'person_output'),
});

const person_output = completion.choices[0].message.parsed;
const { entries } = person_output;
console.log(entries);
