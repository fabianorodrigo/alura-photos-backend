const fs = require('fs');

const databasePath = './data/users.json';

export function readUsers(){
    let retorno = [];
    if(fs.existsSync(databasePath)){
        const data = fs.readFileSync(databasePath);
        retorno = JSON.parse(data);
    }
    return retorno;
}

export function writeUser(user){
    let dados = [];
    if(fs.existsSync(databasePath)){
        const data = fs.readFileSync(databasePath);
        dados = JSON.parse(data);
    }
    dados.push(user);
    fs.writeFileSync(databasePath,dados);
}