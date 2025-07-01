import db from "#db/client";

export const playlistsTracks = async (playlistId, trackId) => {
  //console.log(`creating playlists tracks`)
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const { rows: playlistAndTrack } = await db.query(sql,[playlistId, trackId]);
  //console.log(playlistAndTrack);
  return playlistAndTrack;
}