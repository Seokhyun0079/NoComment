import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const kr = {
  translation: {
    commentSaveError: '코멘트 등록에 실패했습니다.',
    writeBtn: '새 글 등록',
    writePostError: '게시글 등록에 실패했습니다.',
    id: '아이디',
    password: '패스워드',
    passwordConfirm: '비밀번호 확인',
    nickname: '닉네임',
    email: '이메일',
    signin: '로그인',
    signup: '회원가입',
    signout: '로그아웃',
    test: 'true',
  },
};
const ja = {
  translation: {
    commentSaveError: 'コメント登録に失敗しました。',
    writeBtn: '投稿',
    writePostError: '投稿登録に失敗しました。',
    id: 'ID',
    password: 'パスワード',
    passwordConfirm: 'パスワード確認',
    nickname: 'ユーザー名',
    email: 'メールアドレス',
    signin: 'ログイン',
    signup: '新規登録',
    signout: 'ログアウト',
    test: 'true',
  },
};

const en = {
  translation: {
    commentSaveError: 'failed save comment.',
    writeBtn: 'write',
    writePostError: 'failed save post.',
    id: 'ID',
    password: 'PASSWORD',
    passwordConfirm: 'PASSWORD CONFIRM',
    nickname: 'NICKNAME',
    email: 'EMAIL',
    signin: 'signin',
    signup: 'signup',
    signout: 'signout',
    test: true,
  },
};
const resources = {
  ja: ja,
  'ja-JP': ja,
  'ko-KR': kr,
  ko: kr,
  'en-US': en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en-US',
});
export default i18n;
