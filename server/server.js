const express = require('express');
const app = express();
const path = require('path');
const publicPath=path.join(__dirname,'..','build');
const port = process.env.PORT || 3001

app.use(express.static(publicPath));

app.get('/ping', function (req, res) {
  return res.send('pong');
 });

 //app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) =>{
    console.log(publicPath);
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () =>{
    console.log('Server is up');
});