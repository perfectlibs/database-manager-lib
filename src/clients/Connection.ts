export default abstract class ConnectionDatabase {

    protected poolDatabase: any;
    protected databaseKeys: {
        host: string,
        database: string,
        user: string,
        port: number,
        password: string
    };

    constructor(keys: {
        host: string,
        database: string,
        user: string,
        port: number,
        password: string
    })  {
        this.databaseKeys = keys;
    }

    protected abstract connect(keys: {
        client: string,
        host: string,
        database: string,
        user: string,
        port: number | string
    }): void;
    protected abstract query(query: string): Promise<any>;
    public abstract getAll(table: string): Promise<any[]>;
    public abstract get(table: string, id: number | string): Promise<any>;
    public abstract create(table: string, data: any): Promise<any>;
    public abstract delete(table: string, id: number | string): Promise<any>;
    public abstract update(table: string, data: any): Promise<any>;

}