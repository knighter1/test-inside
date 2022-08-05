const express = require('express');
const router = require('./routes');

const app = express();
app.use(express.json())
const port = 8128;

app.use((req, res, next) => {
    console.log(`Request ${req.method} on route ${req.url}`);
    next();
});

app.use(`/`, router);

try {
    app.listen(port, (err) =>
    {
        if (err) {
            console.log(`An error occurred on server creation: ${err.message}`);
        }

        console.log(`Listening to connections on ${port}`);
    });
}
catch (err) {
    console.log(`An error occurred: ${err.message}`);
    process.exit(1);
}
