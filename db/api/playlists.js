import express from 'express'
const playlistsRouter = express.Router();
export default playlistsRouter;

import { getAllPlaylists, getPlaylistById, createPlaylist } from '#db/queries/playlists';
import { getTracksByPlaylists, getTrackById } from '#db/queries/tracks';
import { playlistsTracks, getAllPlaylistsTracks } from '#db/queries/playlistsTracks';

playlistsRouter.get(`/`, async(request, response) => {
  const allPlaylists = await getAllPlaylists();
  response.send(allPlaylists)
});

playlistsRouter.post(`/`, async (request, response) => {
  //console.log(request.body)
  if(!request.body || !request.body.name || !request.body.description){
    response.status(400).send(`MISSING OR INCOMPLETE REQUEST BODY`);
  } else {
    const createdPlaylist = await createPlaylist(request.body.name, request.body.description);
    response.status(201).send(createdPlaylist);
  }
});

playlistsRouter.get(`/:id`, async (request, response) => {
  const { id } = request.params;
  if(/\D/.test(id)) {
    response.status(400).send(`NOT A NUMBER`)
  }
  const selectedPlaylist = await getPlaylistById(id);

  if(!selectedPlaylist) {
    response.status(404).send(`PLAYLIST DOES NOT EXISTS`);
  } else {
    response.send(selectedPlaylist)
  }
})

playlistsRouter.get(`/:id/tracks`, async (request, response) => {
  const { id } = request.params;
   if(/\D/.test(id)) {
    response.status(400).send(`NOT A NUMBER`)
   }

  const selectedPlaylist = await getPlaylistById(id)

  if(!selectedPlaylist) {
    response.status(404).send(`PLAYLIST DOES NOT EXISTS`)
  }

  const playlistTracks = await getTracksByPlaylists(id)
  if(!playlistTracks) {
    response.send(404).send(`PLAYLISTS DOES NOT EXISTS`)
  } else {
    response.send(playlistTracks)
  }
})

playlistsRouter.post(`/:id/tracks`, async ( request, response) => {
  //console.log(request.body)
  const { id } = request.params;
  if(/\D/.test(id) || !request.body || !request.body.trackId) {
    response.status(400).send(`INCOMPLETE REQUEST BODY`);
  }
  const trackId = request.body.trackId
  if(/\D/.test(trackId)) {
    response.status(400).send(`NOT A NUMBER`)
  }
  const selectedTrack = await getTrackById(trackId)
  //console.log(selectedTrack)
  if(!selectedTrack){ 
    response.status(400).send(`TRACK DOES NOT EXISTS`)
  }

  const selectedPlaylist = await getPlaylistById(id);
  if(!selectedPlaylist) {
    response.status(404).send(`PLAYLIST DOES NOT EXISTS`)
  } 
  const [ newPlaylistTrack ] = await playlistsTracks(id, trackId)
  response.status(201).send(newPlaylistTrack)
  
})