"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import ContactItem from "./contact-item"
import type { Contact } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import styled from "styled-components"

const EmptyMessage = styled.p`
  text-align: center;
  color: #6b7280;
  padding: 2rem 0;
`

interface ContactListProps {
  onEditContact: (contact: Contact) => void
}

export default function ContactList({ onEditContact }: ContactListProps) {
  const contacts = useSelector((state: RootState) => state.contacts.contacts)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contatos</CardTitle>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <EmptyMessage>Nenhum contato adicionado ainda.</EmptyMessage>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} onEdit={onEditContact} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

