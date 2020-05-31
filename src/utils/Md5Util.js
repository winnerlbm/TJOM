let md5 = require('md5');

const Md5Util = {
    salt: 'fa5368a1-34f0-5fa9-9418-2b715b19cbb3',
    generateMd5(pwd) {
        return md5(pwd + this.salt)
    }
};

export default Md5Util;