import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { RoundInputContainer } from '../../components/common/StyledTag';

const SearchBar = styled.input`
  width: 300px;
  height: 50px;
  border: 0;
  padding: 0 0 0 10px;
  font-size: 1.5rem;
  display: inline-block;
  fontfamily: Malgun Gothic;
  fontweight: bold;
  &:focus {
    outline: none;
  }
`;

const TightTd = styled.td`
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;

const SearchBarContainer = () => {
  const history = useHistory();
  const inputRef = useRef();
  const search = () => {
    let value = inputRef.current;
    history.push('?search=' + value.value);
  };
  const onkeyUp = (e) => {
    if (e.keyCode === 13) {
      search();
    }
  };
  const onClick = (e) => {
    search();
  };
  return (
    <>
      <RoundInputContainer
        onKeyUp={onkeyUp}
        style={{
          marginTop: '100px',
          width: '500px',
        }}
      >
        <table
          style={{
            borderCollapse: 'collapse',
          }}
        >
          <tr>
            <TightTd>
              <SearchBar ref={inputRef} />
            </TightTd>
            <TightTd
              style={{
                margin: '0 0 0 0',
                padding: '0 0 0 0',
              }}
            >
              <Button
                style={{
                  height: '50px',
                  padding: '0px 16px 0px 16px',
                  borderRadius: '0',
                  display: 'inline-block',
                }}
                onClick={onClick}
              >
                검색
              </Button>
            </TightTd>
          </tr>
        </table>
      </RoundInputContainer>
    </>
  );
};

export default SearchBarContainer;
