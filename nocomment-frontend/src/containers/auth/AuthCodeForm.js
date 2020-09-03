import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/common/Button';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { changeField, initializeForm, authCodeCheck } from '../../modules/auth';
import { useEffect } from 'react';
import { check } from '../../modules/user';
import LogoutButton from '../../components/common/LogoutButton';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:foncus {
    color: $oc-teal-7;
    border-bottom: 1px slid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;
const ButtonWidthMarginTop = styled(Button)`
  margin-top: 1rem;
`;
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875em;
  marign-top: 1rem;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    $:hover {
      color: ${palette.gray[9]};
    }
  }
`;
const AuthCodeForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.authCode,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'authCode',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { authCode } = form;
    dispatch(authCodeCheck({ stringId: user._id, authCode }));
  };
  useEffect(() => {
    dispatch(initializeForm('authCode'));
  }, [dispatch]);
  useEffect(() => {
    if (authError) {
      console.log(authError);
      if (authError.response.status === 401) {
        setError('인증번호가 틀립니다.');
        return;
      }
      console.log('이메일 인증에 실패했습니다.');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('이메일 인증 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);
  useEffect(() => {
    if (user) {
      if (user.emailCheck) {
        console.log('check API 성공');
        console.log(user);
        history.push('/');
      }
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not woriking');
      }
    }
  }, [history, user]);

  return (
    <AuthFormBlock>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="authCode"
          name="authCode"
          placeholder="인증코드를 입력해주세요."
          type="text"
          onChange={onChange}
          value={form.authCode}
        />
        <ErrorMessage>{error}</ErrorMessage>
        <ButtonWidthMarginTop cyan fullWidth>
          인증
        </ButtonWidthMarginTop>
      </form>
      <Footer>
        <LogoutButton type={'Link'} />
      </Footer>
    </AuthFormBlock>
  );
};

export default withRouter(AuthCodeForm);
