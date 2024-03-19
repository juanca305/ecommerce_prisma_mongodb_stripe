
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

import { Order, User } from "@prisma/client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { setUncaughtExceptionCaptureCallback } from "process";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (value: string | null)=> void;

}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propname: string] : any
}


export const CartContextProvider = (props:Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

    // const myUser = async () => {
    //             const currentUser = await getCurrentUser();
    //            return currentUser?.id;
    //         } 

    // const myUser = async () => {
    //     const currentUser = await getCurrentUser()
    //     return currentUser;
    // }
    useEffect(() => {    
        const cartItems: any = localStorage.getItem('juanca_shop_cartItems');
        const cProduct: CartProductType[] | null = JSON.parse(cartItems);
        const eShopPaymentIntent:any = localStorage.getItem('juanca_shop_paymentIntent');
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)

        setCartProducts(cProduct);
        setPaymentIntent(paymentIntent);
    },[]);


    //***Each time page load and cartProducts changes***/
    useEffect(() => {
        const getTotals = () => {

            if (cartProducts) {
                const {total, qty } = cartProducts?.reduce((acc, item) => {
                const itemsTotal = item.price * item.quantity;
                acc.total += itemsTotal;
                acc.qty += item.quantity;

                return acc;
            },{
                total: 0,
                qty: 0
            });
            setCartTotalQty(qty);
            setCartTotalAmount(total);
            }   
        }
        getTotals();
    }, [cartProducts]);


    const handleAddProductToCart = useCallback((product: CartProductType) => {

        setCartProducts((prev) => {
            let updatedCart;
            if(prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            console.log('updated cart', updatedCart);
           
            localStorage.setItem('juanca_shop_cartItems', JSON.stringify(updatedCart));
            //localStorage.setItem(`${myUser}_juanca_shop_cartItems`, JSON.stringify(updatedCart));
            return updatedCart;
        })
        toast.success('Product added to cart');   
        
    },[]);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if(cartProducts) {
            const filterProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })
            setCartProducts(filterProducts);
            toast.success('Product removed');   
            localStorage.setItem('juanca_shop_cartItems', JSON.stringify(filterProducts));
        }
        
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        const itemsInStock = 9;
        let updatedCart;
        if(product.quantity >= itemsInStock){
            return toast.error("Ooops!!!...Maximum reached.");
        }

        if (cartProducts){
            updatedCart = [...cartProducts];
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
            //if (existingIndex > -1) setIsProductInCart(true);
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity;
            }
            setCartProducts(updatedCart);
            localStorage.setItem("juanca_shop_cartItems", JSON.stringify(updatedCart));
        }
    }, [cartProducts]);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        //const itemsInStock = 9;
        let updatedCart;
        if(product.quantity === 1){
            return toast.error("Ooops!!!...Minimum reached.");
        }

        if (cartProducts){
            updatedCart = [...cartProducts];
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
            //if (existingIndex > -1) setIsProductInCart(true);
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity;
            }
            setCartProducts(updatedCart);
            localStorage.setItem("juanca_shop_cartItems", JSON.stringify(updatedCart));
        }
    }, [cartProducts]);

    const handleClearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem("juanca_shop_cartItems", JSON.stringify(null));
    }, [cartProducts]);

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val);
        localStorage.setItem('juanca_shop_paymentIntent', JSON.stringify(val))
    }, [paymentIntent]) 
    
    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent
    }
    return <CartContext.Provider value={value} {...props}/>
}

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null) {
        throw new Error('useCart must be used within a CartContextProvider');
    }

    return context;
}