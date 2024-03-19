'use client';

import { Order, User } from "@prisma/client";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import Orders from "./page";
import { BsBox } from "react-icons/bs";
import { yellow } from "@mui/material/colors";


//import React from 'react'

interface OrdersClientProps {
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const OrdersClient:React.FC<OrdersClientProps> = ({orders}) => {
    const router = useRouter();
    //const storage = getStorage(firebaseApp);
    let rows: any = [];

    if(orders) {
        rows = orders.map((order) => {
            const { id, user, amount, createDate, status, deliveryStatus } = order;
            return {
                // id: product.id,
                // name: product.name,
                // price: formatPrice(product.price),
                // category: product.category,
                // brand: product.brand,
                // inStock: product.inStock,
                // images: product.images

                id: id,
                customer: user.name,
                amount: formatPrice(amount/100),
                paymentStatus: status,
                date: moment(createDate).fromNow(),
                deliveryStatus: deliveryStatus
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'customer', headerName: 'Customer Name', width: 200 },
        { field: 'amount', headerName: 'Amount(USD)', width: 100, renderCell: (params) => {
            return(<div className=" font-bold text-slate-800">{params.row.amount}</div>)
        } },
        //{ field: 'paymentStatus', headerName: 'Payment Status', width: 130 },
        
        { field: 'paymentStatus', headerName: 'Payment Status', width: 130, renderCell: (params) => {
            
            return(<div>
                {params.row.paymentStatus === 'pending' ? 
                <Status 
                    text="pending"
                    icon={MdAccessTimeFilled}
                    bg="bg-slate-200"
                    color="text-slate-700"
                /> : params.row.paymentStatus === 'complete' ? (
                <Status 
                    text="completed"
                    icon={MdDone}
                    bg="bg-green-200"
                    color="text-green-700"
                />
            ) : (
              <></>)}
           </div>
          );
         },
        },

        //***************************** */
        { field: 'deliveryStatus', headerName: 'Delivery Status', width: 130, renderCell: (params) => {
            
            return(<div>
                {params.row.deliveryStatus === 'pending' ? 
                <Status 
                    text="pending"
                    icon={MdAccessTimeFilled}
                    bg="bg-slate-200"
                    color="text-slate-700"
                /> : params.row.deliveryStatus === 'dispatched' ? (
                <Status 
                    text="dispatched"
                    icon={MdDeliveryDining}
                    bg="bg-purple-200"
                    color="text-purple-700"
                />
            ): params.row.deliveryStatus === 'delivered' ? (
                <Status 
                    text="delivered"
                    icon={MdDone}
                    bg="bg-green-200"
                    color="text-green-700"
                />
            ) : <></>}
        </div>)
        }},
        {field: 'date', headerName: 'Date', width: 110},
        { field: 'action', headerName: 'Actions', width: 200, renderCell: (params) => {
            return(
                <div className="flex justify-between gap-2 w-full">
                    <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                        router.push(`/order/${params.row.id}`)
                    }}/>
                </div>
            )
        }},
    ];

    
  return (
   
    <div className=" max-w-[1150px] m-auto text-xl ">
        <div className=" mb-4 mt-8">
            <Heading title="Orders" center/>
        </div>

        <div>
            {orders && orders.map((order) => {
                return(
                    <div key={order.id} className="text-slate-700 border-slate-300 bg-slate-100 m-2 border rounded flex flex-row p-2 mx-4 justify-between md:hidden text-xs">
                
                        <div className="flex flex-row gap-x-2">
                            <BsBox size={24} color='#ebab34'/>
                            <div className="flex flex-col gap-2">
                              <p>{order.id}</p>
                              {order.createDate.toDateString()}
                              
                            </div>    
                        </div>

                        <div className="flex flex-col">   
                            <div className={`${order.status === 'pending' ? 'text-yellow-400': 'text-lime-600'}`}>
                                <p>{order.status}</p>
                            </div>
                            <p>{order.currency}: <span className="text-lime-600 font-bold">$</span><span className="font-bold text-black">{order.amount/100}</span></p>
                        </div>
                    </div>
                )
            })}
        </div>

        

        <div className="hidden md:block" style={{ height: 600, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
        
    </div>
  )
}

export default OrdersClient;