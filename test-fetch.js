// test-fetch.js
const fetch = require('node-fetch');

async function test() {
  try {
    const res = await fetch('https://api.sheetbest.com/sheets/42cb92df-41b2-4446-99aa-b866d360fd59');
    const data = await res.json();
    console.log('Rows fetched:', data.length);
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

test();
