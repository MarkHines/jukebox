import db from "#db/client";

export const createTrack = async (name, durationMs) => {
  console.log(`CREATING TRACK`)
  const sql = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const {rows:[createdTrack]} = await db.query(sql,[name, durationMs]);
  //console.log(createdTrack);
  return createdTrack;
}

export const getAllTracks = async() => {
  const sql = `
    SELECT * FROM tracks;
  `;
  const {rows: allTracks} = await db.query(sql)
  //console.log(allTracks)
  return allTracks
}

export const getTrackById = async (id) => {
  const sql = `
    SELECT * FROM tracks WHERE id = $1
  `;
  const {rows: [selectedTrack]} = await db.query(sql,[id]);
  //console.log(selectedTrack);
  return selectedTrack;
}

export const getTracksByPlaylists = async (playlistId) => {
  const sql = `
    SELECT track_id 
    FROM playlists_tracks 
    JOIN tracks ON playlists_tracks.track_id = tracks.id 
    WHERE playlist_id = $1;
  `;
  const { rows: tracks } = await db.query(sql, [playlistId]);
  //console.log(tracks);
  return tracks;
}
