'use client';
import React from 'react'
import Container from '../Container'
import { categories } from '@/utils/Categories'
import Category from './Category'
import { usePathname, useSearchParams } from 'next/navigation'

import { Suspense } from 'react';

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');

    const pathName = usePathname();
    const isMainPage = pathName === '/';

    if (!isMainPage) return null;

  return (
    <div className=' bg-white'>
        <Container>
            {/* <div className=' pt-4 flex md:flex-row items-center justify-between overflow-x-auto text-xs'> */}
            <div className='items-start pt-4 grid grid-cols-3 md:flex md:text-sm flex-row md:items-center justify-between overflow-x-auto'>
                {categories.map((item) => (
                    <div key={item.label} className='border md:border-none md:hover:border-black bg-slate-50 hover:bg-slate-100 md:bg-white flex m-1 p-[0.25px] rounded-md overflow-x-auto md:text-sm'>                      
                      <Suspense fallback={<>Loading...</>}>
                          <Category  
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label || (category === null && item.label === 'All')}
                          />
                      </Suspense>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Categories