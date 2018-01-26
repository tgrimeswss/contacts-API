import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {


  /*Below: Using PropTypes is a good way to test your code. Therefore, for the ListContacts
  array, we are telling it that the array literally must be an array and it has to be
  required. onDeleteContact must be a function and must be required.*/
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }



  /*state is merely an object*/
  state = {
    query: ''
  }


  clearQuery = () => {
    this.setState({
      query: ''
    })
  }



  /*BELOW: updateQuery is a function that sets the state of the query property (located
  above in the state object). The trim function just ensures there are no spaces
  made from the user input of where this function is called on.*/
  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }




  render() {
    /*This is storing this.props to the contacts and onDeleteContact. It is Also
    storing this.state to the query. It reads the same as this.props.contacts,
    this.props.onDeleteContact, and this.state.query*/
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state


    /*BELOW: showingContacts is an array that stores the newly filtered Contacts
    from the contacts array.*/
    let showingContacts

    /*BELOW: IF someone types something in the query input field...(Also known as truthy)
    In english... if someone types something in, then perform something.'If there is a query..'*/
    if(query) {

      /*IF there are any special characters &^#@$, escape the character and ignore
      case sensitiviy. This is what the 'i' stands for (ignore)*/
      const match = new RegExp(escapeRegExp(query),'i')
      /*match.test is the checker to see what is actually searched for. It can
      be a string as just a static name but in this case, it is pointing to the
      contacts array.*/
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      /*Setting showingContacts to the current contacts. Meaning there was no input
      to filter*/
      showingContacts = contacts
    }
    showingContacts.sort(sortBy('name'))

    return (
      <div className="list-contacts">
        <div className = "list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            /* BELOW: onChange calls the updateQuery function. This calls then
            setState function on the query property within the the state object.
            */
            onChange={(event)=> this.updateQuery(event.target.value)}
            />
          <Link to="/create" className="add-contact">Add Contact</Link>
        </div>

        {/*BELOW: If the size of the original contacts array has been changed (filtered),
        then render the JSX below. This is the box right below the search input box.*/}
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
          <span>Now showing {showingContacts.length} of {contacts.length} total</span>
          <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}




        <ol className="contact-list">


        {/*Below: Since the argument is 'props' in ListContacts, this.props does
        not need to be passed in. The map function is called to map over all of the
        contacts in the contacts array. The contacts array has been placed on the App.js
        file.*/}
          {showingContacts.map((contact) => (
            <li key={contact.name} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>

              {/*When the user clicks the button assigned to each contact, the
                onDeleteContact function is fired, passing in a current contact.
                onDeleteContact is located on the App.js file.*/}
              <button onClick={() => onDeleteContact(contact)} className="contact-remove">
                Remove
              </button>
            </li>
          ))}

        </ol>
      </div>
    )


  }

}

export default ListContacts;
