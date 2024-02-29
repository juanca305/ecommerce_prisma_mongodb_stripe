'use client'

import { useRouter } from "next/navigation"
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const SearchBar = () => {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FieldValues>({
       defaultValues: {
        searchTerm: ''
       }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        if(!data.searchTerm) return router.push('/');

        const url = queryString.stringifyUrl({
            url: '/',
            query:{
                searchTerm: data.searchTerm
            }
        }, {skipNull: true})
        
        //console.log(url);

        router.push(url);
        reset();
    }
  return (
    <div className="flex items-center">
        <input
        {...register('searchTerm')}
            autoComplete="off" 
            type="text"
            placeholder="Explore Juanca-Shop"
            className=" p-[7.1px] border border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
        />
        <button onClick={handleSubmit(onSubmit)}  className=" bg-slate-700 p-2 rounded-r-md text-white hover:opacity-80 border">Search</button>
    </div>
  )
}

export default SearchBar

