import React from 'react'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullData'
import OrdersClient from './OrderClient'
import getOrdersByUserId from '@/actions/getOrdersByUserId'

const Orders = async() => {

  //const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return <NullData title='Oops! Access denied'/>
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if(!orders) {
    return <NullData title='No orders yet...'/>
  }

  return (
    <div>
      <OrdersClient orders = {orders}/>
    </div>
  )
}

export default Orders;