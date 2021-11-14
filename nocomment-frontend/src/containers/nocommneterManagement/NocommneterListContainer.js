import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NocommneterList from '../../components/NocommneterManagement/NocommneterList';
import NocommnterEditDialog from '../../components/nocommnter/EditDialog';
import { getNocommneterListAction } from '../../modules/nocommneter';

const NocommenterListBlock = styled.div`
  background: white;
  margin-top: 1rem;
`;

const NocommneterListContainer = () => {
  const { ncList, error, loading } = useSelector(
    ({ handleNocommneterActions, loading }) => {
      return {
        ncList: handleNocommneterActions.ncList,
      };
    },
  );
  const [state, setState] = useState({
    visible: false,
    nocommneter: null,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNocommneterListAction());
  }, [dispatch]);
  return (
    <NocommenterListBlock>
      <NocommneterList NocommneterList={ncList} setState={setState} />
      <NocommnterEditDialog state={state} setState={setState} />
    </NocommenterListBlock>
  );
};

export default NocommneterListContainer;
