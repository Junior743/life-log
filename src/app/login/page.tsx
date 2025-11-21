'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import styles from './login.module.css' // Importando nosso CSS Module

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient() // Nosso cliente do lado do browser

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage('Erro ao fazer login: ' + error.message)
    } else {
      // Redireciona para a página principal após o login
      router.push('/')
      router.refresh() // Garante que o layout do servidor seja atualizado
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      // Você pode adicionar mais opções aqui, como 'full_name'
      options: {
        data: {
          full_name: 'Nome de Exemplo', // Colete isso em um campo de formulário
        },
      },
    })

    if (error) {
      setMessage('Erro ao criar conta: ' + error.message)
    } else {
      setMessage('Conta criada! Verifique seu e-mail para confirmação.')
    }
  }

  return (
    <div className={styles.container}>
      <h2>Health Check Login</h2>
      <form className={styles.form}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={styles.buttonGroup}>
          <button onClick={handleSignIn}>Entrar</button>
          <button onClick={handleSignUp}>Cadastrar</button>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
