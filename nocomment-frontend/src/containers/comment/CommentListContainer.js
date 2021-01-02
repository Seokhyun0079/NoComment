import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listDrawingComment } from '../../modules/drawingComments';

export const CommentListContainer = ({ match }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { drawingComments, error, loading, user } = useSelector(
    ({ drawingComments, loading, user }) => ({
      drawingComments: drawingComments.drawingComments,
      error: drawingComments.error,
      loading: loading['drawingComment/LIST_DRAWING_COMMENT'],
      user: user.user,
    }),
  );
  useEffect(() => {
    dispatch(listDrawingComment({ postId }));
  }, [dispatch, postId]);
  return <div></div>;
};

export default withRouter(CommentListContainer);
