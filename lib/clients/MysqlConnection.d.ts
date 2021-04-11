import { Pool } from 'mysql';
import ConnectionDatabase from './Connection';
export default class MysqlConnection extends ConnectionDatabase {
    protected poolDatabase: Pool;
    constructor(keys: {
        host: string;
        database: string;
        user: string;
        port: number;
        password: string;
    });
    protected connect(): void;
    protected query(queryString: string, data?: any[]): Promise<any>;
    getAll(table: string): Promise<any>;
    get(table: string, id: number | string): Promise<any>;
    create(table: string, data: any): Promise<any>;
    delete(table: string, id: number | string): Promise<any>;
    update(table: string, data: any): Promise<any>;
}
