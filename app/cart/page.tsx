import React from 'react'
import Container from '../components/Container'
import CartClient from './CartClient'
import { getCurrentUser } from '@/actions/getCurrentUser'

//import {useSearchParams} from "next/navigation";

const Cart = async() => {

  //const searchParams = useSearchParams();

  const currentUser = await getCurrentUser()
  return (
    <div className=' pt-8'>
      <Container>
        <CartClient currentUser={currentUser}/>
      </Container>

    </div>
  )
}

export default Cart