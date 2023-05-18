import React, { useEffect, useState } from 'react';
import likedThumbsUp from '../../images/likedThumbsUp.png';
import unLikedThumbsUp from '../../images/unlikedThumbsUp.png';

const Likes = ({ parent }) => {

  const [username, setUsername] = useState(window.localStorage.getItem('username'));
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleButtonClick = async (event) => {
    event.preventDefault();
    // todo: update this to `/posts/like_${parent.type}`
    const response = await fetch('/posts/likes', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: {
        'id': parent._id,
      }
    })
    if (response.status !== 200) { console.log("could not add like") }
    else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      // setToken(window.localStorage.getItem("token"))
    }
  }

  const userHasLiked = (likers) => {
    likers.forEach((liker) => {
      console.log(liker)
      if (liker.username === username) { return true }
    })
  }

  let likeEmoji 

  if(userHasLiked(parent.likes)){
    likeEmoji = <img src={likedThumbsUp} alt="thumbs up liked emoji" />
    // likeEmoji = <img src={"./images/thumbsUpLikedEmoji.png"} alt="thumbs up liked emoji" />
  } else {
    likeEmoji = <img src={unLikedThumbsUp} alt="thumbs up unliked emoji" onClick={handleButtonClick}/>
    // likeEmoji = <img src={"./images/thumbsUpUnLikedEmoji.png"} alt="thumbs up unliked emoji" onClick={handleButtonClick}/>
  }

  return(
    <div className="likes">
      <div id="like-count"> {parent.likes.length} likes </div>
      <button id="like-button" >{ likeEmoji }</button> 
    </div>
  )
}

export default Likes;