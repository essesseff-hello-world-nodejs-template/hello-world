const express = require('express');
const os = require('os');

const app = express();

// Read environment variables with defaults
const PORT = process.env.PORT || '8080';
const ENVIRONMENT = process.env.ENVIRONMENT || 'unknown';
const VERSION = process.env.VERSION || 'unknown';

function getHostname() {
    try {
        return os.hostname();
    } catch (error) {
        return 'unknown';
    }
}

// Main endpoint
app.get('/', (req, res) => {
    const timestamp = new Date().toISOString();
    const hostname = getHostname();
    
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Hello World - ${ENVIRONMENT}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 600px; margin: 0 auto; }
        .info { background: #f0f0f0; padding: 20px; border-radius: 5px; }
        h1 { color: #333; }
        .env { color: #0066cc; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World Node.js!</h1>
        <div class="info">
            <p><strong>Environment:</strong> <span class="env">${ENVIRONMENT}</span></p>
            <p><strong>Version:</strong> ${VERSION}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <p><strong>Hostname:</strong> ${hostname}</p>
        </div>
    </div>
</body>
</html>
    `;
    
    res.set('Content-Type', 'text/html');
    res.send(html);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        environment: ENVIRONMENT,
        version: VERSION
    });
});

// Readiness check endpoint
app.get('/ready', (req, res) => {
    res.json({
        status: 'ready',
        environment: ENVIRONMENT,
        version: VERSION
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Starting Hello World Node.js server on port ${PORT}`);
    console.log(`Environment: ${ENVIRONMENT}`);
    console.log(`Version: ${VERSION}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});
