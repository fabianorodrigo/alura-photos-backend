const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());

const port = 3000

app.post('/user/login/', (req, res) => {
    if(req.body.userName == 'fabiano' && req.body.password == 'senha'){
      res.json({userName: req.body.userName, sucesso: true});
    }else{
        res.status(401).send(`Usuário senha inválidos`);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})