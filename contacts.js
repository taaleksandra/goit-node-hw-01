const fs = require("fs").promises;
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const contactsPathTest = path.join(__dirname, "db", "test.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((err) => console.error(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contactById = contacts.find((contact) => contact.id === contactId);
      console.log(`For id: '${contactId}' found contact: `, contactById);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

function removeContact(contactId) {
  // ...twój kod
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = {
        id: `${uniqid()}`,
        name,
        email,
        phone,
      };

      const checkContact = contacts.find((contact) => contact.phone === phone);

      if (!checkContact) {
        contacts.push(newContact);
        fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log(
          `New contact '${newContact.name}: ${newContact.phone}' - added to contact list.`
        );
      } else {
        console.log(
          `Contact '${newContact.name}: ${newContact.phone}' - is on your contact list already.`
        );
        return;
      }
    })
    .catch((err) => {
      console.error(err.message);
    });
}

module.export = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

listContacts();
getContactById("AeHIrLTr6JkxGE6SN-0Rw");
// removeContact("")
addContact("Aleksandra", "email@email.com", "987654321");
