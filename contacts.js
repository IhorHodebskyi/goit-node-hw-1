const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  // for yargs
  //   const id = String(contactId);
  const list = await listContacts();
  const result = list.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  // for yargs
  //   const id = String(contactId);
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const list = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  // for yargs
  //   const id = String(contactId);
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  list[index] = { contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return list[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
