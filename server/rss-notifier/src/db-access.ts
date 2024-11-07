import { FeedObj } from './types.js';
import * as dotenv from 'dotenv';
import * as mysql from 'mysql2/promise';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

export const selectAllRss = async (): Promise<FeedObj[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(`SELECT id, rss_url FROM ${process.env.DB_TABLE} LIMIT 10`);
        
        return rows;
    } catch (err) {
        console.log(err);
        return [];
    } finally{
        if(connection){
            connection.release();
        }
    }
}

// feed 에 전달할 데이터들을 받아서 DB에 저장하는 함수
export const insertFeeds = async (rss: string, pubDate: string, title: string, link: string, thumbnail: string) => {
    let connection;
    // 전달받은 데이터 배열들을 순회
    // 데이터들을 활용해서 DB에 저장하는 쿼리문을 작성
    // or
    // 데이터들을 활용해서 DB에 저장하는 로직이 있는 API를 

}