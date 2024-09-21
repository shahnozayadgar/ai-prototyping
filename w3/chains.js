import axios from 'axios';
import 'dotenv/config';

function prompt(userPrompt, options = {}) {
  return function (context = []) {
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
  };
}

const chain =
  (...fns) =>
  (x) =>
    fns.reduce((p, f) => p.then(f), Promise.resolve(x));

// Helper functions
function tap(context) {
  console.log(`Context:
    =====================
    ${context[0].content}
    =====================
    `);
  return context;
}

function jsonFormatter([{ content }]) {
  return JSON.parse(content);
}

function stringFormatter([{ content }]) {
  return content;
}

// 1. Simple chain
chain(
  prompt('Tell a joke', { max_tokens: 500 }), //
  prompt('Translate it to Italian', { max_tokens: 1000 }),
  prompt('Ensure that the joke is funny or make a new one')
)([
  {
    role: 'user',
    content: 'You are a funny AI',
  },
])
  .then('Example 1', console.log)
  .catch(console.error);

// 2. Chains with more complext logic

const jokeChain = chain(
  prompt('Tell me a joke about Elephants'), //
  prompt('Ensure it is funny')
);

function translateToLanguage(language) {
  if (language === 'Italian') {
    return chain(
      prompt('Translate it to Italian'), //
      prompt(
        'Ensure that the joke is still funny and makes sense when translated'
      ),
      prompt('Remove explanation but keep the joke')
    );
  } else if (language === 'Korean') {
    return chain(
      prompt('Translate it to Korean'), //
      prompt('Ensure that the translation is still funny'),
      prompt('Add a korean flag emoticon to the joke')
    );
  }
}

chain(
  jokeChain, //
  (joke) => {
    console.log(joke[0].content);
    return joke;
  },
  translateToLanguage('Korean')
)()
  .then('Example 2', console.log)
  .catch(console.error);
