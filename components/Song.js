import { useRecoilState} from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

export default function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    }).catch((err) => {});
  }

  return (
    <div className="
      grid grid-cols-2 
      text-green-600 
      py-4 px-5 
      hover:bg-gray-900 
      roundend-lg
      cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <img 
          className="
          sm:max-w-[15rem]
          lg:max-w-[20rem]
          md:inline-flex 
          w-12 h-12 rounded-full
          "
          src={track.track.album.images[0].url} 
          alt="track album" 
        />
        <div>
          <p className="w-20 md:w-36 lg:w-64 text-white truncate">
            {track.track.name}
          </p>
          <p className="w-20 lg:w-40">
            {track.track.artists[0].name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">
          {track.track.album.name}
        </p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}