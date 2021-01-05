import React from 'react';

const CommentItem = ({ fileName, alt }) => {
  return <img src={'/api/drawingComment/getImageFile/' + fileName} alt={alt} />;
};

//

const CommentList = ({ drawingComments, loading, error }) => {
  if (error) {
    /**
     * エラーが発生しました。
     */
    return <div>에러가 발생하였습니다.</div>;
  }
  return (
    <>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && drawingComments && (
        <div>
          {drawingComments.map((drawingComment) => (
            <div key={drawingComment._id}>
              <span>{drawingComment.noCommenter.stringId}님의 댓글입니다.</span>
              <CommentItem
                fileName={drawingComment.fileName}
                alt="이미지 로드에 실패하였습니다."
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CommentList;
