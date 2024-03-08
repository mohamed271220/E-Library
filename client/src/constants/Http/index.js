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

export async function getPosts({ signal, searchTerm, limit, page }) {
    let url = new URL(`${import.meta.env.VITE_REACT_APP_API_URL}/api/post/all`);

    if (searchTerm) {
        url.searchParams.append('search', searchTerm);
    }

    if (limit) {
        url.searchParams.append('limit', limit);
    }
    if (page) {
        url.searchParams.append('page', page);
    }
    const response = await fetch(url.toString(), { signal });
    if (!response.ok) {
        const error = new Error("An error occurred while fetching the posts");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const data = await response.json();
    return data;
}

export async function getPostById({ signal, id }) {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/post/${id}`, { signal });
    if (!response.ok) {
        const error = new Error("An error occurred while fetching the post");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const data = await response.json();
    return data;
}
