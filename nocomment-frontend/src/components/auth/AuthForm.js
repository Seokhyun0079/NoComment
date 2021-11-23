import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';
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

const ButtonWidthMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: 'signin',
  register: 'signup',
};

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875em;
  marign-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const { t } = useTranslation();
  const text = t(textMap[type]);
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="id"
          name="stringId"
          placeholder={t('id')}
          onChange={onChange}
          value={form.stringId}
        />
        {type === 'register' && (
          <>
            <StyledInput
              autoComplete="nickname"
              name="name"
              placeholder={t('nickname')}
              onChange={onChange}
              value={form.name}
            />
            <StyledInput
              autoComplete="email"
              name="email"
              placeholder={t('email')}
              onChange={onChange}
              value={form.email}
            />
          </>
        )}
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder={t('password')}
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-passowrd"
            name="passwordConfirm"
            placeholder={t('passwordConfirm')}
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        <ErrorMessage>{error}</ErrorMessage>
        <ButtonWidthMarginTop cyan fullWidth>
          {text}
        </ButtonWidthMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">{t('signup')}</Link>
        ) : (
          <Link to="/login">{t('signin')}</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
