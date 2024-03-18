'use client';


import React, { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import { AiFillCaretDown } from 'react-icons/ai';
import Link from 'next/link';
import { MenuItem } from '@mui/material';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { User } from '@prisma/client';
import { SafeUser } from '@/types';

interface UserMenuProps{
  currentUser: SafeUser | null
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {
console.log("UserMenu-currentUser", currentUser);
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

  function setCartProducts(arg0: null) {
    throw new Error('Function not implemented.');
  }

  function setCartTotalQty(arg0: number) {
    throw new Error('Function not implemented.');
  }

  return (
    <>
        <div className=' relative z-30 flex items-center gap-2 text-sm'>
            <div className={`${currentUser ? 'block' : 'hidden'}`}>Hello, {currentUser?.name?.split(' ', 1)}</div>
            <div onClick={toggleOpen} className='
              p-2 border-[1px]
              border-slate-400 
              flex 
              flex-row 
              items-center 
              gap-1 
              rounded-full
              hover:shadow-md
              cursor-pointer
              transition
             text-slate-700
              '>
                
                <Avatar src={currentUser?.image}/>
                <AiFillCaretDown />
            </div>
            
               { isOpen && (
                  <div className='
                   absolute 
                   rounded-md
                   shadow-md
                   w-[170px]
                   bg-white
                   overflow-hidden
                   right-0
                   top-12
                   text-sm
                   flex
                   flex-col
                   cursor-pointer
                   '>

                    { currentUser ? 

                      <div>
                        <Link href='/orders'>
                            <MenuItem onClick={toggleOpen}>
                              Your Orders
                            </MenuItem>
                        </Link>
                        <Link href='/admin'>
                            <MenuItem onClick={toggleOpen}>
                              Admin Dashboard
                            </MenuItem>
                        </Link>
                        <hr />
                            <MenuItem onClick={() => {
                                toggleOpen();
                                signOut();
                                
                            }}>
                              Logout
                            </MenuItem>
                      </div> : 
                      <div>
                        <Link href='/login'>
                            <MenuItem onClick={toggleOpen}>
                              Login
                            </MenuItem>
                        </Link>
                        <Link href='/register'>
                            <MenuItem onClick={toggleOpen}>
                              Register
                            </MenuItem>
                        </Link>
                      </div> }
                  </div>
               )}  
        </div>
        { isOpen ? <BackDrop onClick={toggleOpen}/> : null}
    </>
  )
}

export default UserMenu