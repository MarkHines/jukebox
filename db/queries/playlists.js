import db from "#db/client";

export const createPlaylist = async (name, description) => {
  //console.log(`CREATING PLAYLIST`)
  const sql = `
    INSERT INTO playlists (name, description)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const { rows: [ createdPlaylist] } = await db.query(sql,[name, description]);
  //console.log(createdPlaylist);
  return createdPlaylist
}

export const getAllPlaylists = async () => {
  const sql = `
    SELECT * FROM playlists;
  `;
  const {rows: allPlaylists} = await db.query(sql)
  //console.log(allPlaylists)
  return allPlaylists
}

export const getPlaylistById = async (id) => {
  const sql = `
    SELECT * FROM playlists WHERE id = $1
  `;
  const {rows: [ selectedPlaylist ] } = await db.query(sql, [id]);
  //console.log(selectedPlaylist);
  return selectedPlaylist;
}