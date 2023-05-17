import {Journey} from "../data/Journey";
import {JourneysPage} from "../data/JourneysPage";

export async function getJourneysPage(id: number, pool: any, departureStationIdNumber?: number, returnStationNumber?: number){
    let conn;
    try {
        conn = await pool.getConnection();


        if (!departureStationIdNumber || !returnStationNumber) {
            const journeysNext = await conn.query("SELECT * FROM journeys WHERE id >= ? ORDER BY id ASC LIMIT 21", [id]) as Journey[];

            const nextPageMinId = Math.min(...journeysNext.map(id => id.id));
            const journeysPrev = await conn.query("SELECT * FROM journeys WHERE id <= ? ORDER BY id DESC LIMIT 21", [nextPageMinId]) as Journey[];

            const prevPageId = Math.min(...journeysPrev.map(id => id.id));
            const nextPageId = Math.max(...journeysNext.map(id => id.id));

            const isPrevPage = !!journeysPrev[20];
            const isNextPage = !!journeysNext[20];

            const journeys = journeysNext.slice(0, 20);
            return {content: journeys, prevPageId: prevPageId, nextPageId: nextPageId, prev: isPrevPage, next: isNextPage} as JourneysPage;
        }

        if (departureStationIdNumber && returnStationNumber){
            const journeysNext = await conn.query("SELECT * FROM journeys WHERE departure_station_id = ? AND return_station_id = ? ORDER BY id ASC LIMIT 21", [departureStationIdNumber, returnStationNumber]) as Journey[];

            const nextPageMinId = Math.min(...journeysNext.map(id => id.id));
            const journeysPrev = await conn.query("SELECT * FROM journeys WHERE id <= ? ORDER BY id DESC LIMIT 21", [nextPageMinId]) as Journey[];

            const prevPageId = Math.min(...journeysPrev.map(id => id.id));
            const nextPageId = Math.max(...journeysNext.map(id => id.id));

            const isPrevPage = !!journeysPrev[20];
            const isNextPage = !!journeysNext[20];

            const journeys = journeysNext.slice(0, 20);
            return {content: journeys, prevPageId: prevPageId, nextPageId: nextPageId, prev: isPrevPage, next: isNextPage} as JourneysPage;
        }

        if (departureStationIdNumber && !returnStationNumber || !departureStationIdNumber && returnStationNumber) {
            return undefined;
        }

    } catch (err) {
        console.log(err);
    } finally {
        if (conn) await conn.end();
    }
}
