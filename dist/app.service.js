"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor() {
        this.items = [
            { id: 1, name: 'Item One', description: 'This is item number one.', createdAt: new Date() },
            { id: 2, name: 'Item Two', description: 'This is item number two.', createdAt: new Date() },
        ];
        this.nextId = 3;
    }
    getAll() {
        return this.items;
    }
    getById(id) {
        const item = this.items.find(i => i.id === id);
        if (!item) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }
    create(name, description) {
        const newItem = {
            id: this.nextId++,
            name,
            description,
            createdAt: new Date(),
        };
        this.items.push(newItem);
        return newItem;
    }
    update(id, name, description) {
        const item = this.getById(id);
        if (name !== undefined) {
            item.name = name;
        }
        if (description !== undefined) {
            item.description = description;
        }
        return item;
    }
    delete(id) {
        const index = this.items.findIndex(i => i.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        this.items.splice(index, 1);
        return { message: `Item with ID ${id} has been deleted successfully` };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map