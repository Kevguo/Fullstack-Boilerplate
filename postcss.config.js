module.exports = {
  plugins: {
    "postcss-import": {
      root: __dirname
    },
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true
      }
    },
    cssnano: {}
  }
};
