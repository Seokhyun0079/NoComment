import React from 'react';
import SubInfo from '../common/SubInfo';

const CommentItem = ({ fileName, alt }) => {
  return (
    <img
      style={{
        maxWidth: '100%',
      }}
      src={
        'https://nocommentbuket.s3-ap-northeast-1.amazonaws.com/drawingComment/' +
        fileName
      }
      alt={alt}
    />
  );
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
              <SubInfo
                name={drawingComment.noCommenter.name}
                stringId={drawingComment.noCommenter.stringId}
                publishedDate={drawingComment.publishedDate}
                hasMarginTop
              />
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
