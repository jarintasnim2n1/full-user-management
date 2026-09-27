const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(path, options = {}) {
    const { headers, ...rest } = options;

    const res = await fetch(`${API_URL}${path}`, {

        headers: { "Content-Type": "application/json", ...headers },
        ...rest
    })

    if (res.status === 204) return null;

    const data = await res.json().catch(() => null);
    if (!res.ok) {
        const error = new Error(data?.message || "Request failed");

        error.status = res.status;
        throw error;
    }

    return data;
}

//export const GOOGLE_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`