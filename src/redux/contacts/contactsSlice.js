import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
  },
  reducers: {
    addContact(state, { payload }) {
      return { ...state, items: [...state.items, payload] };
    },
    deleteContact(state, { payload }) {
      return { ...state, items: state.items.filter(el => el.id !== payload) };
    },
    filterContacts(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { addContact, deleteContact, filterContacts } =
  contactsSlice.actions;
export default contactsSlice.reducer;
