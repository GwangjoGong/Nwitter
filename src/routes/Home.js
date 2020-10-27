import Nweet from '../components/Nweet'
import NweetFactory from '../components/NweetFactory'
import { dbService } from '../fbase'
import React, { useEffect, useState } from 'react'

const Home = ({ user }) => {
  const [nweets, setNweets] = useState([])

  useEffect(() => {
    let removeListner = dbService
      .collection('nweets')
      .onSnapshot((snapshot) => {
        let newNweets = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })

        setNweets(newNweets)
      })
    return () => {
      removeListner()
    }
  }, [])

  return (
    <div>
      <NweetFactory user={user} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweet={nweet}
            isOwner={user.uid === nweet.creatorId}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
