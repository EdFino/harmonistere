const path = require('path');

module.exports = {
    resolve: {
        fallback: {
        "path": require.resolve("path-browserify")
        }
    }
};

module.exports = {
    resolve: {
      fallback: {
        util: require.resolve("util/")
      }
    }
  };