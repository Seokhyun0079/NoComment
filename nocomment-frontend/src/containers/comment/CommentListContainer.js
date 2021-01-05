import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import RefreshButton from '../../components/common/RefreshButton';
import Responsive from '../../components/common/Responsive';
import CommentList from '../../components/drawingComment/CommentList';
import { listDrawingComment } from '../../modules/drawingComments';
const CommentListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

export const CommentListContainer = ({ match }) => {
  const dispatch = useDispatch();
  const { drawingComments, error, loading } = useSelector(
    ({ drawingCommentsHandleActions, loading }) => ({
      drawingComments: drawingCommentsHandleActions.drawingComments,
      error: drawingCommentsHandleActions.error,
      loading: loading['drawingComment/LIST_DRAWING_COMMENT'],
    }),
  );
  const { postId } = match.params;
  useEffect(() => {
    dispatch(listDrawingComment({ postId }));
  }, [dispatch, postId]);

  const buttonClick = () => {
    dispatch(listDrawingComment({ postId }));
  };
  return (
    <CommentListBlock>
      <RefreshButton onClick={buttonClick} />
      <CommentList
        drawingComments={drawingComments}
        error={error}
        loading={loading}
      />
    </CommentListBlock>
  );
};

export default withRouter(CommentListContainer);
