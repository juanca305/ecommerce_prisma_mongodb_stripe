import React from 'react'
import Container from '../Container'
import FooterList from './FooterList'
import Link from 'next/link'

import {MdFacebook} from 'react-icons/md';
import {AiFillTwitterCircle, AiFillInstagram, AiFillYoutube} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className='
     bg-slate-700
     text-slate-200
     text-sm
     md:mt-16
     md:p-2
    '>
      <Container>
        <div className='
         flex
         flex-col
         md:flex-row
         justify-between
         pt-10
         md:pt-14
         pb-8
         md:gap-4
         md:px-4
         
        '>
          <FooterList>
            <h3 className=' text-base font-bold md:mb-2'>Shop Categories</h3>
            <Link href="/?category=Phone"><p className='hover:text-cyan-400 transition'>Phones</p></Link>
            <Link href="/?category=Laptop"><p className='hover:text-cyan-400 transition'>Laptops</p></Link>
            <Link href="/?category=Desktop"><p className='hover:text-cyan-400 transition'>Desktops</p></Link>
            <Link href="/?category=Watch"><p className='hover:text-cyan-400 transition'>Watches</p></Link>
            <Link href="?category=Tv"><p className='hover:text-cyan-400 transition'>TVs</p></Link>
            <Link href="/?category=Accesories"><p className='hover:text-cyan-400 transition'>Accessories</p></Link>
          </FooterList>

          <FooterList>
            <h3 className=' text-base font-bold md:mb-2'>Customer Service</h3>
            <Link href="#"><p className='hover:text-cyan-400 transition'>Contact Us</p></Link>
            <Link href="#"><p className='hover:text-cyan-400 transition'>Shipping Policy</p></Link>
            <Link href="#"><p className='hover:text-cyan-400 transition'>Returns & Exchanges</p></Link>
            <Link href="#"><p className='hover:text-cyan-400 transition'>FAQs</p></Link>
          </FooterList>

            <div className=' w-full md:w-1/3 mb:6 md:mb-2'>
              <h3 className=' text-base font-bold mb-2'>About Us</h3>
              <p className=' mb-6 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Harum asperiores rem laboriosam facere minus similique quia rerum, inventore
               laudantium sint nobis iure provident porro. Nam ducimus soluta magnam neque
               ad.
              </p>
              
            </div>

            <FooterList>
            <h3 className=' text-base font-bold mb-1 mt-4 md:mt-2'>Follow Us</h3>
              <div className='flex gap-4'>
                <Link href="#"><MdFacebook size = {24}/></Link>
                <Link href="#"><AiFillTwitterCircle size = {24}/></Link>
                <Link href="#"><AiFillInstagram size = {24}/></Link>
                <Link href="#"><AiFillYoutube size = {24}/></Link>
              </div>
            </FooterList>    
        </div> 
      </Container>
      <p className='flex flex-row justify-center mb-4 mt-[-20px]'>&copy; {new Date().getFullYear()} Juanca-Shop All Rights Reserved</p>
    </footer>
  )
}

export default Footer