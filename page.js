

// 필요한 모듈 로드
const express = require('express');
const mysql = require('mysql2/promise');

// Express 애플리케이션 생성
const app = express();
app.use(express.urlencoded({ extended: true }));

// MySQL 연결 정보
const dbConfig = {
  host: 3306,
  user: 'root',
  password: 'Csw1768csws!',
  database: 'nodejsex'
};

// 홈페이지에서 입력 폼을 렌더링
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>데이터 입력</title>
    </head>
    <body>
      <form action="/insert" method="post">
        이름: <input type="text" name="이름"><br>
        이메일: <input type="text" name="이메일"><br>
        <input type="submit" value="제출">
      </form>
    </body>
    </html>
  `);
});

// 데이터베이스에 데이터 삽입
app.post('/insert', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const 이름 = req.body.이름;
    const 이메일 = req.body.이메일;

    // 데이터베이스에 데이터 삽입
    const [rows, fields] = await connection.execute(
      'INSERT INTO TABLEX (name, mail) VALUES (?, ?)',
      [이름, 이메일]
    );

    connection.end();

    res.send('데이터가 성공적으로 입력되었습니다.');
  } catch (error) {
    res.status(500).send('데이터 입력 오류: ' + error.message);
  }
});

// 웹 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
