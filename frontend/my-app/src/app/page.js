"use client"
import SearchBar from "@/components/SearchBar";
import StateCard from "@/components/StateCard";
import UserTable from "@/components/UserTable";
import { Check, Plus, User, Users, X } from "lucide-react";
import { addUser, deleteUser, getStatus, getUsers, searchUsers, updateUser } from '@/services/userServices';
import React, { useEffect, useState } from 'react'
import UserModel from "@/components/UserModel";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [status, setStatus] = useState({ total: 0, active: 0, inactive: 0 });
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "Active"
    });

    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerpage, setItemPerpage] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const statuses = ["Active", "Inactive"];

    useEffect(() => {
        fetchUsers();
    }, [currentPage, itemsPerpage]);

    useEffect(() => {
        if (searchTerm.trim()) {
            handleSearch();
        } else {
            fetchUsers();
        }
    }, [searchTerm]);

    const fetchStatus = async () => {
        try {
            const data = await getStatus();
            if (data) {
                setStatus({
                    total: data.total || 0,
                    active: data.active || 0,
                    inactive: data.inactive || 0
                });
            }
        } catch (error) {
            console.error("Failed to fetch status:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await getUsers(currentPage, itemsPerpage);
            setUsers(data?.users || data?.user || []);
            setTotalPage(data?.totalPage || data?.totalPages || 0);
            setTotalUsers(data?.totalUsers || data?.totalUser || 0);
            fetchStatus();
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setUsers([]);
        }
    };

    const handleSearch = async () => {
        try {
            const data = await searchUsers(searchTerm.trim(), currentPage, itemsPerpage);
            setUsers(data?.users || data?.user || []);
            setTotalPage(data?.totalPage || data?.totalPages || 0);
            setTotalUsers(data?.totalUsers || data?.totalUser || 0);
        } catch (error) {
            console.error("Failed to search users:", error);
            setUsers([]);
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.status) {
            return alert("Fill all fields");
        }
        setLoading(true);

        try {
            if (editingItem) {
                await updateUser(editingItem._id, formData);
            } else {
                await addUser(formData);
            }
            await fetchUsers();
            closeModal();
        } catch (error) {
            alert(error.message);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({ name: "", email: "", phone: "", status: "Active" });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({ name: "", email: "", phone: "", status: "Active" });
    };

    return (
        <div className="min-h-screen bg-gray-950">
            <header className="bg-gray-900 shadow-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-600 rounded-lg">
                            <Users size={28} className="text-gray-900" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white"> User Management</h1>
                            <p className="text-gray-400 mt-1">Full Stack application</p>
                        </div>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-green-700 text-gray-900 px-5 py-2.5 rounded-lg hover:bg-green-500 transition-colors shadow-lg font-semibold duration-200"
                    >
                        <Plus size={20} /> Add User
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StateCard
                        title="Total Users"
                        value={{ number: status.total }}
                        icon={User}
                        bgIcon="bg-indigo-500"
                        iconColor="text-white"
                        gradient="from-indigo-800 to-indigo-600"
                    />

                    <StateCard
                        title="Active Users"
                        value={{ number: status.active }}
                        icon={Check}
                        bgIcon="bg-green-500"
                        iconColor="text-white"
                        gradient="from-green-800 to-green-600"
                    />

                    <StateCard
                        title="Inactive Users"
                        value={{ number: status.inactive }}
                        icon={X}
                        bgIcon="bg-red-500"
                        iconColor="text-white"
                        gradient="from-red-700 to-red-500"
                    />
                </div>

                <div className="mt-10">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        onClear={() => {
                            setSearchTerm("");
                            setCurrentPage(1);
                        }}
                        itemsPerpage={itemsPerpage}
                        onItemsPerpageChange={(val) => {
                            setItemPerpage(Number(val));
                            setCurrentPage(1);
                        }}
                        currentPage={currentPage}
                        totalUsers={totalUsers}
                    />

                    <UserTable
                        users={users}
                        onEdit={openModal}
                        onDelete={handleDelete}
                        currentPage={currentPage}
                        totalPage={totalPage}
                        onPageChange={setCurrentPage}
                    />
                    <UserModel
                        isOpen={isModalOpen}
                        isClose={closeModal}
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        loading={loading}
                        status={statuses}
                    />
                </div>
            </main>
        </div>
    );
}
