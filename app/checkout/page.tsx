import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import MyCheckoutClient from './MyCheckoutClient'

const Checkout = () => {
  return (
    <div className=' p-8'>
        <Container>
            <FormWrap>
                <MyCheckoutClient />
            </FormWrap>
        </Container>
    </div>
  )
}

export default Checkout