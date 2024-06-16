import { Command } from 'commander';

import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} from './contacts.js'

const program = new Command()
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone')

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            try {
                const contacts = await listContacts()
                console.log('\nContact list')
                console.table(contacts)
            } catch (error) {
                console.error(error)
            }
            break

        case 'get':
            try {
                const contact = await getContactById(id)
                console.log(`\nContact with ID: ${id}`)
                console.table(contact)
            } catch (error) {
                console.error(error)
            }
            break

        case 'add':
            try {
                const newContact = await addContact(name, email, phone)
                console.log('\nContact added!')
                console.table(newContact)
            } catch (error) {
                console.error(error)
            }

            break

        case 'remove':
            try {
                await removeContact(id)
                console.log('\nContact deleted!')
            } catch (error) {
                console.error(error)
            }
            break

        default:
            console.warn('Unknown action type!')
    }
}

invokeAction(argv);