const path = require('path');
const isBuild = process.env.NODE_ENV === 'production';

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    localIdentName: isBuild ? '[hash:base64:5]' : '[local]-[hash:base64:5]',
  },
}