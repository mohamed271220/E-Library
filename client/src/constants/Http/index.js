import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getBooks({ signal, page, limit, search, category }) {
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
    if (category) {
        params.append('category', category);
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

export async function getCategories({ signal }) {
    const baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/api/library/categories`;
    const response = await fetch(baseUrl, { signal });
    if (!response.ok) {
        const error = new Error("An error occurred while fetching the categories");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const data = await response.json();
    return data;
}