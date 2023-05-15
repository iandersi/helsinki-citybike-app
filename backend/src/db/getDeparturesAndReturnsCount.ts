
export async function getDeparturesAndReturnsCount(stationId: number, pool: any) {
    let conn;
    try {
        conn = await pool.getConnection();
        const departures = await conn.query("SELECT COUNT(id) as departures_count FROM journeys WHERE departure_station_id = ?", [stationId]);
        const returns = await conn.query("SELECT COUNT(id) as returns_count FROM journeys WHERE return_station_id = ?", [stationId]);
        console.log("dep", departures, "ret", returns);
        const departureInt = Number(departures[0].departures_count);
        const returnsInt = Number(returns[0].returns_count)
        return [departureInt, returnsInt] as [number, number];
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) await conn.end();
    }
}