const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to SIT753 DevOps API' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/add', (req, res) => {
    const x = Number(req.query.x);
    const y = Number(req.query.y);

    if (isNaN(x) || isNaN(y)) {
        return res.status(400).json({ error: 'x and y must be numbers' });
    }

    res.json({ result: x + y });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`SIT753 DevOps API running on port ${port}`);
    });
}

module.exports = app;
