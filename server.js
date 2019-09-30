const express = require('express');
const cookie = require('cookie-parser');
const app = express();

app.use(cookie());
app.use(express.static('dist'));

const port = 3000;

app.listen(port, function() {
    console.log(`Server listening port ${port}`);
});
