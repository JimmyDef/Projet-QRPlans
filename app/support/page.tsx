'use client'
import { useState } from 'react'
import './support.scss'

const SupportPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Logique pour envoyer le message de support, par exemple via une API
    console.log('Nom:', name)
    console.log('Email:', email)
    console.log('Message:', message)
    // Réinitialiser le formulaire après l'envoi
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="support-page__container">
      <h1 className="support-page__title">Support</h1>
      <p className="support-page__description">
        Si vous avez des questions ou des problèmes, veuillez remplir le
        formulaire ci-dessous et nous vous répondrons dès que possible.
      </p>
      <form className="support-page__form" onSubmit={handleSubmit}>
        <div className="support-page__form-group">
          <label className="support-page__label" htmlFor="name">
            Nom:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="support-page__input"
          />
        </div>
        <div className="support-page__form-group">
          <label className="support-page__label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="support-page__input"
          />
        </div>
        <div className="support-page__form-group">
          <label className="support-page__label" htmlFor="message">
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="support-page__textarea"
          />
        </div>
        <button type="submit" className="support-page__button">
          Envoyer
        </button>
      </form>
    </div>
  )
}

export default SupportPage
