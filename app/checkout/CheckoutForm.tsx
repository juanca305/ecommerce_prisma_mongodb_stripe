'use client'

import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/utils/formatPrice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/products/Button";

//import React from 'react'
interface CheckoutFormProps {
    clientSecret: string,
     handleSetPaymentSuccess: (value: boolean) => void
}

const CheckoutForm:React.FC<CheckoutFormProps> = ({clientSecret, handleSetPaymentSuccess}) => {
    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent} = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const formattedPrice = formatPrice(cartTotalAmount);


    useEffect(() => {
        if (!stripe) {
            return;
          }
          if (!clientSecret) {
            return;
          }

          handleSetPaymentSuccess(false);

    }, [stripe]);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
          }

          setLoading(true);

          stripe.confirmPayment({
            elements, redirect: 'if_required'
          }).then(result => {
            if(!result.error) {
                toast.success('CheckOut Success!');
                handleClearCart();
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
            }
                setLoading(false);            
          })
    };

  return (
  <form onSubmit={handleSubmit} id="payment-form">
        <div className=" mb-6">
            <Heading title="Enter your details to complete checkout"/>
        </div>
        <h2 className=" font-semibold mb-2">Address Information</h2>
        <AddressElement options={{
                mode: 'shipping',
                allowedCountries: ['US', 'UK']
            }}
        />
        <h2 className=" font-semibold mt-4 mb-2">Payment Information</h2>
        <PaymentElement id="payment-element" options={{layout: 'tabs'}}/>
        <div className=" py-4 text-center text-slate-700 text-xl font-bold">
            Total: {formattedPrice}
        </div>
        <Button label={loading ? 'Processing' : 'Pay Now'} onClick={() => {}} disabled={loading || !stripe || !elements}/>
    </form>
  )
}

export default CheckoutForm