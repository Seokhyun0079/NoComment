import { createAction, handleActions } from 'redux-actions';
import * as drawingCommentApi from '../lib/api/draiwngComment';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
const INITIALIZE = 'drawingComment/INITIALIZE';
const [INSERT, INSERT_SUCCESS, INSERT_FAILURE] = createRequestActionTypes(
  'drawingComment/INSERT',
);

export const initialize = createAction(INITIALIZE);
export const insert = createAction(INSERT, (formData) => formData);

const drawingCommentInsertSaga = createRequestSaga(
  INSERT,
  drawingCommentApi.insertDrawingComment,
);
export function* drawingCommentSaga() {
  yield takeLatest(INSERT, drawingCommentInsertSaga);
}

const initialState = {
  drawingComment: null,
};

const hadnleDrawingCommentInsertActions = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [INSERT]: (state) => ({
      ...state,
      drawingComment: null,
    }),
    [INSERT_SUCCESS]: (state, { payload: drawingComment }) => ({
      ...state,
      drawingComment,
    }),
    [INSERT_FAILURE]: (state, { payload: drawingCommentError }) => ({
      ...state,
      drawingCommentError,
    }),
  },
  initialState,
);

export default hadnleDrawingCommentInsertActions;
