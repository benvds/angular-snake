var context = require.context('./test/browser', true, /.+\.js?$/);

context.keys().forEach(context);
module.exports = context;
