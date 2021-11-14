import React from 'react';
import BasicAvatar from '../common/Avatar';
import Button from '../common/Button';
const NocommneterList = ({ NocommneterList, loading, error, setState }) => {
  // const onRemoveClick = () => {
  //   setModal(true);
  // };
  // const onCancel = () => {
  //   setModal(false);
  // };
  const openDialog = (nocommneter) => {
    setState({
      nocommneter: nocommneter,
      visible: true,
    });
  };
  return (
    <>
      {' '}
      {!loading && NocommneterList && (
        <table>
          <tbody>
            {NocommneterList.map((nocommneter) => (
              <tr>
                <td>
                  <BasicAvatar profileImg={nocommneter.profileImg} />
                </td>
                <td>{nocommneter.stringId}</td>
                <td>{nocommneter.name}</td>
                <td>{nocommneter.level === 'admin' ? '관리자' : '일반회원'}</td>
                <td>{nocommneter.email}</td>
                <td>
                  <Button
                    onClick={() => {
                      openDialog(nocommneter);
                    }}
                  >
                    정보수정
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default NocommneterList;
