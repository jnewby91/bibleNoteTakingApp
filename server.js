const express = require('express');
const app = express();
app.use(express.static('public'));

console.log('Listening to Port 8080');
app.listen(process.env.PORT || 8080);


