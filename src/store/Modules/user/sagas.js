import { call, put, all, takeLatest } from 'redux-saga/effects';

import { getError } from '~/util/errorHandler';
import AlertHelper from '~/components/AlertHelper';

import { updateProfileSuccess, updateProfileFailure } from './actions';
import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, `/users/`, profile);
    AlertHelper.show('success', 'Sucesso!', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    AlertHelper.show('error', 'Erro', getError(err));

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
