export default class BaseAPI {
    constructor(private baseUrl: string) { }

    setUrl(url: string) {
        this.baseUrl = url;
    }

    protected async request<T>(path: string, options: RequestInit = {}): Promise<T> {
        try {
            const res = await fetch(`${this.baseUrl}${path}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(`Request to ${path} failed (${res.status}): ${message}`);
            }

            return await res.json();
        } catch (error) {
            console.error(`Bridge error (${path}):`, error);
            throw error;
        }
    }

    async get<T>(path: string): Promise<T> {
        return this.request<T>(path, {
            method: 'GET',
        });
    }

    async post<T>(path: string, data?: any): Promise<T> {
        return this.request<T>(path, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put<T>(path: string, data?: any): Promise<T> {
        return this.request<T>(path, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async patch<T>(path: string, data?: any): Promise<T> {
        return this.request<T>(path, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(path: string, data?: any): Promise<T> {
        return this.request<T>(path, {
            method: 'DELETE',
            body: JSON.stringify(data),
        });
    }
}
