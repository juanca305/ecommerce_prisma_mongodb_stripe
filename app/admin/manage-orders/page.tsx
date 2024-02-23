import React from 'react'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullData'
import ManageOrdersClient from './ManageOrdersClient'
import getOrders from '@/actions/getOrders'

const ManageOrders = async() => {

  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title='Oops! Access denied'/>
  }

  return (
    <div><ManageOrdersClient orders = {orders}/></div>
  )
}

export default ManageOrders;