import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Responsive from '../../components/common/Responsive';
import { insert } from '../../modules/drawingComment';
import { withRouter } from 'react-router-dom';
import { listDrawingComment } from '../../modules/drawingComments';

const CommentWriteBlock = styled(Responsive)`
  padding: 0 0 0 0;
  padding-top: 3rem;
  padding-bottom: 5rem;
  padding-left: 2rem;
  margin-left: auto;
  margin-right: auto;
  background: white;
`;

export const CommentContainer = ({ match }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { user, drawingComment, drawingCommentError } = useSelector(
    ({ user, hadnleDrawingCommentInsertActions }) => ({
      user: user.user,
      drawingComment: hadnleDrawingCommentInsertActions.drawingComment,
      drawingCommentError:
        hadnleDrawingCommentInsertActions.drawingCommentError,
    }),
  );
  let canvas;
  let canvasRef = useRef();
  let pos = {
    drawble: false,
    X: -1,
    Y: -1,
  };

  let ctx;

  const initDraw = (event) => {
    ctx.beginPath();
    pos = { drawble: true, ...getPositon(event) };
    ctx.moveTo(pos.X, pos.Y);
  };
  const getPositon = (event) => {
    return { X: event.offsetX, Y: event.offsetY };
  };
  const draw = (event) => {
    if (pos.drawble) {
      pos = { ...pos, ...getPositon(event) };
      var circle = new Path2D();
      circle.moveTo(pos.X, pos.Y);
      circle.arc(pos.X, pos.Y, 7, 0, 2 * Math.PI);
      ctx.fill(circle);
    }
  };
  const finishDraw = (event) => {
    pos = { drawble: false, X: -1, Y: -1 };
  };
  const onSubmit = () => {
    let canvas = canvasRef.current;
    let image = canvas.toDataURL('image/png');
    let blobBin = atob(image.split(',')[1]); // base64 데이터 디코딩
    let array = [];
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    let imageFile = new Blob([new Uint8Array(array)], { type: 'image/png' }); // Blob 생성
    let formdata = new FormData(); // formData 생성
    formdata.append('file', imageFile); // file data 추가
    formdata.append('postId', postId);
    dispatch(insert(formdata));
    //댓글등록후 캔버스 내용을 삭제함.
    //コメント登録後、canvasの内容を消す。
  };
  useEffect(() => {
    canvas = canvasRef.current;
    if (canvas) {
      ctx = canvas.getContext('2d');
      canvas.addEventListener('mousedown', initDraw);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', finishDraw);
      canvas.addEventListener('mouseout', finishDraw);
    }
    if (drawingComment) {
      dispatch(listDrawingComment({ postId }));
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
    if (drawingCommentError) {
      console.log('댓글 등록 에러 발생');
      console.log(drawingCommentError);
    }
    setCanvasSize();
  }, [
    canvasRef.current,
    dispatch,
    postId,
    drawingComment,
    drawingCommentError,
  ]);

  window.onresize = function (e) {
    setCanvasSize();
  };

  function setCanvasSize() {
    canvas = canvasRef.current;
    let width = document.getElementById('commentWriteBlock');

    if (!!width) {
      canvas.width = width.offsetWidth * 0.95;
    }
  }
  if (!user) {
    return null;
  }
  return (
    <CommentWriteBlock id="commentWriteBlock">
      <Button
        style={{
          borderRadius: '5px 5px 0 0',
        }}
        id="cavansButton"
        onClick={onSubmit}
      >
        댓글등록
      </Button>
      <Button
        style={{
          borderRadius: '5px 5px 0 0',
        }}
        id="cavansButton"
      >
        지우기
      </Button>
      <Button
        style={{
          borderRadius: '5px 5px 0 0',
        }}
        id="cavansButton"
      >
        색상변경
      </Button>

      <Button
        style={{
          borderRadius: '5px 5px 0 0',
        }}
        id="cavansButton"
      >
        선굵기
      </Button>
      <Button
        style={{
          borderRadius: '5px 5px 0 0',
        }}
        id="cavansButton"
      >
        배경넣기
      </Button>
      <canvas
        ref={canvasRef}
        id="stockGraph"
        height="480px"
        style={{
          border: 'solid 1px',
          borderRadius: '4px',
        }}
      ></canvas>
    </CommentWriteBlock>
  );
};

export default withRouter(CommentContainer);
