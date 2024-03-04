import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getBooks({ signal, page, limit, search }) {
    const baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/api/library/books`;
    const params = new URLSearchParams();

    if (page) {
        params.append('page', page);
    }

    if (limit) {
        params.append('limit', limit);
    }

    if (search) {
        params.append('search', search);
    }

    const url = `${baseUrl}?${params.toString()}`;

    const response = await fetch(url, { signal });

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the books");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();
    return data;
}
