'use client'
import React, { useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/products/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const router = useRouter();

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        //console.log(data);

        axios.post('/api/register', data).then(() => {
            toast.success('Account created!.');
            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if(callback?.ok) {
                    router.push("/cart");
                    router.refresh();
                    toast.success('Logged In');   
                }

                if(callback?.error) {
                    toast.error(callback.error)
                }
            })
        }).catch(() => toast.error('Something went wrong!.'))
          .finally(() => {
            setIsLoading(false)
        });
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