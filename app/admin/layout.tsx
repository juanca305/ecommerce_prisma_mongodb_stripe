import AdminNav from "../components/admin/AdminNav"

export const metadata: any ={
    title: 'Juanca-Shop Admin',
    description: 'Juanca-Shop Admin Dashboard'
}
//import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <AdminNav />
        {children}
    </div>
  )
}

export default AdminLayout