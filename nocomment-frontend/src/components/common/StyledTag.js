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
  &:foncus {
    color: $oc-teal-7;
    border-bottom: 1px slid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;
