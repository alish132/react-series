import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import authservice from '../appwrite/auth';
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const createAccount = async (data) => {
        setError('')
        try {
            const userData = await authservice.createAccount(data)
            if (userData) {
                const userData = await authservice.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create acount</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                {/* Input Box */}
                <form onSubmit={handleSubmit(createAccount)}>
                    <div className='space-y-5'>
                        <Input
                        label = 'Full Name: '
                        placeholder = 'Enter your full name'
                        {...register('name',{
                            required: true
                        })}
                         />
                         <Input
                        label='Email: '
                        placeholder = 'Enter your email'
                        type = 'email'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi. test(value) ||
                                "Email address must be a valid address"
                            }
                        })}
                         />
                         <Input
                         label = 'Password: '
                         placeholder = 'Enter Password'
                         type = 'password'
                         {...register('password', {
                            required: true
                         })}
                          />
                          <Button type='submit' className='w-full bg-blue-300 hover:bg-blue-400'>Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}