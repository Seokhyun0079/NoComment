import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import hadnleDrawingCommentInsertActions, {
  drawingCommentSaga,
} from './drawingComment';
import loading from './loading';
import { all } from 'redux-saga/effects';
import drawingCommentsHandleActions, {
  drawingCommentsSaga,
} from './drawingComments';
import handleNocommneterActions, { nocommneterSaga } from './nocommneter';
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  drawingCommentsHandleActions,
  hadnleDrawingCommentInsertActions,
  handleNocommneterActions,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    drawingCommentSaga(),
    drawingCommentsSaga(),
    nocommneterSaga(),
  ]);
}

export default rootReducer;
