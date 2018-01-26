import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts : []
  }


  /*BELOW: After the component is rendered to the screen, it will make an API call
  to the ContactsAPI file. Once it has been resolved (finished completing), then
  it will set the state of the contacts array to be updated contacts that it fetched
  from the API.*/
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
    }


  /*BELOW: removeContact takes in the current contact and then calls the setState
  function. This will then change the old state into the new state by rendering a
  filtered array of contacts based on the criteria of the filter function.*/
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    ContactsAPI.remove(contact)
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state =>({
        contacts: state.contacts.concat([contact])
      }))
    })
  }


  render() {
    return (
      <div>
        <Route exact path="/" render={()=> (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts = {this.state.contacts} />
          )}
          />

        <Route path="/create" render={({ history })=> (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact)
                history.push('/')
              }}
              />
          )}
        />

      </div>
    );
  }
}


export default App;
