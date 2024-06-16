import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);

    if (!contacts) {
        throw new Error('\nThere are no contacts')
    }
    return JSON.parse(contacts)
};

async function getContactById(contactId) {
    const contacts = await listContacts()
    const contact = contacts.find((contact) => contact.id === contactId)

    if (!contact) {
        throw new Error(`\nThere is no contact with id ${contactId}`)
    }
    return contact
}

async function addContact(name, email, phone) {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    const contactWithSameName = contacts.find(
        (contact) => contact.name === name
    )

    if (contactWithSameName) {
        throw new Error(
            `Contact with name ${name} already exists in contacts.`
        )
    }

    contacts.push(newContact)
    fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact
}

async function removeContact(contactId) {
    const contacts = await listContacts()
    const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
    )

    if (filteredContacts.length === contacts.length) {
        throw new Error(`Contact with ID ${contactId} not found.`)
    }
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts))
}

export { listContacts, getContactById, addContact, removeContact };