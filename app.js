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