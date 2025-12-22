const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Read version from semver.txt
let version = 'unknown';
try {
    version = fs.readFileSync(path.join(__dirname, 'semver.txt'), 'utf8').trim();
} catch (error) {
    console.error('Could not read version:', error.message);
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Readiness check endpoint
app.get('/ready', (req, res) => {
    res.json({
        status: 'ready',
        timestamp: new Date().toISOString()
    });
});

// Main endpoint
app.get('/', (req, res) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World - Node.js</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        h1 {
            margin-top: 0;
            font-size: 2.5em;
        }
        .version {
            font-size: 1.2em;
            margin: 20px 0;
            padding: 10px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
        }
        .info {
            margin: 10px 0;
        }
        code {
            background: rgba(0, 0, 0, 0.3);
            padding: 2px 6px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Hello World - Node.js</h1>
        <div class="version">
            <strong>Version:</strong> <code>${version}</code>
        </div>
        <div class="info">
            <strong>Environment:</strong> <code>${process.env.NODE_ENV || 'development'}</code>
        </div>
        <div class="info">
            <strong>Node.js Version:</strong> <code>${process.version}</code>
        </div>
        <div class="info">
            <strong>Hostname:</strong> <code>${require('os').hostname()}</code>
        </div>
        <p style="margin-top: 30px;">
            This is a simple Node.js application running with Express framework,
            deployed via essesseff platform with trunk-based development workflow.
        </p>
    </div>
</body>
</html>
    `;
    res.send(html);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Version: ${version}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
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
