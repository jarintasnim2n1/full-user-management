import { api } from "@/lib/api";


export const getUsers=async(page=1, limit=5)=>{
    return await api(`/api/users?page=${page}&limit=${limit}`)
}

export const searchUsers= async(term="", page=1, limit=5)=>{
    return await api(`/api/users/search/${encodeURIComponent(term)}?page=${page}&limit=${limit}`)
}

export const getStatus= async()=>{
    return await api(`/api/users/status`);
}

export const addUser= async(data)=>{
    return await api("/api/users",{method:"POST",body: JSON.stringify(data)})
}

export const updateUser= async(id, data)=>{
  return await api(`/api/users/${id}`, {
    method:"PUT",
    body:JSON.stringify(data)
  })
}

export const deleteUser= async(id)=>{
    return await api(`/api/users/${id}`, {method:"DELETE"});
}