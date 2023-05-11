import db from './bd';


class Db_posts {
    async getPosts(start: number = 0, max: number = Infinity): Promise<any> {
        const query = await
            db.query(`SELECT * FROM posts LIMIT $1 OFFSET $2;`, [max, start]);
       return query.rows;
    }
    async getPostByPost_id(post_id: number): Promise<any> {
        const query = await
            db.query(`SELECT * FROM posts WHERE post_id = $1 `, [post_id]);
       return query.rows[0];
    }
    async getPostsByUser_id(user_id: number): Promise<any> {
        const query = await
            db.query(`SELECT * FROM posts WHERE user_id = $1 `, [user_id]);
       return query.rows;
    }


    async createPost(user_id: number, message: string, media_message: string = ''): Promise<any> {
        const query = await
            db.query(`INSERT INTO posts (user_id, message, media_message) values ($1, $2, $3) RETURNING *`, [user_id, message, media_message]);
        return query.rows;
    }
    async deletePost(post_id: number): Promise<any> {
        const query = await
            db.query(`DELETE FROM posts WHERE post_id = $1`, [post_id]);
        return query.rows;
    }
    async updatePost(post_id: number, message: string, media_message: string = ''): Promise<any> {
        const query = await
            db.query(`UPDATE posts SET message = $2, media_message = $3 WHERE post_id = $1`, [post_id, message, media_message]);
        return query.rows;
    }
}
export default new Db_posts();