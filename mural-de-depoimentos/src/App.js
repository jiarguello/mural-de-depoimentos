import * as S from './css/S.App';
import orkut from './images/orkut.png';
import React, { useState, useEffect } from 'react';
import socket from './utils/socket';

function App() {
  const [posts, setPosts] = useState([{ User: '', Post: '' }]);
  const [newPost, setNewPost] = useState({ User: '', Post: '' });

  const handleChange = ({ target: { name, value } }) => {
    setNewPost((current) => ({ ...current, [name]: value }));
  }

  useEffect(() => {
    socket.on('initialPosts', (allPosts) => {
      setPosts(allPosts);
    })
  })

  useEffect(() => {
    socket.on('updatePosts', (updatePosts) => {
      setPosts(updatePosts);
    })
  }, [posts]);

  const sendPost = () => {
    socket.emit('insertPost', newPost);
    setNewPost((current) => ({ ...current, Post: '' }));
  }

  return (
    <S.Main>
      <S.Img src={orkut} alt="" />
      <section>
        { posts.map(({ User, Post }) => (
          <div key={`${User} enviou: ${Post}`}>
            <p>Usuário: { User }</p>
            <p>Mensagem: { Post }</p>
          </div>
        )) }
      </section>
      <form>
        <input
          type="text"
          name="User"
          onChange={ handleChange }
          value={newPost.User}
        />
        <input
          type="text"
          name="Post"
          onChange={ handleChange }
          value={newPost.Post}
        />
      </form>
      <button
        type="button"
        onClick={ sendPost }
      >Enviar</button>
    </S.Main>
  );
}

export default App;
