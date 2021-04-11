import { MongoClient } from 'mongodb';
import ConnectionDatabase from "./Connection";
export default class MongoConnection extends ConnectionDatabase {
    protected poolDatabase: MongoClient;
    constructor(keys: {
        host: string;
        database: string;
        user: string;
        port: number;
        password: string;
    });
    protected connect(): Promise<void>;
    protected query(collection: string): any;
    getAll(table: string): Promise<any[]>;
    get(table: string, id: number | string): Promise<any>;
    create(table: string, data: any): Promise<any>;
    delete(table: string, id: number | string): Promise<any>;
    update(table: string, data: any): Promise<any>;
}
