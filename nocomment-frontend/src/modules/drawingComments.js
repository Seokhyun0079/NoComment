import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as drawingCommentAPI from '../lib/api/draiwngComment';
import { takeLatest } from 'redux-saga/effects';

const [
    LIST_DRAWING_COMMENT,
    LIST_DRAWING_COMMENT_SUCCESS,
    LIST_DRAWING_COMMENT_FAILURE
] = createRequestActionTypes('drawingComment/LIST_DRAWING_COMMENT');

export const listDrawingComment = createAction(
    LIST_DRAWING_COMMENT,
    ({ postId }) => ({ postId })
);

const listDrawingCommentSaga = createRequestSaga(LIST_DRAWING_COMMENT, drawingCommentAPI.listComment);
export function* listCommentsSaga() {
    yield takeLatest(LIST_DRAWING_COMMENT,
        listDrawingCommentSaga
    );
}

const initialState = {
    drawingComments : null,
    error : null,
    liaistPage : 1,
}

const listComment = handleActions(
    {
        [LIST_DRAWING_COMMENT_SUCCESS] : (state, {payload : drawingComments, meta : response}) =>({
            ...state,
            drawingComments,
            lastPage : parseInt(response.headers['last-page'], 10),
        }),
        [LIST_DRAWING_COMMENT_FAILURE] : (state, {payload: error})=>({
            ...state,
            error
        }),
    },
    initialState
);

export default listComment;