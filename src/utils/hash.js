const bcrypt = require("bcrypt")

function hashPassword(password){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

function compare(raw, hash){
    const result = bcrypt.compareSync(raw, hash)
    return result;
}

module.exports = {hashPassword, compare};