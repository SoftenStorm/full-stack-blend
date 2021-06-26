module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-env",
    "@babel/preset-es2015"
  ],
  plugins: [
    "@babel/plugin-transform-regenerator",
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-transform-runtime",
    "react-auto-binding",
    "transform-react-pug",
    "transform-class-properties",
  ]
};

