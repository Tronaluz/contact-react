"use client"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import ContactApp from "@/components/contact-app"

export default function Home() {
  return (
    <Provider store={store}>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Lista de Contatos</h1>
        <ContactApp />
      </main>
    </Provider>
  )
}

