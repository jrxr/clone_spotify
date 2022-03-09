import useSpotify from "../hooks/useSpotify";
import { useState } from "react";
import { useSession } from 'next-auth/react';
import { useRecoilState} from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  return (
    <div>
      
      <div>
        <img src="" alt="" />
      </div>
    </div>
  )
}