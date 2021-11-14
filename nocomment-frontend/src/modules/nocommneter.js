import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as nocommneterApi from '../lib/api/nocommneter';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [NOCOMMNETER_LIST, NOCOMMNETER_LIST_SUCCESS, NOCOMMNETER_LIST_FAILURE] =
  createRequestActionTypes('nocoomnter/list');
const [
  NOCOMMNETER_UPDATE,
  NOCOMMNETER_UPDATE_SUCCESS,
  NOCOMMNETER_UPDATE_FAILURE,
] = createRequestActionTypes('nocommneter/update');

export const getNocommneterListAction = createAction(NOCOMMNETER_LIST);
export const updateNocommneterAction = createAction(NOCOMMNETER_UPDATE);

export const getNocommneterListReqSaga = createRequestSaga(
  NOCOMMNETER_LIST,
  nocommneterApi.list,
);
export const updateNocommneterSaga = createRequestSaga(
  NOCOMMNETER_UPDATE,
  nocommneterApi.update,
);

export function* nocommneterSaga() {
  yield takeLatest(NOCOMMNETER_LIST, getNocommneterListReqSaga);
  yield takeLatest(NOCOMMNETER_UPDATE, updateNocommneterSaga);
}

const INITIALIZE = 'nocoomnter/INITIALIZE';
export const initialize = createAction(INITIALIZE);
const initialState = {
  ncList: null,
  nocommneterListError: null,
};

const handleNocommneterActions = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [NOCOMMNETER_LIST]: (state) => ({
      ...state,
      nocommneterList: null,
    }),
    [NOCOMMNETER_LIST_SUCCESS]: (
      state,
      { payload: ncList, meta: response },
    ) => ({
      ...state,
      ncList,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [NOCOMMNETER_LIST_FAILURE]: (state, { payload: nocommneterListError }) => ({
      ...state,
      nocommneterListError,
    }),
    [NOCOMMNETER_UPDATE]: (state) => ({
      ...state,
    }),
  },
  initialState,
);

export default handleNocommneterActions;
