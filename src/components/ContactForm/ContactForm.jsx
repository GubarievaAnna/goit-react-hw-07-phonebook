import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addContact } from '../../redux/contacts/contactsActions';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const items = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const onInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const repeatOfNames = items.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    if (repeatOfNames) {
      toast.error(`${name} is already in contacts.`, {
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }
    const newContact = { id: nanoid(), name, number };
    dispatch(addContact(newContact));
    reset();
  };

  return (
    <form className={s.form} onSubmit={onFormSubmit}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          className={s.input}
          value={name}
          onChange={onInputChange}
          required
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          className={s.input}
          value={number}
          onChange={onInputChange}
          required
        />
      </label>
      <button type="submit" className={s.button}>
        Add a contact
      </button>
    </form>
  );
};

export default ContactForm;
