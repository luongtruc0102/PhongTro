const path = require('path');

module.exports = function override(config, env) {
  // Thêm fallback cho các module core của Node.js
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify")
  };

  return config;
};
