//import React from 'react'

const truncateText = (str: string) => {  
   if (str.length < 15) return str
   return str.substring(0, 12) + "..." 
}

export default truncateText