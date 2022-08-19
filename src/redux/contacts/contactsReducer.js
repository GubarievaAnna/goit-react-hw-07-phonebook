import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  getContactsRequest,
  getContactsSuccess,
  getContactsError,
  addContactsRequest,
  addContactsSuccess,
  addContactsError,
  removeContactsRequest,
  removeContactsSuccess,
  removeContactsError,
  filterContacts,
} from './contactsActions';

const itemsReducer = createReducer([], {
  [getContactsSuccess]: (_, { payload }) => payload,
  [addContactsSuccess]: (state, { payload }) => [...state, payload],
  [removeContactsSuccess]: (state, { payload }) =>
    state.filter(el => el.id !== payload),
});

const filterReducer = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});

const loadingReducer = createReducer(false, {
  [getContactsRequest]: () => true,
  [getContactsSuccess]: () => false,
  [getContactsError]: () => false,
  [addContactsRequest]: () => true,
  [addContactsSuccess]: () => false,
  [addContactsError]: () => false,
  [removeContactsRequest]: () => true,
  [removeContactsSuccess]: () => false,
  [removeContactsError]: () => false,
});

const errorReducer = createReducer('', {
  [getContactsRequest]: () => null,
  [getContactsError]: (_, { payload }) => payload,
  [addContactsRequest]: () => null,
  [addContactsError]: (_, { payload }) => payload,
  [removeContactsRequest]: () => null,
  [removeContactsError]: (_, { payload }) => payload,
});

export const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  isLoading: loadingReducer,
  error: errorReducer,
});
