"use client"

import { useState } from "react"
import ContactForm from "./contact-form"
import ContactList from "./contact-list"
import type { Contact } from "@/lib/types"

export default function ContactApp() {
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
  }

  const handleCancelEdit = () => {
    setEditingContact(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <ContactForm editingContact={editingContact} onCancelEdit={handleCancelEdit} />
      </div>
      <div>
        <ContactList onEditContact={handleEditContact} />
      </div>
    </div>
  )
}

