'use client';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { dividerClasses } from '@mui/material';
import React from 'react';

interface SetQtyProps{
    carCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded'

const SetQuantity:React.FC<SetQtyProps> = (
    {carCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease}
) => {
  return (
    <div className=' flex gap-8 items-center'>
        {carCounter ? null : <div className='font-semibold'>Quantity</div>}
        <div className=' flex gap-2 md:gap-4 items-center text-base justify-center'>
            <button onClick={handleQtyDecrease} className={btnStyles}>-</button>
            <div className='text-xs md:text-sm'>{cartProduct.quantity}</div>
            <button onClick={handleQtyIncrease} className={btnStyles}>+</button>
        </div>
    </div>
  )
}

export default SetQuantity