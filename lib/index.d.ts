export declare class DatabaseClient {
    private databaseManager;
    /**
     * @param keys
     * Here you can define your database client.
     *
     * Using the client key.
     *
     * By default we use mysql database.
     *
     * But you can define:
     *
     * - mysql
     * - postgresql
     * - mongodb
     *
     * To use some of these database managers.
     */
    constructor(keys: {
        client: string;
        host: string;
        database: string;
        user: string;
        port: number;
        password: string;
    });
    setKeyTables(idTables: {
        table: string;
        primaryKey: string;
    }[]): DatabaseManager;
}
declare class DatabaseManager {
    private database;
    constructor(keys: {
        client: string;
        host: string;
        database: string;
        user: string;
        port: number;
        password: string;
    });
    getAll(table: string): Promise<any[]>;
    get(table: string, id: number | string): Promise<any>;
    create(table: string, data: any): Promise<any>;
    delete(table: string, id: number | string): Promise<any>;
    update(table: string, data: any): Promise<any>;
}
export {};
