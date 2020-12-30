import React from 'react';

const CommentItem = ({ fileName }) => {
  return <img src={fileName} alt="" />;
};

const CommentList = ({ drawingComments, loading, error }) => {
  if (error) {
    /**
     * エラーが発生しました。
     */
    return <div>에러가 발생하였습니다.</div>;
  }
  return (
    !loading &&
    drawingComments && (
      <div>
        {drawingComments.map((drawingComment) => (
          <CommentItem img={drawingComment.fileName} />
        ))}
      </div>
    )
  );
};

export default CommentList;
