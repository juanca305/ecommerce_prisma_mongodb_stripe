import Container from '@/app/components/Container';
import React from 'react'
import ProductDetails from './ProductDetails';
//import { product } from '@/utils/product';
import ListRating from '../ListRating';
import { products } from '@/utils/products';
import getProductById from '@/actions/getProductById';
import NullData from '@/app/components/NullData';

interface IPrams {
    productId?:string
}

const Product = async ({params} : {params: IPrams}) => {
    //console.log('params', params);

    const product = await getProductById(params)
    if (!product) return <NullData title='Oops! Product with the given id does not exist'/>

    //const product = products.find((item) => item.id === params.productId)
  
    return (
    <div className='p-8'>
        <Container>
            <ProductDetails product = {product}/>
            <div className=' flex flex-col mt-20 gap-4'>
              <div>Add Ratings</div>
              <ListRating product={product}/>
            </div>
        </Container>
    </div>
  )
}

export default Product