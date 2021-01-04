npm init -y
npm i webpack --save-dev
npm i webpack-cli --save-dev
npm i babel-core babel-loader babel-preset-env --save-dev
npm install --save-dev @babel/core

create new file 'webpack.config.js' near index.html with->:
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

npx webpack --mode development / production
