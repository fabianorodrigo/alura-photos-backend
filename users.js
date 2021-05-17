const fs = require('fs');
const path = require('path');

const databasePath = path.join(path.dirname(require.main.filename),'/data/users.json');

module.exports.readUsers = function readUsers(){
    let retorno = [];
    if(fs.existsSync(databasePath)){
        const data = fs.readFileSync(databasePath);
        retorno = JSON.parse(data);
    }
    return retorno;
}

module.exports.writeUser = function writeUser(user){
    let dados = [];
    if(fs.existsSync(databasePath)){
        const data = fs.readFileSync(databasePath);
        dados = JSON.parse(data);
    }
    dados.push(user);
    fs.writeFileSync(databasePath,dados);
}