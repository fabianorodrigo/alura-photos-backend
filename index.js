const express = require('express')
const cors = require('cors');

const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const {readUsers, writeUser } = require('./users');

const app = express()
app.use(cors())
app.use(express.json());

const port = 3000;

app.use(function(req, res, next) {
  //permitir o envio do header x-access-token. O httpClient do Angular não está conseguindo (embora o Postman consiga sem isso)
  res.header("Access-Control-Expose-Headers", "Origin, X-Requested-With, X-XSRF-TOKEN, x-access-token, Authorization, Content-Type, Accept");
  next();
});



app.post('/user/login/', (req, res) => {
  const users = readUsers();
    if(users.find(e=> e.userName == req.body.userName && e.password == req.body.password )){
      const accessToken = jwt.sign({userName: req.body.userName, roles: ['FULL']}, accessTokenSecret);
      res.header('x-access-token', accessToken).json({userName: req.body.userName, sucesso: true});
    }else{
        res.status(401).send(`Usuário senha inválidos: ${req.body.userName}, ${req.body.password}`);
    }
});

app.get('/user/exists/:userName/', (req, res) => {
  const users = readUsers();
  res.json({exists: users.exists(e=> e.userName == req.params.userName)});
});

app.post('/user/register/', (req, res) => {
  writeUser(req.body);
  res.json(user);
});

app.get('/:userName/fotos', (req, res) => {
  let photos = [];
  if (req.params.userName === 'fabiano') {
    photos = [
      {
        url: 'https://uploads-ssl.webflow.com/5fa55b2822303ed3e04a22da/5fb5364bf8849937693160db_27.png',
        description: 'Ancine',
      },
      {
        url: 'http://dsgov.estaleiro.serpro.gov.br/assets/img/govbr-logo-large.png',
        description: 'govbr',
      },
      {
        url: 'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
        description: 'Stack',
      },
      {
        url: 'https://assets.umbler.com/site/home/2021/header-app-dashboard.png?v=20210428030328',
        description: 'Umbler',
      },
      {
        url: 'https://pbs.twimg.com/card_img/1387120330481754118/YgXB4tsx?format=jpg&name=small',
        description: 'Prettier',
      },
    ];
  } else {
    photos = [
      {
        url:
          'https://s2.glbimg.com/x8GqURWkuqSUW7G56YxUVlFWL5U=/0x0:1700x1065/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/j/Y/uArM7YRvCyVOA7DvSReA/china1.jpg',
        description: 'Foguete',
      },
      {
        url:
          'https://s2.glbimg.com/LMLg9k_ETyaiJkUNpYAOaBIDZ1Q=/85x47:1648x927/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/6/s/JJicXXQ2O7P9GOwjD40A/ez3vlz-wyaeaasc.jpg',
        description: 'Galeano',
      },
      {
        url: 'https://assets.umbler.com/site/home/2021/header-app-dashboard.png?v=20210428030328',
        description: 'Umbler',
      },
    ];
  }
  res.json(photos);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})