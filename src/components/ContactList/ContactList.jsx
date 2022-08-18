import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contactsActions';
import s from './ContactList.module.css';

const ContactList = () => {
  const items = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const filteredContacts = items.filter(el =>
    el.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={s.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <p className={s.paragraph}>
            <span className={s.name}>{name}</span>: {number}
          </p>
          <button
            className={s.button}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
