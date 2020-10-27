import { dbService, storageService } from '../fbase'
import React, { useState } from 'react'

const Nweet = ({ nweet, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweet.text)

  const onClickDelete = async () => {
    if (window.confirm('Are you sure?')) {
      await dbService.doc(`nweets/${nweet.id}`).delete()
      if (nweet.imageUrl) {
        await storageService.refFromURL(nweet.imageUrl).delete()
      }
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev)

  const onChange = (event) => {
    setNewNweet(event.target.value)
  }

  const onSumbit = async (event) => {
    event.preventDefault()
    await dbService.doc(`nweets/${nweet.id}`).update({
      text: newNweet
    })

    setEditing(false)
  }

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSumbit}>
            <input
              value={newNweet}
              onChange={onChange}
              maxLength={120}
              placeholder='Edit your Nweet...'
            />
            <input type='submit' value='Update Nweet' />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweet.text}</h4>
          {nweet.imageUrl && (
            <img
              alt='attachment'
              src={nweet.imageUrl}
              width='50px'
              height='50px'
            />
          )}
          {isOwner && (
            <>
              <button onClick={onClickDelete}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Nweet
