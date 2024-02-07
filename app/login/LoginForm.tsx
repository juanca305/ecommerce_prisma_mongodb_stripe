'use client'
import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/products/Button'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { SafeUser } from '@/types'

interface LoginFormProps{
    currentUser: SafeUser | null
}

const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const router = useRouter();

    useEffect (() => {
        if (currentUser) {
            router.push('/cart');
            router.refresh();
        }
    }, []);

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        //console.log(data);
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false);

            if(callback?.ok) {
                router.push("/cart");
                router.refresh();
                toast.success('Logged In');   
            }

            if(callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    if(currentUser) {
        return <p className=' text-center'>Logged in. Redirecting...</p>
    }
  
    return (
    <>
        <Heading title='Sign in to Juanca-Shop'/>
        <Button label='Continue with Google' outline icon={AiOutlineGoogle} onClick={() => {signIn('google')}}/>
        <hr className=' bg-slate-300 w-full h-px'/>
        
        <Input 
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />

        <Input 
            id='password'
            label='Password'
            disabled={isLoading}
            register={register}
            errors={errors}
            type='password'
            required
        />

        <Button label={isLoading ? 'loading...' : 'Login'} onClick={handleSubmit(onSubmit)}/>
        <p className=' text-sm'>Do not have an acount?{' '} 
            <Link href='/register' className=' underline'>
               Sign Up
            </Link>
        </p>
    </>
  )
}

export default LoginForm