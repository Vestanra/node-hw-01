import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve('db', 'contacts.json');

export async function listContacts()  {
    const result = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(result)
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(el => el.id === contactId);
    return result || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(el => el.id === contactId);
    if (index === -1) {
        return null
    };
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

export async function addContact(name, email, phone) {
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact
}