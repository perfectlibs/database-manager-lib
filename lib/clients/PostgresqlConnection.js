"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const Connection_1 = __importDefault(require("./Connection"));
const processData_1 = require("../functions/processData");
class PostgresqlConnection extends Connection_1.default {
    constructor(keys) {
        super(keys);
        this.connect();
    }
    connect() {
        this.poolDatabase = new pg_1.Pool(this.databaseKeys);
        this.poolDatabase.connect();
    }
    query(queryString, data = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.poolDatabase.query(queryString, data)).rows;
        });
    }
    getAll(table) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.query(`SELECT * FROM ${table};`);
        });
    }
    get(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.query(`SELECT * FROM ${table} WHERE ${processData_1.getIdDB(table)} = $1;`, [id]))[0];
        });
    }
    create(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.query(`INSERT INTO ${table}${processData_1.getValueText(table, data, 'postgresql')} RETURNING *;`, processData_1.toArray(table, data)))[0];
        });
    }
    delete(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.query(`DELETE FROM ${table} WHERE ${processData_1.getIdDB(table)} = $1 RETURNING *;`, [id]))[0];
        });
    }
    update(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.query(`UPDATE ${table} SET ${processData_1.getUpdateText(table, data, 'postgresql')} RETURNING *;`, processData_1.toArray(table, data)))[0];
        });
    }
}
exports.default = PostgresqlConnection;
