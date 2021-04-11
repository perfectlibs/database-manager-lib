export declare const setIdTables: (idTables: {
    table: string;
    primaryKey: string;
}[]) => void;
export declare const getIdDB: (table: string) => string;
export declare const getValueText: (table: string, data: {
    [x: string]: any;
}, databaseType?: string) => string;
export declare const getUpdateText: (table: string, data: {
    [x: string]: any;
}, databaseType?: string) => string;
export declare const toArray: (table: string, data: {
    [x: string]: any;
}) => any[];
