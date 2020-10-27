import Nweet from 'components/Nweet'
import { dbService } from 'fbase'
import React, { useEffect, useState } from 'react'

const Home = ({ user }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await dbService.collection('nweets').add({
        text: nweet,
        createdAt: Date.now(),
        creatorId: user.uid
      })
      setNweet('')
    } catch (err) {
      alert(err.message)
    }
  }

  const onChange = (event) => {
    setNweet(event.target.value)
  }

  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshot) => {
      let newNweets = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })

      setNweets(newNweets)
    })
  }, [])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={nweet}
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type='submit' value='Nweet' />
      </form>
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
