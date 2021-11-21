import React, { useEffect, useState } from 'react';
import AskModal from '../common/AskModal';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { initialize, updateNocommneterAction } from '../../modules/nocommneter';
import { DatePicker } from 'material-ui';
const NocommnterEditDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  useEffect(() => {
    dispatch(initialize('update'));
  }, [dispatch, user]);

  if (!state.visible) return null;
  const radioClick = (value) => {
    console.dir(state.nocommneter.invaliDate);
    setState({
      ...state,
      nocommneter: {
        ...state.nocommneter,
        level: value,
      },
    });
  };
  const radioChanged = (value) => {
    setState({
      ...state,
      nocommneter: {
        ...state.nocommneter,
        useable: value,
      },
    });
  };
  const selectDate = (value) => {
    setState({
      ...state,
      nocommneter: {
        ...state.nocommneter,
        invaliDate: value,
      },
    });
  };
  const onConfirm = () => {
    toast('갱신처리 넣는중');
    console.dir(state.nocommneter.invaliDate);
    dispatch(
      updateNocommneterAction({
        stringId: state.nocommneter.stringId,
        level: state.nocommneter.level,
        useable: state.nocommneter.useable,
        // invaliDate: invaliDate,
      }),
    );
  };
  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const EditDailogBody = (
    <>
      <h4>ID</h4>
      <div>{state.nocommneter.stringId}</div>
      <h4>닉네임</h4>
      <div>{state.nocommneter.name}</div>
      <h4>이메일</h4>
      <div>{state.nocommneter.email}</div>
      <h4>최종접속일</h4>
      <div>{state.nocommneter.lastLoginDate}</div>
      <h4>회원등급</h4>
      <div>
        <input
          type="radio"
          id="admin"
          name="level"
          value="admin"
          checked={state.nocommneter.level === 'admin'}
          onClick={() => {
            radioClick('admin');
          }}
        />
        <label htmlFor="admin">관리자</label>
      </div>
      <div>
        <input
          type="radio"
          id="nomal"
          name="level"
          value="nomal"
          checked={state.nocommneter.level === 'nomal'}
          onClick={() => {
            radioClick('nomal');
          }}
        />
        <label htmlFor="nomal">일반회원</label>
      </div>
      <h4>이용정지</h4>
      <input
        type="radio"
        id="useable"
        name="useable"
        value="useable"
        onChange={() => {
          radioChanged(true);
        }}
      />
      <label for="useable">이용가능</label>
      <input
        type="radio"
        id="disable"
        name="useable"
        value="disable"
        onChange={() => {
          radioChanged(false);
        }}
      />
      <label for="disable">정지</label>
      <br />
      <DatePicker
        disabled={state.nocommneter.useable}
        onChange={(x, event) => {
          selectDate(event);
        }}
        value={state.nocommneter.invaliDate}
      />
    </>
  );
  return (
    <>
      <AskModal
        visible={true}
        description={EditDailogBody}
        onConfirm={onConfirm}
        onCancel={onCancel}
      ></AskModal>
      <ToastContainer />
    </>
  );
};

export default NocommnterEditDialog;
