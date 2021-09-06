class DB {
    constructor(db) {
        this.db = db;
    }


    async getDevices() {
        let query = "SELECT * FROM devices";
        return this.doQuery(query)
    }

    // async getUserById(array) {
    //     let query = "SELECT * FROM asimov_users WHERE id = ?";
    //     return this.doQueryParams(query, array);
    // }


    // CORE FUNCTIONS DON'T TOUCH
    async doQuery(queryToDo) {
        let pro = new Promise((resolve,reject) => {
            let query = queryToDo;
            this.db.query(query, function (err, result) {
                if (err) throw err; // GESTION D'ERREURS
                resolve(result);
            });
        })
        return pro.then((val) => {
            return val;
        })
    }
    async doQueryParams(queryToDo, array) {
        let pro = new Promise((resolve,reject) => {
            let query = queryToDo;
            this.db.query(query, array, function (err, result) {
                if (err) throw err; // GESTION D'ERREURS
                resolve(result);
            });
        })
        return pro.then((val) => {
            return val;
        })
    }
}