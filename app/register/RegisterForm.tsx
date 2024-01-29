'use client'
import React, { useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/products/Button'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'

const RegisterForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
    }
  
    return (
    <>
        <Heading title='Sign Up for Juanca-Shop'/>
        <Button label='Sign Up with Google' outline icon={AiOutlineGoogle} onClick={() => {}}/>
        <hr className=' bg-slate-300 w-full h-px'/>
        <Input 
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />

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

        <Button label={isLoading ? 'loading...' : 'Sign Up'} onClick={handleSubmit(onSubmit)}/>
        <p className=' text-sm'>Already have an acount? 
            <Link href='/login' className=' underline'>
               Login
            </Link>
        </p>
    </>
  )
}

export default RegisterForm