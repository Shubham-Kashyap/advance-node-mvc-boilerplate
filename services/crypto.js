const bcrypt = require('bcrypt');

class Crypto {
    /**
    * -----------------------------------------------------
    * generate hash password string 
    * -----------------------------------------------------
    */
    encrypt = async (password) => {
        const hash = await bcrypt.hashSync(password, 10);
        return hash;
    }


    /**
    * -----------------------------------------------------
    * Compare hash password with plain text password 
    * -----------------------------------------------------
    */
    compare = async (plain_pwd, hash_pwd) => {
        return await bcrypt.compareSync(plain_pwd, hash_pwd);
    }
}

const obj = new Crypto();

exports.encryptHash = obj.encrypt;
exports.compareHash = obj.compare;