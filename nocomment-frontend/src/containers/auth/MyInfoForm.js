import React, { useEffect } from 'react';
import Button from '../../components/common/Button';
import { RoundInput } from '../../components/common/StyledTag';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, update } from '../../modules/auth';
import ProfileContainer from './ProfileContainer';

const MyInfoForm = () => {
  const dispatch = useDispatch();
  const { user, form } = useSelector(({ user, auth }) => ({
    user: user.user,
    form: auth.update,
  }));
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'update',
        key: name,
        value,
      }),
    );
  };
  const onSumbit = (e) => {
    e.preventDefault();
    const { name } = form;
    dispatch(
      update({
        name: name,
      }),
    );
  };
  useEffect(() => {
    dispatch(initializeForm('update'));
  }, [dispatch, user]);
  if (user) {
    return (
      <div
        style={{
          width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '1rem',
        }}
      >
        <h2>profile</h2>
        <ProfileContainer />
        <form>
          <h4>아이디</h4>
          <RoundInput
            name="stringId"
            type="text"
            value={user.stringId || ''}
            readOnly
            disabled
          />
          <h4>이메일</h4>
          <RoundInput
            name="stringId"
            type="text"
            value={user.email || ''}
            readOnly
            disabled
          />
          <h4>유저명</h4>
          <RoundInput
            name="name"
            type="text"
            placeholder={user.username || ''}
            onChange={onChange}
          />
        </form>
        <Button
          style={{
            marginTop: '1.5rem',
            width: '100%',
            height: '40px',
            borderRadius: '10px',
          }}
          onClick={onSumbit}
        >
          프로필 수정
        </Button>
      </div>
    );
  }
  return <>로그인 먼저 해주셈!</>;
};

export default MyInfoForm;
