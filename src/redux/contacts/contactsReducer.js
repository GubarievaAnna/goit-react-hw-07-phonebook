import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { getContacts, addContacts, removeContacts } from './contactsOperations';
import { filterContacts } from './contactsActions';

const itemsReducer = createReducer([], {
  [getContacts.fulfilled]: (_, { payload }) => payload,
  [addContacts.fulfilled]: (state, { payload }) => [...state, payload],
  [removeContacts.fulfilled]: (state, { payload }) =>
    state.filter(el => el.id !== payload),
});

const filterReducer = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});

const loadingReducer = createReducer(false, {
  [getContacts.pending]: () => true,
  [getContacts.fulfilled]: () => false,
  [getContacts.rejected]: () => false,
  [addContacts.pending]: () => true,
  [addContacts.fulfilled]: () => false,
  [addContacts.rejected]: () => false,
  [removeContacts.pending]: () => true,
  [removeContacts.fulfilled]: () => false,
  [removeContacts.rejected]: () => false,
});

const errorReducer = createReducer('', {
  [getContacts.pending]: () => null,
  [getContacts.rejected]: (_, { payload }) => payload,
  [addContacts.pending]: () => null,
  [addContacts.rejected]: (_, { payload }) => payload,
  [removeContacts.pending]: () => null,
  [removeContacts.rejected]: (_, { payload }) => payload,
});

export const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  isLoading: loadingReducer,
  error: errorReducer,
});
