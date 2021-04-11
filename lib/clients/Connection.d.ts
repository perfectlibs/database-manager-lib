export default abstract class ConnectionDatabase {
    protected poolDatabase: any;
    protected databaseKeys: {
        host: string;
        database: string;
        user: string;
        port: number;
        password: string;
    };
    constructor(keys: {
        host: string;
        database: string;
        user: string;
        port: number;
        password: string;
    });
    protected abstract connect(keys: {
        client: string;
        host: string;
        database: string;
        user: string;
        port: number | string;
    }): void;
    protected abstract query(query: string): Promise<any>;
    abstract getAll(table: string): Promise<any[]>;
    abstract get(table: string, id: number | string): Promise<any>;
    abstract create(table: string, data: any): Promise<any>;
    abstract delete(table: string, id: number | string): Promise<any>;
    abstract update(table: string, data: any): Promise<any>;
}
