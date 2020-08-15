import React from 'react';
import { logout } from '../../modules/user';
import { useDispatch } from 'react-redux';
import Button from '../../components/common/Button';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { changeField, initializeForm } from '../../modules/auth';
import { useEffect } from 'react';

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

const AuthCodeForm = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
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
  useEffect(() => {
    dispatch(initializeForm('authCode'));
  }, [dispatch]);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <AuthFormBlock>
      <form>
        <StyledInput
          autoComplete="authCode"
          name="authCode"
          placeholder="인증코드를 입력해주세요."
          type="text"
          onChange={onChange}
          onSubmit={onSubmit}
          //   value={form.authCode}
        />
        <ButtonWidthMarginTop cyan fullWidth>
          인증
        </ButtonWidthMarginTop>
      </form>
      <Button onClick={onLogout}>로그아웃</Button>
    </AuthFormBlock>
  );
};

export default withRouter(AuthCodeForm);
