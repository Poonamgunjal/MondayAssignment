var express = require('express'),
    app = express();
app.use(express.static(__dirname));
app.listen(3333);
console.log('Running......3333');