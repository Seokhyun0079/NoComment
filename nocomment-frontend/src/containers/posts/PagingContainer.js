import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import {
  NonStyleInput,
  RoundInputContainer,
} from '../../components/common/StyledTag';
const PagingContainer = () => {
  const history = useHistory();
  const inputRef = useRef();
  const onKeyUp = (e) => {
    console.log(e);
    if (e.keyCode === 13) {
      let value = inputRef.current;
      console.log(value);
      history.push('/@' + value.value);
    }
  };
  return (
    <div
      style={{
        paddingBottom: '5rem',
      }}
    >
      <RoundInputContainer onKeyUp={onKeyUp}>
        <NonStyleInput ref={inputRef} />
      </RoundInputContainer>
    </div>
  );
};

export default PagingContainer;
