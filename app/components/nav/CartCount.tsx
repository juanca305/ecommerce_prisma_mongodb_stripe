'use client';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CiShoppingCart } from 'react-icons/ci';

const CartCount = () => {
    const { cartTotalQty } = useCart();
    const router = useRouter();
  return (
    <div className='relative cursor-pointer' onClick={() => router.push('/cart')}>
        <div className=' text-2xl md:text-3xl'>
            <CiShoppingCart />
        </div>
        <span className=' absolute top-[-5px] md:top-[-10px] right-[-5px] md:right-[-10px] bg-slate-700 text-white h-4 w-4 md:h-6 md:w-6 rounded-full flex items-center justify-center text-xs'>
            {cartTotalQty}
        </span>
    </div>
  )
}

export default CartCount