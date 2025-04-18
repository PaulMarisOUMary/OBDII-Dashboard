import BaseAPI from ".";
import { APIData, APIStatus } from "./types";


export default class Bridge extends BaseAPI {
    async status(): Promise<boolean> {
        try {
            const { status } = await this.request<APIStatus>('/status');
            return status;
        } catch {
            return false;
        }
    }

    async connect(kwargs: Record<string, any>): Promise<void> {
        await this.post('/connect', kwargs);
    }

    async disconnect(): Promise<void> {
        await this.post('/disconnect');
    }

    async getData(): Promise<APIData> {
        return this.get('/data');
    }

    async watchKey(key: string): Promise<void> {
        const url = `/add?key=${encodeURIComponent(key)}`;
        await this.post(url);
    }

    async unwatchKey(key: string): Promise<void> {
        const url = `/remove?key=${encodeURIComponent(key)}`;
        await this.delete(url);
    }
}