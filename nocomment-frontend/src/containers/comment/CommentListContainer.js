import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentList from '../../components/drawingComment/CommentList';
import { listDrawingComment } from '../../modules/drawingComments';

export const CommentListContainer = ({ match, location }) => {
  const dispatch = useDispatch();
  const { drawingComments, error, loading, user } = useSelector(
    ({ drawingCommentsHandleActions, loading, user }) => ({
      drawingComments: drawingCommentsHandleActions.drawingComments,
      error: drawingCommentsHandleActions.error,
      loading: loading['drawingComment/LIST_DRAWING_COMMENT'],
      user: user.user,
    }),
  );
  const { postId } = match.params;
  useEffect(() => {
    dispatch(listDrawingComment({ postId }));
  }, [dispatch, postId]);

  return (
    <CommentList
      drawingComments={drawingComments}
      error={error}
      loading={loading}
      location={location}
    />
  );
};

export default withRouter(CommentListContainer);
