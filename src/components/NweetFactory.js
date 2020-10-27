import { dbService, storageService } from '../fbase'
import React, { useState } from 'react'

const NweetFactory = ({ user }) => {
  const [nweet, setNweet] = useState('')
  const [image, setImage] = useState()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let imageUrl = null

      if (image) {
        const fileRef = storageService
          .ref()
          .child(`${user.uid}/${Date.now().toString()}`)
        const response = await fileRef.putString(image, 'data_url')
        imageUrl = await response.ref.getDownloadURL()
      }

      await dbService.collection('nweets').add({
        text: nweet,
        createdAt: Date.now(),
        creatorId: user.uid,
        imageUrl
      })
      setNweet('')
      setImage(null)
    } catch (err) {
      console.log(err)
      alert(err.message)
    }
  }

  const onChange = (event) => {
    setNweet(event.target.value)
  }

  const onFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      setImage(finishedEvent.currentTarget.result)
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => setImage(null)

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        value={nweet}
        placeholder="What's on your mind?"
        maxLength={120}
        onChange={onChange}
      />
      <input type='file' accept='image/*' onChange={onFileChange} />
      <input type='submit' value='Nweet' />
      {image && (
        <div>
          <img alt='attachment' src={image} width='50px' />
          <button onClick={clearImage}>Clear</button>
        </div>
      )}
    </form>
  )
}

export default NweetFactory
