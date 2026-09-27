import { Search, X } from 'lucide-react'
import React from 'react'

const SearchBar = ({
    value,
    onChange,
    onClear,
    itemsPerpage,
    onItemsPerpageChange,
    currentPage,
    totalUsers
}) => {
    const startUser = totalUsers === 0 ? 0 : (currentPage - 1) * itemsPerpage + 1;
    const endUser = Math.min(currentPage * itemsPerpage, totalUsers);

    return (
        <div className='bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='relative flex-1'>
                <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type='text'
                    placeholder='Search by name, email, phone or status...'
                    className='w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 outline-none'
                />
                {value && (
                    <button
                        onClick={onClear}
                        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700 p-1 rounded-full transition-all duration-200'
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <div className='flex items-center gap-4'>
                <span className='text-sm text-gray-400'>Showing {startUser} to {endUser} of {totalUsers} Users</span>
                <div className='flex items-center gap-2'>
                    <label className='text-sm text-gray-400'>Rows</label>
                    <select
                        value={itemsPerpage}
                        className='px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm'
                        onChange={(e) => onItemsPerpageChange(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SearchBar