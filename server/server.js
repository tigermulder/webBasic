const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const cors = require('cors')
const dataPath = './server/users/user.json';

app.use(express.json()); 
app.use(cors());


// GET 요청에 대한 핸들러 설정
app.get('/users', (req, res) => {
  fs.readFile( dataPath , 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Server Error' }); // JSON 형식으로 오류 응답을 반환
      return;
    }
    const users = JSON.parse(data).user;
    res.status(200).json(users);
  });
});


// POST 요청에 대한 핸들러 설정
app.post('/users', (req, res) => {
  const newUser = req.body;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if(err){
      res.status(500).send('서버에러입니다.')
      return
    }
    const dbData = JSON.parse(data).user;
    dbData.push(newUser)
    fs.writeFile(dataPath, JSON.stringify({user:dbData},null,2),(err)=>{
      if(err){
        console.error('파일 쓰기중 에러가 발생했습니다.',err)
        res.status(500).send('서버에러')
        return
      }
      res.status(201).send('데이터베이스에 새사용자가 성공적으로 추가되었습니다.')
    })
  })
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버가 실행되었습니다.`);
});
