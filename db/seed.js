import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
import { playlistsTracks } from "./queries/playlistsTracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {

  // CREATING PLAYLISTS
  for(let i = 0; i < 10; i++) {
    await createPlaylist(faker.music.album(), faker.lorem.sentence());
  }

  console.log(`PLAYLIST CREATED`)

  for(let i = 0; i < 20; i++) {
    await createTrack(faker.music.songName(), Math.floor(Math.random()* 10));
  }

  console.log(`TRACKS CREATED`);

  for(let i = 0; i < 3; i++) {
    await playlistsTracks(1, i + 1)
  }

  for(let i = 0; i < 3; i++) {
    await playlistsTracks(3, i + 1)
  }

  for(let i = 0; i < 3; i++) {
    await playlistsTracks(5, i + 1)
  }

  for(let i = 0; i < 3; i++) {
    await playlistsTracks(7, i + 1)
  }
  
  for(let i = 0; i < 3; i++) {
    await playlistsTracks(9, i + 1)
  }
}
