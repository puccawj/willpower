export interface Item {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
}
export declare class AppService {
    private items;
    private nextId;
    getAll(): Item[];
    getById(id: number): Item;
    create(name: string, description?: string): Item;
    update(id: number, name?: string, description?: string): Item;
    delete(id: number): {
        message: string;
    };
}
