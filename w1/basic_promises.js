// fetch the people.json file from the online repo
fetch(
  'https://gitlab.com/cs492f/w1-demos/-/raw/80764227029d9046a990a3cecc339e376429698b/people.json'
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
