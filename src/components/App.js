import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Notification } from './Notification/Notification';
import { setLocalData, setNotify } from '../redux/actions';

import { CSSTransition } from 'react-transition-group';
import { getDataFromDB } from '../redux/operations';
import './app.css';

export function App({
  value,
  setLocalData,
  notify,
  setNotify,
  isLoading,
  getDataFromDB,
}) {
  // useEffect(() => {
  //   const items = localStorage.getItem('items');
  //   const itemsParsed = JSON.parse(items);
  //   if (itemsParsed) {
  //     setLocalData(itemsParsed);
  //   }
  // }, [setLocalData]);

  useEffect(() => {
    getDataFromDB();
  }, [getDataFromDB]);

  // useEffect(() => {
  //   getDataFromDB()
  // }, []);

  return (
    <>
      <CSSTransition
        in={notify}
        timeout={2000}
        classNames="notify"
        unmountOnExit
        onEntered={() => setNotify(false)}
      >
        <Notification />
      </CSSTransition>
      <CSSTransition
        in={true}
        appear={true}
        timeout={2000}
        classNames="op"
        unmountOnExit
      >
        <h2 className="title">Phonebook</h2>
      </CSSTransition>
      <Form />
      <CSSTransition
        in={value.length >= 1}
        timeout={300}
        unmountOnExit
        classNames="title-contacts"
      >
        <h2 className="title-contacts">Contacts</h2>
      </CSSTransition>

      {isLoading && <h2> ..... loading</h2>}

      <CSSTransition
        in={value.length >= 2}
        timeout={300}
        unmountOnExit
        classNames="filter"
      >
        <Filter />
      </CSSTransition>
      <ContactList />
    </>
  );
}

const mapStateToProps = state => ({
  value: state.contacts.items,
  filter: state.contacts.filter,
  notify: state.contacts.setNotify,
  isLoading: state.isLoading,
});

const mapDispatchToProps = { setLocalData, setNotify, getDataFromDB };

export default connect(mapStateToProps, mapDispatchToProps)(App);

//
//
//
//
//
//
//
//
//
//
//
//? На классах
// export default class App extends Component {
//   state = {
//     contacts: [],
//     name: '',
//     notify: false,
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const contactsParsed = JSON.parse(contacts);
//     if (contactsParsed) {
//       this.setState({ contacts: contactsParsed });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   getName = data => {
//     this.setState({ name: data });
//   };

//   getContact = contact => {
//     let flag = true;

//     this.state.contacts.map(el =>
//       el.name === contact.name ? (flag = false) : '',
//     );

//     flag
//       ? this.setState(prev => {
//           return { ...prev, contacts: [...prev.contacts, contact] };
//         })
//       : this.notifyTrue();
//   };

//   notifyTrue() {
//     this.setState({ notify: true });
//   }

//   getFilterName = event => {
//     this.setState({ filter: event.target.value });
//   };

//   filteredItems = () => {
//     return this.state.filter
//       ? this.state.contacts.filter(el =>
//           el.name.toLowerCase().includes(this.state.filter.toLowerCase()),
//         )
//       : this.state.contacts;
//   };

//   deleteContact = contactId => {
//     this.setState(prev => ({
//       contacts: prev.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     return (
//       <>
//         <CSSTransition
//           in={this.state.notify}
//           timeout={2000}
//           classNames="notify"
//           unmountOnExit
//           onEntered={() => this.setState({ notify: false })}
//         >
//           <Notification />
//         </CSSTransition>
//         <CSSTransition
//           in={true}
//           appear={true}
//           timeout={2000}
//           classNames="op"
//           unmountOnExit
//         >
//           <h2 className="title">Phonebook</h2>
//         </CSSTransition>
//         <Form getContact={this.getContact} getName={this.getName} />
//         <CSSTransition
//           in={this.state.contacts.length >= 1}
//           timeout={300}
//           unmountOnExit
//           classNames="title-contacts"
//         >
//           <h2 className="title-contacts">Contacts</h2>
//         </CSSTransition>
//         <CSSTransition
//           in={this.state.contacts.length >= 2}
//           timeout={300}
//           unmountOnExit
//           classNames="filter"
//         >
//           <Filter
//             filter={this.state.filter}
//             getFilterName={this.getFilterName}
//           />
//         </CSSTransition>
//         <ContactList
//           contactList={this.filteredItems()}
//           deleteContact={this.deleteContact}
//         />
//       </>
//     );
//   }
// }
