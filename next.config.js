const withSvgr = require('next-svgr');

module.exports = withSvgr({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
});
