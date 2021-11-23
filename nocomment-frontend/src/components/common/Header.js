import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useTranslation } from 'react-i18next';
const HeaderBlock = styled.div`
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin-right: auto;
    margin-left: auto;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user }) => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            NoComment
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.name}</UserInfo>
              <LogoutButton user={user}>{t('signout')}</LogoutButton>
            </div>
          ) : (
            <div>
              <Button to="/login">{t('signin')}</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
    </>
  );
};

export default Header;
