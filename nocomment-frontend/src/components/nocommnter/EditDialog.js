import React from 'react';
import AskModal from '../common/AskModal';
import { ToastContainer, toast } from 'react-toastify';
const NocommnterEditDialog = ({ state, setState }) => {
  if (!state.visible) return null;
  const radioClick = (value) => {
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
  const onConfirm = () => {
    toast('갱신처리 넣는중');
    // setState({
    //   ...state,
    //   visible: false,
    // });
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
      <input
        type="date"
        id="start"
        name="trip-start"
        disabled={state.nocommneter.useable}
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
