import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Responsive from '../../components/common/Responsive';
import { insert } from '../../modules/drawingComment';
import { withRouter } from 'react-router-dom';
import { listDrawingComment } from '../../modules/drawingComments';
import { Motion, spring } from 'react-motion';
import { useTranslation } from 'react-i18next';
const CommentWriteBlock = styled(Responsive)`
  padding: 0 0 0 0;
  padding-top: 3rem;
  padding-bottom: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
  background: white;
  @media only screen and (max-width: 1024px) {
    width: 85%;
    position: fixed;
    padding-top: 0px;
    margin-left: 10px;
    bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const CommentOpenButton = styled(Button)`
  visibility: hidden;
  @media only screen and (max-width: 1024px) {
    visibility: visible;
    width: 100%;
    height: 50px;
    background: red;
    margin-bottom: 15px;
    &:hover {
      background: red;
    }
  }
`;
const DEFAULT_BOTTOM = -540;
export const CommentContainer = ({ match }) => {
  const { t } = useTranslation();
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
  const [state, setState] = useState({
    bottom: DEFAULT_BOTTOM,
  });
  const animate = ({ bottom }) => {
    bottom = bottom === DEFAULT_BOTTOM ? 0 : DEFAULT_BOTTOM;
    setState(() => ({
      bottom: bottom,
    }));
  };

  let canvas;
  let canvasRef = useRef();
  let colorRef = useRef();
  let pos = {
    drawble: false,
    X: -1,
    Y: -1,
  };

  let ctx;

  const initDraw = (event) => {
    console.log('init Draw');
    event.preventDefault();
    ctx.beginPath();
    pos = { drawble: true, ...getPositon(event) };
    ctx.moveTo(pos.X, pos.Y);
  };
  const getPositon = (event) => {
    return {
      X: event.offsetX ? event.offsetX : event.changedTouches[0].clientX - 45,
      Y: event.offsetY
        ? event.offsetY
        : event.changedTouches[0].clientY - window.innerHeight + 480,
    };
  };
  const draw = (event) => {
    event.preventDefault();
    if (pos.drawble) {
      pos = { ...pos, ...getPositon(event) };
      var circle = new Path2D();
      circle.moveTo(pos.X, pos.Y);
      circle.arc(pos.X, pos.Y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = colorRef.current.value;
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
      canvas.addEventListener('touchstart', initDraw, false);
      canvas.addEventListener('touchmove', draw, false);
    }
    if (drawingComment) {
      dispatch(listDrawingComment({ postId }));
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
    if (drawingCommentError) {
      console.log(t('commentSaveError'));
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

  const clearCanvas = () => {
    let canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };
  function setCanvasSize() {
    canvas = canvasRef.current;
    let width = document.getElementById('commentWriteBlock');

    if (!!width) {
      canvas.width = width.offsetWidth * 0.9;
    }
  }
  if (!user) {
    return null;
  }

  const changeColor = () => {
    colorRef.current.click();
  };

  return (
    <Motion
      style={{
        bottom: spring(state.bottom),
      }}
    >
      {({ bottom }) => (
        <CommentWriteBlock id="commentWriteBlock" style={{ bottom: bottom }}>
          <CommentOpenButton
            onClick={() => {
              animate({
                bottom: bottom,
              });
            }}
          >
            댓글!
          </CommentOpenButton>
          <input
            type="color"
            style={{
              visibility: 'hidden',
            }}
            ref={colorRef}
          ></input>

          <br />
          <Button
            style={{
              marginLeft: '5px',
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
            onClick={clearCanvas}
            id="claerButton"
          >
            백지
          </Button>
          <Button onClick={changeColor}>색</Button>
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
      )}
    </Motion>
  );
};

export default withRouter(CommentContainer);
