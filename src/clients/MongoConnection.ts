import { MongoClient } from 'mongodb';
import ConnectionDatabase from "./Connection";

export default class MongoConnection extends ConnectionDatabase {

    protected poolDatabase!: MongoClient;

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

    protected async connect(): Promise<void> {
        this.poolDatabase = new MongoClient(`mongodb://${this.databaseKeys.user}:${this.databaseKeys.password}@${this.databaseKeys.host}:${this.databaseKeys.port}`, { useUnifiedTopology: true });
        await this.poolDatabase.connect();
    }

    protected query(collection: string): any {
        return this.poolDatabase.db(this.databaseKeys.database).collection(collection);
    }

    public async getAll(table: string): Promise<any[]> {
        return await this.query(table).find().toArray();
    }

    public async get(table: string, id: number | string): Promise<any> {
        return (await this.query(table).find({ id: id }).toArray())[0];
    }

    public async create(table: string, data: any): Promise<any> {
        return (await this.query(table).insertOne(data)).ops[0];
    }

    public async delete(table: string, id: number | string): Promise<any> {
        return (await this.query(table).findOneAndDelete({ id: id })).value;
    }

    public async update(table: string, data: any): Promise<any> {
        return (await this.query(table).findOneAndUpdate({ id: data.id }, { $set: data })).value;
    }

}