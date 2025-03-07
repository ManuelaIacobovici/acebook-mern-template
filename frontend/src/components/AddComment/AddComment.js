import React, { useState } from 'react'
import './AddComment.css';

const AddComment = ({ post, onPostAdded }) => {
  const [comment, setComment] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

      if (token) {
        const response = await fetch(`/posts/${post._id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            $push: {
              comments: {
                comment: comment,
                author: window.localStorage.getItem('username'),
              }
            },
          })
        })
        console.log(response)
        if (response.status !== 200) {
          console.log("oops")
        } else {
          console.log("yay!")
          let data = await response.json()
          console.log(`token = ${data.token}`)
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"));
          setComment("");
          onPostAdded();
        }
      }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input data-cy="comment" className="input-field" 
          placeholder='Comment' id="comment" type='text' 
          value={comment} onChange={handleCommentChange}
        />
        <input data-cy="submit" className="input-button" 
          role='submit-button' id='submit-comment' 
          type="submit" value="Add comment"
        />
      </form>
    </>
  )
}

export default AddComment
