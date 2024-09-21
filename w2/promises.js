// Promise -> async/await

const url =
  'https://my-json-server.typicode.com/makinteract/fake-server/books/1';

fetch(url)
  .then((response) => response.json())
  .then((text) => console.log('1: ', text));

const res = await fetch(url); //this line uses await to pause execution until the fetch() request resolves 
const json = await res.json(); //this also waits for json method to resolve and converts the response to json
console.log('2: ', json);

// Promisify
import fs from 'fs';
import path from 'path';

const fileName = path.join(path.resolve('..'), 'assets', 'people.json');

fs.readFile(fileName, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('3: ', JSON.parse(data));
  }
});

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

const content = await readFile(fileName);
console.log('4: ', content);

// Delay with Promise

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

console.log('Start');
await delay(2000);
console.log('End');
