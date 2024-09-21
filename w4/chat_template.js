process.stdout.write('You: ');

process.stdin.addListener('data', (data) => {
  console.log('Response: ' + data.toString());
  process.stdout.write('You: ');
});

// feel free to use the chalk package to add colors to your console logs
