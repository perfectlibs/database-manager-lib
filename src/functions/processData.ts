export const getIdDB = (table: string): string => {
    switch (table) {
        default:
            return 'id';
    }
}

export const getValueText = (table: string, data: { [x: string]: any; }, databaseType: string = 'mysql'): string => {
    let query: string = '(';
    let primaryKey: string = '';
    for(let key in data) {
        if(key != getIdDB(table)) {
            query += `${key}, `;
        } else {
            primaryKey = key;
        }
    }
    query += `${primaryKey}`;
    query += ') VALUES(';
    let array: any[] = toArray(table, data);
    for(let i: number = 1; i <= array.length; i++) {
        switch(databaseType) {
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
}

export const getUpdateText = (table: string, data: { [x: string]: any; }, databaseType: string = 'mysql'): string => {
    let query: string = '';
    let i: number = 1;
    for(let key in data) {
        if(key != getIdDB(table)) {
            query += `${key} = `;
            switch(databaseType) {
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
    query += ` WHERE ${getIdDB(table)} = `;
    switch(databaseType) {
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
}

export const toArray = (table: string, data: { [x: string]: any }): any[] => {
    let array: any[] = [];
    let primaryKey: string = '';
    for(let key in data) {
        if(key != getIdDB(table)) {
            array.push(data[key]);
        } else {
            primaryKey = key;
        }
    }
    array.push(data[primaryKey]);
    return array;
}