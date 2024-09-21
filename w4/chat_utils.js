import inquirer from 'inquirer';
import chalk from 'chalk';

export async function getInput(messagePrompt) {
  const questions = [
    {
      type: 'input',
      name: 'content',
      message: chalk.bgBlue(messagePrompt),
    },
  ];
  return inquirer.prompt(questions).then((answer) => answer.content?.trim());
}

export function printAnswer(answerPrompt, answer) {
  console.log(
    '  ' + chalk.bgMagenta(answerPrompt) + chalk.magenta(` ${answer}`)
  );
}
