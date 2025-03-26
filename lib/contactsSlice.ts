import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Contact } from "./types"

interface ContactsState {
  contacts: Contact[]
}

const initialState: ContactsState = {
  contacts: [],
}

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload)
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload)
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload.id)
      if (index !== -1) {
        state.contacts[index] = action.payload
      }
    },
  },
})

export const { addContact, deleteContact, updateContact } = contactsSlice.actions

export default contactsSlice.reducer

