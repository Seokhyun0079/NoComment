import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
const CHANGE_FILED = 'noCommenters/CHANGE_FIELD';
const INITIALIZE_FORM = 'noCommenters/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'noCommenters/REGISTER',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'noCommenters/LOGIN',
);

export const changeField = createAction(
  CHANGE_FILED,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const register = createAction(
  REGISTER,
  ({ stringId, name, email, password }) => ({
    stringId,
    name,
    email,
    password,
  }),
);

export const login = createAction(LOGIN, ({ stringId, password }) => ({
  stringId,
  password,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    stringId: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    stringId: '',
    name: '',
    email: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FILED]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),

    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
