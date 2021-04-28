import React, { useState } from 'react';
import './App.css';

function App() {
  const 
    [btnLabel, setBtnLabel] = useState('Load'),
    [rangeValue, setRangeValue] = useState(1),
    [howMany, setHowMany] = useState('How Many?'),
    [userData, setUserData] = useState([])

  const FetchUser = ({ Quantity }) => fetch(`https://randomuser.me/api/?results=${Quantity}`)
    .then(response => response.json())
    .then(Value => { setUserData(Value.results) })

  const OnClickHandler = ({ target }) => {
    FetchUser({ Quantity: rangeValue })
    setBtnLabel('Load More')
  }

  const OnChangeHandler = ({ target }) => {
    setRangeValue(target.value)
    setHowMany(target.value + ' User(s)')
  }

  const DisplayUserData = ({ UserData }) => {

    const Users = []
    
    UserData.map(User => {
      const
        name = User.name.first + ' ' + User.name.last,
        picture = User.picture.large,
        age = User.dob.age,
        gender = User.gender,
        phone = User.phone,
        email = User.email

      Users.push(
        <figure key={UserData.indexOf(User)} className="user-card">
          <span><img loading="lazy" src={picture} alt={name} /></span>
          <h3>{name}</h3>
          <p>{age} / {gender}</p>
          <p className="contact-info"><a href={'tel:' + phone} title={'Phone:' + phone}>☎️</a> <a href={'mailto:' + email} title={'Email: ' + email}>📧</a></p>
        </figure>
      )
    })
    return Users
  }

  return (
    <main>
      <h1 style={{ display: 'none' }}>React Random User Generator</h1>
      <section id="Creator">
        <div>
          <h1><span>👤</span><br />User Generator</h1>
        </div>
        <button id="NewUser" onClick={OnClickHandler}>{btnLabel}</button>
        <label htmlFor="Quantity">{howMany}</label>
        <input type="range" id="Quantity" placeholder="1" value={rangeValue} onChange={OnChangeHandler} min="1" max="1000" title="Generates 1 by default. The maximum that can be generated is 1000 users." step="1" />
      </section>
      <section id="UserContainer">
        {userData.length ? DisplayUserData({ UserData:userData }).map(User=>User) : ''}
      </section>
    </main>
  )
}

export default App;