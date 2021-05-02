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

const Table = styled.table`
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
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
          marginTop: '50px',
          width: '380px',
        }}
      >
        <Table>
          <tbody>
            <tr>
              <TightTd>
                <SearchBar
                  placeholder="╰(*°▽°*)╯(●'◡'●)`(*>﹏<*)′"
                  ref={inputRef}
                />
              </TightTd>
              <TightTd>
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
          </tbody>
        </Table>
      </RoundInputContainer>
    </>
  );
};

export default SearchBarContainer;
