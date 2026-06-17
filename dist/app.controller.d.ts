import { AppService, Item } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getAllItems(): Item[];
    getItemById(id: number): Item;
    createItem(body: {
        name: string;
        description?: string;
    }): Item;
    updateItem(id: number, body: {
        name?: string;
        description?: string;
    }): Item;
    deleteItem(id: number): {
        message: string;
    };
}
