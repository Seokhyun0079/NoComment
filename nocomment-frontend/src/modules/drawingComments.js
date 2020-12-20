import { createAction } from "redux-actions";
import { createRequestActionTypes } from "../lib/createRequestSaga";
import * as drawingCommentAPI from '../lib/api/draiwngComment';

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
    yield takeLatest(LIST_DRAWING_COMMENTS,
        listDrawingCommentSaga
    );
}

const listDrawingComment