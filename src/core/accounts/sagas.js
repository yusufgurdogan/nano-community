import { takeEvery, fork, call, takeLatest } from 'redux-saga/effects'

import {
  getRepresentatives,
  getAccount,
  getAccountOpen,
  getAccountBlocksSummary
} from '@core/api'
import { accountsActions } from './actions'

export function* loadReps() {
  yield call(getRepresentatives)
}

export function* loadAccount({ payload }) {
  const { account } = payload
  yield call(getAccount, account)
  yield call(getAccountOpen, account)
  yield fork(getAccountBlocksSummary, { account, type: 'send' })
  yield fork(getAccountBlocksSummary, { account, type: 'receive' })
  yield fork(getAccountBlocksSummary, { account, type: 'change' })
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watchGetRepresentatives() {
  yield takeEvery(accountsActions.GET_REPRESENTATIVES, loadReps)
}

export function* watchGetAccount() {
  yield takeLatest(accountsActions.GET_ACCOUNT, loadAccount)
}

//= ====================================
//  ROOT
// -------------------------------------

export const accountSagas = [
  fork(watchGetRepresentatives),
  fork(watchGetAccount)
]
