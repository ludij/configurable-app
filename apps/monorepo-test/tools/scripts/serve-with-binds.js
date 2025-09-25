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
    console.log(`▶️ Running plugin:configure with: ${config}`);
    execSync(`nx run plugins:configure --config=${config}`, {
      stdio: 'inherit',
    });
  } catch (err) {
    console.error('❌ Error running configure target for NX:', err);
    process.exit(1);
  }
}

try {
  const serveCommand = configuration
    ? `nx run monorepo-test:start:${configuration}`
    : `nx run monorepo-test:start`;
  console.log(`▶️ Starting serve${configuration ? `:${configuration}` : ''}`);
  execSync(serveCommand, { stdio: 'inherit' });
  console.log('✅ Done');
} catch (err) {
  console.error('❌ Error running start target for NX:', err);
  process.exit(1);
}
