import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../Services/api';

import logo from '../../assets/logo.svg'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'
import './Dashboard.css';

export default function Dashboard({ match }) {
  const id = match.params.id;
  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: id
        }
      })
      
      setUsers(response.data);
    }
    loadUsers();
  }, [id])

  async function handleLike(devId) {
    await api.post(`devs/${devId}/like`, null, {
      headers: {
        user: id
      }
    })
    setUsers(users.filter(user => user._id !== devId))
  }
  async function handleDislike(devId) {
    await api.post(`devs/${devId}/dislike`, null, {
      headers: { user: id }
    })
    setUsers(users.filter(user => user._id !== devId))
  }

  return (
    <div className="container">
      <Link to="/">
        <img src={logo} alt="TinDev" />
      </Link>
      
      {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user._id}>
                <img src={user.avatar} alt = "Guilherme Rosa" />
                <footer>
                  <strong>{user.name}</strong>
                  <p>{user.bio}</p>
                </footer>
                <div className="buttons">
                  <button type="button" onClick={() => handleLike(user._id)}>
                    <img src={like} alt="Like"/>
                  </button>
                  <button type="button" onClick={() => handleDislike(user._id)}>
                    <img src={dislike} alt="Dislike"/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
            <div className="empty">Não há Devs para Match. :(</div>
        )}
    </div>
  );
}