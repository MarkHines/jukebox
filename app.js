import express from "express";
const app = express();
export default app;
import tracksRouter from "#db/api/tracks";
import playlistsRouter from "#db/api/playlists";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/`, (request, response) => {
  response.send(`JukeBox API`)
})

app.use(`/tracks`, tracksRouter)

app.use(`/playlists`, playlistsRouter)

app.use((error, request, response, next) => {
  if(error.code === `23503` || `23505`){
    return response.status(400).send(error.error)
  }

  next(error)
})