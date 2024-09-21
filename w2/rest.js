import axios from 'axios';

const url = 'https://my-json-server.typicode.com/makinteract/fake-server';

// GET

const one = await axios({
  method: 'get',
  url: `${url}/books/1`,
  //   responseType: 'json',
});

console.log('1', one.data, one.status);

// with parameters
const two = await axios({
  method: 'get',
  url: `${url}/books?genre=Computing`,
  //   responseType: 'json',
});

console.log('2', two.data, two.status);

// POST
const three = await axios({
  method: 'post',
  url: `${url}/books`,
  data: {
    title: 'Coders at Work',
    genre: 'Computing',
  },
});

console.log('3', three.data, three.status);

// PUT
const four = await axios({
  method: 'put',
  url: `${url}/books/1`,
  data: {
    title: 'Jurassic Park (Updated)',
    genre: 'Fiction',
  },
});

console.log('4', four.data, four.status);
