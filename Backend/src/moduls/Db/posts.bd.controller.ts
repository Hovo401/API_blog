import db from './bd';


class Db_posts {
    async getPosts(start: number = 0, max: number = Infinity): Promise<any> {
        const query = await
            db.query(`SELECT posts.*, users.nickname
            FROM posts
            INNER JOIN users ON posts.user_id = users.id
            ORDER BY posts.post_id DESC
            OFFSET $2
            LIMIT $1`, [max, start]);
       return query.rows;
    }
    async getPostByPost_id(post_id: number): Promise<any> {
        const query = await
            db.query(`SELECT posts.*, users.nickname
            FROM posts
            INNER JOIN users ON posts.user_id = users.id
            WHERE posts.post_id = $1`, [post_id]);

       return query.rows[0];
    }
    async getPostsByUser_id(user_id: number): Promise<any> {
        const query = await
            db.query(`SELECT * FROM posts WHERE user_id = $1 `, [user_id]);
       return query.rows;
    }
    async getPostLength(){
        const query = await
            db.query(`SELECT COUNT(*) AS total_rows FROM posts;`);
       return query.rows;
    }


    async createPost(user_id: number, message: string, media_message: string = ''): Promise<any> {
        const query = await
            db.query(`INSERT INTO posts (user_id, message, media_message) values ($1, $2, $3) RETURNING *`, 
            [user_id, message, media_message]);
        return query.rows;
    }
    async deletePost(post_id: number): Promise<any> {
        const query = await
            db.query(`DELETE FROM posts WHERE post_id = $1`, [post_id]);
        return query.rows;
    }
    async updatePost({ post_id, message, media_message }: 
        { post_id: number, message?: string, media_message?: string }): Promise<any> {

        if(message && media_message){
            const query = await
            db.query(`UPDATE posts SET message = $2, media_message = $3 WHERE post_id = $1`, [post_id, message, media_message]);
            // return query.rows;
        }else if(message && !media_message){
            const query = await
            db.query(`UPDATE posts SET message = $2 WHERE post_id = $1 `, [post_id, message]);
            // return query.rows;
        }
        else if(!message && media_message){
            const query = await
            db.query(`UPDATE posts SET media_message = $2 WHERE post_id = $1 `, [post_id, media_message]);
            // return query.rows;
        }
        const result = await db.query(`SELECT * FROM posts WHERE post_id = $1`,[post_id]);
        return result.rows;
    }
}
export default new Db_posts();