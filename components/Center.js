import { LogoutIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

export default function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => {})
  }, [spotifyApi, playlistId])

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="
          flex 
          cursor-pointer 
          items-center
          space-x-3
          rounded-full 
          bg-emerald-700 
          p-1
          pr-2
          text-white
          opacity-90
          hover:opacity-80"
          onClick={signOut}
        >
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt="Image User"
          />
          <h2>{session?.user.name}</h2>
          <LogoutIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`
        flex 
        items-end 
        space-x-7 
        bg-gradient-to-b to-black ${color}
        p-8
        h-80
        text-white
        `}
      >
        <img 
          className="
            sm:max-w-[11rem]
            lg:max-w-[13rem]
            md:inline-flex   
            hidden rounded-2xl"
          src={playlist?.images?.[0]?.url} 
          alt="Image Playlist" 
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  )
}
