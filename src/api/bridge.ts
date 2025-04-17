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

    async getData(): Promise<APIData> {
        return this.get('/data');
    }

    async watchKey(key: string): Promise<void> {
        await this.post('/watch', { key });
    }

    async unwatchKey(key: string): Promise<void> {
        await this.delete('/unwatch', { key });
    }
}