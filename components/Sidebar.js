import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

export default function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div
      className="
      h-screen 
      overflow-y-scroll 
      border-r 
      border-gray-900 
      p-5
      text-xs
      text-gray-500
      scrollbar-hide
      lg:text-sm
      sm:max-w-[12rem]
      lg:max-w-[15rem]
      md:inline-flex 
      pb-36"
    >
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-green-500">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-green-500">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist */}
        {playlists.map((playlist) => (
          <p 
            key={playlist.id} 
            className="cursor-pointer hover:text-green-500"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}
