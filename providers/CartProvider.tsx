'use client';

interface CartProviderProps {
    children: React.ReactNode
}
import { CartContextProvider } from '@/hooks/useCart';
import React from 'react'

const CartProvider:React.FC<CartProviderProps> = ({children}) => {
  return (
        <CartContextProvider>
            {children}
        </CartContextProvider>
    ) 
}

export default CartProvider