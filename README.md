# 36기 2차 프로젝트 'Winnerest'



 ![메인 파일](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F9Cp4b%2FbtrLMzIWjfm%2FQfmklxGjs9MGLKSHHmx0eK%2Fimg.png)
 
 
- [Pinterest](https://www.pinterest.co.kr/)라는 사진에 기반한 소셜 SNS를 클론하여 프로젝트를 진행하였습니다. 

<hr/>

## 개발 기간
- 2022년 8월 29일 ~ 2022년 9월 8일 (10일)

<hr/>

## Winnerest
- FE : 권영준, 조은지, 김다현 (총 3명) - [프론트 엔드 Git hub](https://github.com/wecode-bootcamp-korea/36-2nd-Winnerest-frontend)
- BE : [백민석](https://github.com/sk8ilar), [길성민](https://github.com/Seongmin-Gil) (총 2명)

<hr/>

## &#127919; 백엔드 사용 기술 
- <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Mysql 8.0-4479A1?style=for-the-badge&logo=Mysql&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
 <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=Nodemon&logoColor=white"> <img src="https://img.shields.io/badge/jsonwebtokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">

<hr/>

 ## 협업 툴
 <img src="https://img.shields.io/badge/Notion-1c1c1c?style=flat-square&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Slack-553830?style=flat-square&logo=Slack&logoColor=white"/>
 <img src="https://img.shields.io/badge/Trello-%23026AA7.svg?style=flat-square&logo=Trello&logoColor=white">

 
## &#127919; 구현 기능 
 ### 백민석 
 - 카카오 API 구현 
   - 프론트쪽에서 카카오 엑세스 토큰을 전달받고, fetch함수로 카카오 서버에 토큰을 전달하여 사용자 정보를 전달받는 과정으로 구성
 - AWS- S3를 이용한 사진 업로드와 삭제 구현 
   - form 데이터를 받을 수 있게 만들어주는 multer 모듈 사용
 - 리뷰와 댓글 좋아요 CRUD 구현

## &#127919; 문제 해결 경험(내가 구현한 기능중)
 - 카카오 API 구현 문제
   - 프론트쪽에서 카카오 엑세스 토큰을 백엔드 쪽으로 전달해주는 방향으로 구현
   - ``` 
     const logIn = async (accessToken) => {

         const response = await fetch("https://kapi.kakao.com/v2/user/me", {
         method: "GET",
           headers: {
           "Authorization": `Bearer ${accessToken}`,
           "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
           })
         .then(res => res.json())

         const nickname = response.properties.nickname
         const kakaoId = response.id
         const profileImgUrl = response.properties.thumbnail_image

         if (!nickname || !kakaoId) {
         throw new ErrorCreater("KEY_ERROR", 400)
          }

         let user = await userDao.getUserByKakaoId(kakaoId);

         if (!user) {
         const result = await userDao.createUser(nickname, kakaoId, profileImgUrl);
         user = await userDao.getUserById(result.insertId)
          }
         return jwt.sign({ sub: user.id, exp: Math.floor(Date.now() / 1000) + (600 * 600) }, process.env.JWT_SECRET);}       
 - aws S3를 이용하여, 사진 업로드 기능 구현
   - 수 많은 사진들을 전부 저장하기 위해서 용량이 무한대인 S3를 사용하는게 합리적이라고 판단하였음
   - form 데이터 형식을 받기 위해 multer 모듈을 사용
   - ``` 
         const multer = require('multer');
         const multerS3 = require('multer-s3');
         const aws = require('aws-sdk');

         const s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: `ap-northeast-2`})

         const upload = multer({
           storage: multerS3({
             s3: s3,
             bucket: process.env.bucket,
             contentType: multerS3.AUTO_CONTENT_TYPE,
             key: function (req, file, cb) {
               cb(null, `${Date.now()}_${file.originalname}`);},}),})
         module.exports = upload;
 - global error handler 적용
   - class 객체를 이용하여, error message와 status code를 커스터 마이징함.
   - ``` 
         module.exports = class ErrorCreater extends Error {
         constructor(message, statusCode) {
         super(message);
         this.name = this.constructor.name;

         Error.captureStackTrace(this, this.constructor);

         this.statusCode = statusCode || 500;}};
<br/>

## &#128218; 팀 프로젝트 자료

 - &#128073; [WINNEREST 시연 영상 보러가기](https://www.youtube.com/watch?v=ylfITz5h1ps)
 - &#128073; [API 명세서 보러가기](https://docs.google.com/spreadsheets/d/1jLSj36m0BL2PonqRvVI3LOHWBiAV-856DLTmXqWqwT0/edit#gid=0)

## 추가사항
- docker 이용해서 배포 완료
<br/>


---
