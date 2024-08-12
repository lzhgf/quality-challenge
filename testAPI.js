const https = require('https');

const measureResponseTime = (url) => {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    https.get(url, (res) => {
      const end = Date.now();
      const responseTime = end - start;
      resolve({ status: res.statusCode, time: responseTime });
    }).on('error', (e) => {
      reject(e);
    });
  });
};

const baseUrl = 'https://jsonplaceholder.typicode.com/users';
const pages = [1, 2, 3, 4, 5];

const testPages = async () => {
  for (let page of pages) {
    const url = `${baseUrl}?_page=${page}&_limit=5`;
    try {
      const result = await measureResponseTime(url);
      console.log(`Page ${page}: Status = ${result.status}, Time = ${result.time} ms`);
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error.message);
    }
  }
};

testPages();
