//import React from 'react'

const truncateText = (str: string) => {  
   if (str.length < 18) return str
   return str.substring(0, 15) + "..." 
}

export default truncateText