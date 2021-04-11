"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = exports.getUpdateText = exports.getValueText = exports.getIdDB = exports.setIdTables = void 0;
let primaryKeyTables;
const setIdTables = (idTables) => {
    primaryKeyTables = idTables;
};
exports.setIdTables = setIdTables;
const getIdDB = (table) => {
    for (let primaryKey of primaryKeyTables) {
        if (primaryKey.table === table) {
            return primaryKey.primaryKey;
        }
    }
    return '';
};
exports.getIdDB = getIdDB;
const getValueText = (table, data, databaseType = 'mysql') => {
    let query = '(';
    let primaryKey = '';
    for (let key in data) {
        if (key != exports.getIdDB(table)) {
            query += `${key}, `;
        }
        else {
            primaryKey = key;
        }
    }
    query += `${primaryKey}`;
    query += ') VALUES(';
    let array = exports.toArray(table, data);
    for (let i = 1; i <= array.length; i++) {
        switch (databaseType) {
            case 'postgres':
            case 'postgresql':
                query += `$${i}`;
                break;
            case 'mariadb':
            case 'mysql':
                query += '?';
                break;
            default:
        }
        query += ', ';
    }
    query = query.substring(0, query.length - 2) + ')';
    return query;
};
exports.getValueText = getValueText;
const getUpdateText = (table, data, databaseType = 'mysql') => {
    let query = '';
    let i = 1;
    for (let key in data) {
        if (key != exports.getIdDB(table)) {
            query += `${key} = `;
            switch (databaseType) {
                case 'postgres':
                case 'postgresql':
                    query += `$${i}`;
                    break;
                case 'mariadb':
                case 'mysql':
                    query += '?';
                    break;
                default:
            }
            query += ', ';
            i++;
        }
    }
    query = query.substring(0, query.length - 2);
    query += ` WHERE ${exports.getIdDB(table)} = `;
    switch (databaseType) {
        case 'postgres':
        case 'postgresql':
            query += `$${i}`;
            break;
        case 'mariadb':
        case 'mysql':
            query += '?';
            break;
        default:
    }
    return query;
};
exports.getUpdateText = getUpdateText;
const toArray = (table, data) => {
    let array = [];
    let primaryKey = '';
    for (let key in data) {
        if (key != exports.getIdDB(table)) {
            array.push(data[key]);
        }
        else {
            primaryKey = key;
        }
    }
    array.push(data[primaryKey]);
    return array;
};
exports.toArray = toArray;
