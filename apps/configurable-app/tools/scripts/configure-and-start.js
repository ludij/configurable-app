#!/usr/bin/env node

const { execSync } = require('child_process');

// Parse CLI args manually
const args = process.argv.slice(2);
let config = null;
let configuration = null;

args.forEach((arg) => {
  if (arg.startsWith('--config=')) {
    config = arg.replace('--config=', '');
  } else if (arg.startsWith('--configuration=')) {
    configuration = arg.replace('--configuration=', '');
  }
});

if (config) {
  try {
    console.log(`▶️ Running plugins:configure with: ${config}`);
    execSync(`nx run plugins:configure --config=${config}`, {
      stdio: 'inherit',
    });
  } catch (err) {
    console.error('❌ Error running plugins:configure for NX:', err);
    process.exit(1);
  }
}

try {
  const serveCommand = configuration
    ? `nx run configurable-app:start:${configuration}`
    : `nx run configurable-app:start`;
  console.log(`▶️ Running start${configuration ? `:${configuration}` : ''}`);
  execSync(serveCommand, { stdio: 'inherit' });
  console.log('✅ Done');
} catch (err) {
  console.error('❌ Error running configurable-app:start for NX:', err);
  process.exit(1);
}
