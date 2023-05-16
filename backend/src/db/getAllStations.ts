import {Station} from "../data/Station";

export async function getAllStations(pool: any){
    let conn;
    try {
        conn = await pool.getConnection();
        const stationArray = await conn.query("SELECT * FROM stations") as Station[];
        return stationArray;
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) await conn.end();
    }
}