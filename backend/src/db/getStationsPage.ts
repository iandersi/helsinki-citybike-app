import {Station} from "../data/Station";
import {StationsPage} from "../data/StationsPage";

export async function getStationsPage(id: number, pool: any){
    let conn;
    try {
        conn = await pool.getConnection();
        const stationsNext = await conn.query("SELECT * FROM stations WHERE fid >= ? ORDER BY fid ASC LIMIT 21", [id]) as Station[];

        const nextPageMinId = Math.min(...stationsNext.map(id => id.fid));
        const stationsPrev = await conn.query("SELECT * FROM stations WHERE fid <= ? ORDER BY fid DESC LIMIT 21", [nextPageMinId]) as Station[];

        const prevPageId = Math.min(...stationsPrev.map(id => id.fid));
        const nextPageId = Math.max(...stationsNext.map(id => id.fid));

        const isPrevPage = !!stationsPrev[20];
        const isNextPage = !!stationsNext[20];

        const stations = stationsNext.slice(0, 20);
        return {content: stations, prevPageId: prevPageId, nextPageId: nextPageId, prev: isPrevPage, next: isNextPage} as StationsPage;

    } catch (err) {
        console.log(err);
    } finally {
        if (conn) await conn.end();
    }
}