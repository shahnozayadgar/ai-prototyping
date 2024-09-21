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

const completion = await openai.beta.chat.completions.parse({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'user',
      content: 'Give me a person',
    },
  ],
  response_format: zodResponseFormat(Person, 'person_output'),
});

const person_output = completion.choices[0].message.parsed;
console.log(person_output);

/* Output

{
  name: 'John Doe',
  phone_number: { area_code: '123', number: '456-7890' },
  city: 'Sample City',
  country: 'Sample Country'
}
*/
