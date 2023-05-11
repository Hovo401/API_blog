import dp from './bd';

class db_users {
    async getUserByNikName(nickname: string): Promise<any> {
        const query = await
            dp.query(`select * from users where nickname = $1`, [nickname]);
        return query.rows[0];
    }
    async getUserById(id: number): Promise<any> {
        const query = await
            dp.query(`select * from users where id = $1`, [id]);
        return query.rows[0];
    }
    async getUsers(): Promise<any> {
        const query = await
            dp.query(`select id, nickname from users;`);
        return query.rows;
    }


    async createUser(nickname: string, hashPassword: string): Promise<any> {
        const query = await
            dp.query(`INSERT INTO users (nickname, hashpassword) values ($1, $2) RETURNING *`, [nickname, hashPassword]);
        return query.rows[0];
    }
}

export default new db_users();
