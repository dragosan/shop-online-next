import React, { useEffect } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import Layout from '../components/Layout'
import { getError } from '../utils/error'

const Login = () => {
  const router = useRouter()
  const { redirect } = router.query
  const { data: session } = useSession()
  console.log(session)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        console.log('error', result.error)
        toast.error(result.error)
      }
    } catch (err) {
      console.log('error2', result.error)
      toast.error(getError(err))
    }
  }

  console.log(watch('example')) // watch input value by passing the name of it

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter a valid email',
              },
            })}
            className="w-full"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-600">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="w-full"
          />
          {errors.password && (
            <div className="text-red-600">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;{' '}
          <Link href="/register">Register</Link>
        </div>
      </form>
    </Layout>
  )
}

export default Login
