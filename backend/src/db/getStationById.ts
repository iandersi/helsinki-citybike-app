import {Station} from "../data/Station";

export async function getStationByStationId(stationId: number, pool: any){
    console.log(stationId);
    let conn;
    try {
        conn = await pool.getConnection();
        const stationArray = await conn.query("SELECT * FROM stations WHERE station_id = ?", [stationId]) as Station[];
        console.log(stationArray);
        return stationArray[0];
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) await conn.end();
    }
}