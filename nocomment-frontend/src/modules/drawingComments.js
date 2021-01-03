import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as drawingCommentAPI from '../lib/api/draiwngComment';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_DRAWING_COMMENT,
  LIST_DRAWING_COMMENT_SUCCESS,
  LIST_DRAWING_COMMENT_FAILURE,
] = createRequestActionTypes('drawingComment/LIST_DRAWING_COMMENT');

const UNLOAD_LIST_DRAWING_COMMENT = 'drawingComment/UNLOAD_COMMENT_LIST';

export const listDrawingComment = createAction(
  LIST_DRAWING_COMMENT,
  ({ postId }) => ({ postId }),
);

const listDrawingCommentSaga = createRequestSaga(
  LIST_DRAWING_COMMENT,
  drawingCommentAPI.listComment,
);
export function* drawingCommentsSaga() {
  yield takeLatest(LIST_DRAWING_COMMENT, listDrawingCommentSaga);
}

const initialState = {
  drawingComments: null,
  error: null,
  lastPage: 1,
};

const drawingCommentsHandleActions = handleActions(
  {
    [LIST_DRAWING_COMMENT_SUCCESS]: (
      state,
      { payload: drawingComments, meta: response },
    ) => ({
      ...state,
      drawingComments,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [LIST_DRAWING_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_LIST_DRAWING_COMMENT]: (state, { payload: error }) => initialState,
  },
  initialState,
);

export default drawingCommentsHandleActions;
