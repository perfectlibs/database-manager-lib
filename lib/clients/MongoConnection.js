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
const mongodb_1 = require("mongodb");
const Connection_1 = __importDefault(require("./Connection"));
class MongoConnection extends Connection_1.default {
    constructor(keys) {
        super(keys);
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.poolDatabase = new mongodb_1.MongoClient(`mongodb://${this.databaseKeys.user}:${this.databaseKeys.password}@${this.databaseKeys.host}:${this.databaseKeys.port}`, { useUnifiedTopology: true });
            yield this.poolDatabase.connect();
        });
    }
    query(collection) {
        return this.poolDatabase.db(this.databaseKeys.database).collection(collection);
    }
    getAll(table) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.query(table).find().toArray();
        });
    }
    get(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.query(table).find({ id: id }).toArray())[0];
        });
    }
    create(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.query(table).insertOne(data)).ops[0];
        });
    }
    delete(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.query(table).findOneAndDelete({ id: id })).value;
        });
    }
    update(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.query(table).findOneAndUpdate({ id: data.id }, { $set: data })).value;
        });
    }
}
exports.default = MongoConnection;
