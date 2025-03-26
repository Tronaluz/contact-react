"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addContact, updateContact } from "@/lib/contactsSlice"
import type { Contact } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import styled from "styled-components"

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

interface ContactFormProps {
  editingContact: Contact | null
  onCancelEdit: () => void
}

export default function ContactForm({ editingContact, onCancelEdit }: ContactFormProps) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    if (editingContact) {
      setFormData({
        fullName: editingContact.fullName,
        email: editingContact.email,
        phone: editingContact.phone,
      })
    } else {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
      })
    }
  }, [editingContact])

  const validate = () => {
    let isValid = true
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    if (editingContact) {
      dispatch(
        updateContact({
          id: editingContact.id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        }),
      )
      onCancelEdit()
    } else {
      dispatch(
        addContact({
          id: Date.now().toString(),
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        }),
      )
      setFormData({
        fullName: "",
        email: "",
        phone: "",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingContact ? "Editar Contato" : "Adicionar Contato"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Digite o nome completo"
            />
            {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite o e-mail"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Digite o telefone"
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          {editingContact && (
            <Button type="button" variant="outline" onClick={onCancelEdit}>
              Cancelar
            </Button>
          )}
          <Button type="submit" className={editingContact ? "" : "ml-auto"}>
            {editingContact ? "Atualizar" : "Adicionar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

