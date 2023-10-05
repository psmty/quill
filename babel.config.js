module.exports = {
  presets: [['@babel/preset-env', {
    "targets": {
      "esmodules": false,
      "ie": "11"
    }
  }], '@babel/preset-typescript'],
};
