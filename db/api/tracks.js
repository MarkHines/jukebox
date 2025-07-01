import express from 'express';

const tracksRouter = express.Router();
export default tracksRouter;

import { getAllTracks, getTrackById } from '#db/queries/tracks';

tracksRouter.get(`/`, async (request, response) => {
  const allTracks = await getAllTracks()
  //console.log(allTracks)
  response.send(allTracks)
})

tracksRouter.get(`/:id`, async (request, response) => {
  const { id } = request.params;
  if(/\D/.test(id)) {
    response.status(400).send(`NOT A NUMBER`)
  } 
  
  const selectedTrack = await getTrackById(id);
  if (!selectedTrack) {
    response.status(404).send(`INCORRECT TRACK ID`);
  } else {
    response.send(selectedTrack)
  }
})

