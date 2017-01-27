/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser');


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const controllers = require('./controllers/index');




if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get(/^(?!.*(api))/, function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
  app.use('/api/*', controllers);
  fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      app.use(route, controllers);
    }
  });

  //--------------------- MONGOOSE
  mongoose.connect('mongodb://localhost/koala');
  var db = mongoose.connection;
  db.on("error", function(err){
      console.log("Mongoose connection error", err);
  });
  db.once("open", function(){
      console.log("Mongoose connection Successful, check port 3000");
  });

} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(error) {
  if (error) {
    console.log(error);
  }
  console.info('==> 🐨 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser. 🐨', port, port);
});
