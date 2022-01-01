import { createTransport } from 'nodemailer';

const sendEmail = async (id, email, authCode) => {
  let transporter = createTransport({
    // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
    service: 'gmail',
    // host를 gmail로 설정
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // Gmail 주소 입력, 'testmail@gmail.com'
      user: process.env.NODEMAILER_USER,
      // Gmail 패스워드 입력
      pass: process.env.NODEMAILER_PASS,
    },
  });
  let info = await transporter.sendMail({
    // 보내는 곳의 이름과, 메일 주소를 입력
    from: `"NoComment " <${process.env.NODEMAILER_USER}>`,
    // 받는 곳의 메일 주소를 입력
    // to: 'seokhyun9923@naver.com',
    to: email,
    // 보내는 메일의 제목을 입력
    subject: '[NoComment] 이메일 인증',
    // 보내는 메일의 내용을 입력
    // text: 일반 text로 작성된 내용
    // html: html로 작성된 내용
    html: `<a href="localhost:3000/noComment/">회원인증 클릭 ㄱ</a>
    <p>아래의 인증 번호를 입력하여 인증을 완료해주세요</>
    <h2>${authCode}</h2>`,
  });
  console.log(info);
};

export default sendEmail;
