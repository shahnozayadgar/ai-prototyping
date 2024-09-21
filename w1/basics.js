import path from 'path';
import fs from 'fs';
const fileName = path.join(path.resolve('..'), 'assets', 'people.json');

const people = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  //console.log(people);

// 1. Get a list of Initials (First Last name => all lowerchow iase) and sort them

const initials = people
  .map(({name, lastname}) => `${name[0]}${lastname[0]}`.toLowerCase())
  .sort();
  console.log(initials);

// // 2. Make a list of unique cities. How many unique cities are there?

const uniqueCities = [...new Set(people.map(({city}) => city))];
console.log(uniqueCities, uniqueCities.length);

// // 3. List all the area codes (the first 3 digits of the phone number)
// // that start with 900

const areacode = people 
  .map(({phone}) => phone.split('-')[0])
  .map(parseFloat)
  .filter((areacode) => areacode => 900 & areacode < 1000)
  .sort();
console.log(areacode);