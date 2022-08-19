import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeContacts,
  getContacts,
} from '../../redux/contacts/contactsOperations';
import s from './ContactList.module.css';

const ContactList = () => {
  const items = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const filteredContacts = items.filter(el =>
    el.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={s.list}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li key={id} className={s.item}>
          <p className={s.paragraph}>
            <span className={s.name}>{name}</span>: {phone}
          </p>
          <button
            className={s.button}
            onClick={() => dispatch(removeContacts(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
