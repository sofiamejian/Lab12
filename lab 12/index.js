document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const contactsList = document.getElementById('contacts-list');
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  
    const renderContacts = () => {
      contactsList.innerHTML = '';
      
      if (contacts.length === 0) {
        contactsList.innerHTML = '<p class="no-contacts">No contacts available. Add one above!</p>';
        return;
      }
  
      contacts.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');
  
        const contactDetails = document.createElement('div');
        contactDetails.classList.add('contact-details');
        contactDetails.innerHTML = `
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Phone:</strong> ${contact.phone}</p>
          <p><strong>Email:</strong> ${contact.email || 'N/A'}</p>
          <p><strong>Address:</strong> ${contact.address || 'N/A'}</p>
        `;
  
        const contactActions = document.createElement('div');
        contactActions.classList.add('contact-actions');
        contactActions.innerHTML = `
          <button class="edit" onclick="editContact(${index})">Edit</button>
          <button onclick="deleteContact(${index})">Delete</button>
        `;
  
        contactCard.appendChild(contactDetails);
        contactCard.appendChild(contactActions);
        contactsList.appendChild(contactCard);
      });
    };
  
    window.editContact = (index) => {
      const contact = contacts[index];
      document.getElementById('contact-id').value = index;
      document.getElementById('name').value = contact.name;
      document.getElementById('phone').value = contact.phone;
      document.getElementById('email').value = contact.email;
      document.getElementById('address').value = contact.address;
    };
  
    window.deleteContact = (index) => {
      if (confirm('Are you sure you want to delete this contact?')) {
        contacts.splice(index, 1);
        saveContacts();
        renderContacts();
        alert('Contact deleted successfully!');
      }
    };
  
    const saveContacts = () => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    };
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const id = document.getElementById('contact-id').value;
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const address = document.getElementById('address').value.trim();
  
      if (!name || !phone) {
        alert('Name and phone are required!');
        return;
      }
  
      const newContact = { name, phone, email, address };
  
      if (id) {
        contacts[id] = newContact;
        alert('Contact updated successfully!');
      } else {
        contacts.push(newContact);
        alert('Contact added successfully!');
      }
  
      form.reset();
      saveContacts();
      renderContacts();
    });
  
    renderContacts();
  });