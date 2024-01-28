import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propname: string] : any
}

export const CartContextProvider = (props:Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem('juanca_shop_cartItems');
        const cProduct: CartProductType[] | null = JSON.parse(cartItems);

        setCartProducts(cProduct);
    },[]);

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
            toast.success('Product removed from cart');   
            localStorage.setItem('juanca_shop_cartItems', JSON.stringify(filterProducts));
        }
        
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        const itemsInStock = 9;
        let updatedCart;
        if(product.quantity >= itemsInStock){
            return toast.error("Ooopppss!!!...Maximum reached!!!.");
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
            return toast.error("Ooopppss!!!...Minimum reached!!!.");
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
    }, [cartProducts])

    
    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
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