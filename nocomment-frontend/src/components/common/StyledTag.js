import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export const Block = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

export const RoundInput = styled.input`
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid ${palette.gray[5]};
  outline: none;
  width: 100%;
  height: 30px;
  padding: 0.5rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const RoundInputContainer = styled.div`
  width: 500px;
  height: 300px;
  border-bottom: 1px solid ${palette.gray[1]};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 300px;
`;
