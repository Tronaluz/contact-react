"use client"

import { useDispatch } from "react-redux"
import { deleteContact } from "@/lib/contactsSlice"
import type { Contact } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2, User, Mail, Phone } from "lucide-react"
import styled from "styled-components"

const ContactCard = styled(Card)`
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
  }
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

interface ContactItemProps {
  contact: Contact
  onEdit: (contact: Contact) => void
}

export default function ContactItem({ contact, onEdit }: ContactItemProps) {
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este contato?")) {
      dispatch(deleteContact(contact.id))
    }
  }

  return (
    <ContactCard>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{contact.fullName}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => onEdit(contact)} className="h-8 w-8">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Editar</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Excluir</span>
            </Button>
          </div>
        </div>

        <ContactInfo>
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{contact.fullName}</span>
        </ContactInfo>

        <ContactInfo>
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{contact.email}</span>
        </ContactInfo>

        <ContactInfo>
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{contact.phone}</span>
        </ContactInfo>
      </CardContent>
    </ContactCard>
  )
}

