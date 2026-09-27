import { Check, X } from 'lucide-react'
import React from 'react'

const UserModel = ({isOpen, isClose, formData, setFormData, onSubmit, loading, status}) => {
    if(!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-5'>
        <div className='bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto border border-gray-800'>
         <div className='flex items-center justify-between p-6 border border-gray-800'>
            <h2 className='text-2xl font-bold text-white'>{formData._id?"Edit User": "Add New User"}</h2>
            <button className='text-gray-400 hover:text-white transition-all duration-200' onClick={isClose}>
                <X size={24} />
            </button>
         </div>
         <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <label className='block text-gray-300 font-medium mb-2'>Name *</label>
                    <input type='text' value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} placeholder='John Doe' className='w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none' />
                </div>
                <div>
                    <label className='block text-gray-300 font-medium mb-2'>Email *</label>
                    <input type='text' value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} placeholder='Johndoe@gmail.com' className='w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none' />
                </div>
                <div>
                    <label className='block text-gray-300 font-medium mb-2'>Phone *</label>
                    <input type='tel' value={formData.phone} onChange={(e)=>setFormData({...formData, phone:e.target.value})} placeholder='0170998457' className='w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none' />
                </div>
                <div>
                    <label  className='block text-gray-300 font-medium mb-2'>Stats *</label>
                    <select className='w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none' value={formData.status} onChange={(e)=>setFormData({...formData, status:e.target.value})}>
                       {status.map((status,index)=>(
                         <option value={status} key={index}>{status}</option>
                       ))}
                    </select>
                </div>
            </div>
            <div className='flex gap-3 mt-6'>
                <button className='w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-lg outline-none' onClick={isClose} >
                    Cancel
                </button>
                <button className='w-full flex px-4 py-2.5 bg-green-500 border border-gray-700 text-gray-900 placeholder-gray-600 rounded-lg outline-none' onClick={onSubmit} disabled={loading}>
                    <Check size={20}/> {
                        loading? "Saving...": formData._id? "Update User":"Add User"
                    }
                </button>
            </div>
         </div>
        </div>
    </div>
  )
}

export default UserModel