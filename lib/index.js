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
exports.DatabaseClient = void 0;
const MongoConnection_1 = __importDefault(require("./clients/MongoConnection"));
const MysqlConnection_1 = __importDefault(require("./clients/MysqlConnection"));
const PostgresqlConnection_1 = __importDefault(require("./clients/PostgresqlConnection"));
const processData_1 = require("./functions/processData");
class DatabaseClient {
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
    constructor(keys) {
        this.databaseManager = new DatabaseManager(keys);
    }
    setKeyTables(idTables) {
        processData_1.setIdTables(idTables);
        return this.databaseManager;
    }
}
exports.DatabaseClient = DatabaseClient;
class DatabaseManager {
    constructor(keys) {
        switch (keys.client) {
            case 'postgres':
            case 'postgresql':
                this.database = new PostgresqlConnection_1.default(keys);
                break;
            case 'mongo':
            case 'mongodb':
                this.database = new MongoConnection_1.default(keys);
                break;
            case 'mariadb':
            case 'mysql':
            default:
                this.database = new MysqlConnection_1.default(keys);
        }
    }
    getAll(table) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.getAll(table);
        });
    }
    get(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.get(table, id);
        });
    }
    create(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.create(table, data);
        });
    }
    delete(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.delete(table, id);
        });
    }
    update(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.update(table, data);
        });
    }
}
