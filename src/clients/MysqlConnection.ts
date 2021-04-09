import { createPool, Pool, PoolConfig, QueryFunction } from 'mysql';
import { promisify } from 'util';
import ConnectionDatabase from './Connection';
import  { getIdDB, getUpdateText,getValueText, toArray } from '../functions/processData';

export default class MysqlConnection extends ConnectionDatabase {

    protected poolDatabase!: Pool;

    constructor(keys: {
        host: string,
        database: string,
        user: string,
        port: number,
        password: string
    }) {
        super(keys);
        this.connect();
    }

    protected connect(): void {
        this.poolDatabase = createPool(this.databaseKeys as PoolConfig);
        this.poolDatabase.query = promisify(this.poolDatabase.query) as unknown as QueryFunction;
    }

    protected async query(queryString: string, data: any[] = []): Promise<any> {
        return await this.poolDatabase.query(queryString, data);
    }

    public async getAll(table: string): Promise<any> {
        return await this.query(`SELECT * FROM ${table};`);
    }

    public async get(table: string, id: number | string): Promise<any> {
        return (await this.query(`SELECT * FROM ${table} WHERE ${getIdDB(table)} = ?;`, [id]))[0];
    }

    public async create(table: string, data: any): Promise<any> {
        return (await this.query(`INSERT INTO ${table} ${getValueText(table, data, 'mysql')} RETURNING *;`, toArray(table, data)))[0];
    }

    public async delete(table: string, id: number | string): Promise<any> {
        return (await this.query(`DELETE FROM ${table} WHERE ${getIdDB(table)} = ? RETURNING *;`, [id]))[0];
    }

    public async update(table: string, data: any): Promise<any> {
        await this.query(`UPDATE ${table} SET ${getUpdateText(table, data, 'mysql')};`, toArray(table, data));
        return await this.get(table, data.id);
    }

}



