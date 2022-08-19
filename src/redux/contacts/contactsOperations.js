import {
  getContactsApi,
  addContactsApi,
  removeContactsApi,
} from '../../utils/mockapiApi';
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
} from './contactsActions';

export const getContacts = () => dispatch => {
  dispatch(getContactsRequest());

  getContactsApi()
    .then(items => dispatch(getContactsSuccess(items)))
    .catch(err => dispatch(getContactsError(err.message)));
};

export const addContacts = item => dispatch => {
  dispatch(addContactsRequest());

  addContactsApi(item)
    .then(addedItem => dispatch(addContactsSuccess(addedItem)))
    .catch(err => dispatch(addContactsError(err.message)));
};

export const removeContacts = id => dispatch => {
  dispatch(removeContactsRequest());

  removeContactsApi(id)
    .then(id => dispatch(removeContactsSuccess(id)))
    .catch(err => dispatch(removeContactsError(err.message)));
};
