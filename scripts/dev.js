const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const backendDir = path.join(rootDir, 'ski-project', 'backend');
const frontendDir = path.join(rootDir, 'ski-project', 'frontend');

// Find the correct uvicorn executable in the virtual environment
let uvicornCmd;
const winUvicorn = path.join(backendDir, '.venv', 'Scripts', 'uvicorn.exe');
const unixUvicorn = path.join(backendDir, '.venv', 'bin', 'uvicorn');

if (fs.existsSync(winUvicorn)) {
  uvicornCmd = winUvicorn;
} else if (fs.existsSync(unixUvicorn)) {
  uvicornCmd = unixUvicorn;
} else {
  uvicornCmd = 'uvicorn'; // Fallback to global uvicorn if venv is not set up
}

console.log(`[System] Using uvicorn at: ${uvicornCmd}`);
console.log('[System] Starting backend on http://localhost:8000 ...');
const backendProcess = spawn(uvicornCmd, ['app.main:app', '--reload'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

console.log('[System] Starting frontend on http://localhost:5173 ...');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const frontendProcess = spawn(npmCmd, ['run', 'dev', '--', '--host', '0.0.0.0'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

const cleanup = () => {
  console.log('\n[System] Stopping servers...');
  try {
    backendProcess.kill();
  } catch (e) {}
  try {
    frontendProcess.kill();
  } catch (e) {}
  process.exit();
};

// Handle cleanup events
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
