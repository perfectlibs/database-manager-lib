import ConnectionDatabase from './clients/Connection';
import MongoConnection from './clients/MongoConnection';
import MysqlConnection from './clients/MysqlConnection';
import PostgresqlConnection from './clients/PostgresqlConnection';

export default class DatabaseClient {
    private database!: ConnectionDatabase;

    /**
     * @param keys
     * Here you can define your database client.
     * 
     * Using the client key.
     * 
     * By default we use mysql databse.
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
        client: string,
        host: string,
        database: string,
        user: string,
        port: number,
        password: string
    }) {
        this.setDatabaseClient(keys);
    }

    private setDatabaseClient(keys: {
        client: string,
        host: string,
        database: string,
        user: string,
        port: number,
        password: string
    }): void {
        switch(keys.client) {
            case 'postgres':
            case 'postgresql':
                this.database = new PostgresqlConnection(keys);
                break;

            case 'mongo':
            case 'mongodb':
                this.database = new MongoConnection(keys);
                break;

            case 'mariadb':
            case 'mysql':
            default:
                this.database = new MysqlConnection(keys);
        }
    }

    public async getAll(table: string): Promise<any[]> {
        return await this.database.getAll(table);
    }

    public async get(table: string, id: number | string): Promise<any> {
        return await this.database.get(table, id);
    }

    public async create(table: string, data: any): Promise<any> {
        return await this.database.create(table, data);
    }

    public async delete(table: string, id: number | string): Promise<any> {
        return await this.database.delete(table, id);
    }

    public async update(table: string, data: any): Promise<any> {
        return await this.database.update(table, data);
    }

}
