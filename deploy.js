const { exec } = require('child_process');

console.log("Starting local server...");
const serve = exec('npx serve -s dist -l 3000');

serve.stdout.on('data', (data) => {
  console.log(`Serve: ${data}`);
});

setTimeout(() => {
  console.log("Starting LocalTunnel...");
  const lt = exec('npx localtunnel --port 3000 --subdomain wira-portfolio-demo');
  
  lt.stdout.on('data', (data) => {
    console.log(`LocalTunnel URL: ${data}`);
  });
  
  lt.stderr.on('data', (data) => {
    console.error(`LocalTunnel Error: ${data}`);
  });
}, 2000);
