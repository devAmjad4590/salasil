const db = {
    filters:{

    }
}

export function get () {
    return db;
}

export function set (newData: Partial<DB>) {
    for (const key in newData) {
        // @ts-ignore
        const el = db[key];
        // @ts-ignore
        const newEl = newData[key];

        if (el && typeof el === 'object' && typeof newEl === 'object') {
            // @ts-ignore
            db[key] = {
                ...el,
                ...newEl
            };
        }
    }

}

export interface DB {
    filters: {
        [key: string]: string;
    };
}

