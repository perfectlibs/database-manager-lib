import { Pool, PoolConfig } from 'pg';
import ConnectionDatabase from "./Connection";
import { getIdDB, getUpdateText, getValueText, toArray } from '../functions/processData';

export default class PostgresqlConnection extends ConnectionDatabase {

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
        this.poolDatabase = new Pool(this.databaseKeys as PoolConfig);
        this.poolDatabase.connect();
    }

    protected async query(queryString: string, data: any[] = []): Promise<any[]> {
        return (await this.poolDatabase.query(queryString, data)).rows;
    }

    public async getAll(table: string): Promise<any[]> {
        return await this.query(`SELECT * FROM ${table};`);
    }

    public async get(table: string, id: number | string): Promise<any> {
        return (await this.query(`SELECT * FROM ${table} WHERE ${getIdDB(table)} = $1;`, [id]))[0];
    }

    public async create(table: string, data: any): Promise<any> {
        return (await this.query(`INSERT INTO ${table}${getValueText(table, data, 'postgresql')} RETURNING *;`, toArray(table, data)))[0];
    }

    public async delete(table: string, id: number | string): Promise<any> {
        return (await this.query(`DELETE FROM ${table} WHERE ${getIdDB(table)} = $1 RETURNING *;`, [id]))[0];
    }

    public async update(table: string, data: any): Promise<any> {
        return (await this.query(`UPDATE ${table} SET ${getUpdateText(table, data, 'postgresql')} RETURNING *;`, toArray(table, data)))[0];
    }

}