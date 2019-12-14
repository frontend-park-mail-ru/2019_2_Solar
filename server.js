const express = require('express');
const cookie = require('cookie-parser');
const app = express();

app.use(cookie());
app.use(express.static('dist'));

const port = 3000;

// app.get("/sw.ts", (req, res) => {
//     res.sendFile(__dirname + "/src/sw.ts");
// });

app.all('*', function(req, res, next) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, function() {
    console.log(`Server listening port ${port}`);
});
