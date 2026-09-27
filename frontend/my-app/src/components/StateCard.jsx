import { User } from 'lucide-react'
import React from 'react'

const StateCard = ({title, value, icon:Icon, bgIcon="bg-gray-700", iconColor="text-white", gradient="from-gray-900 to-gray-800", description=""}) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 border border-gray-800 transform hover:scale-105 transition-all bg-gradient-to-l ${gradient} `}>
      <div className='flex items-start justify-between'>
         <div>
        <p className='text-gray-100 text-sm font-medium'>{title}</p>
        <p className='text-3xl font-bold mt-2  text-white'>{value.number}</p>
       {description && (
         <p className='text-gray-100 text-sm mt-1'>{description}</p>
       )}
       </div>
       <div className={`p-3 rounded-lg flex items-center justify-center ${bgIcon}`}>
      {Icon && <Icon size={24} className={iconColor} />}
       </div>
      </div>
        </div>
  )
}

export default StateCard