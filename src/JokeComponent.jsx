import { useState, useEffect } from 'react';
import './App.css';

const JokeComponent = () => {
  const [setup, setSetup] = useState('');
  const [punchline, setPunchline] = useState('');
  const [showPunchline, setShowPunchline] = useState(false); 
  const [jokeFetched, setJokeFetched] = useState(false); 

  const fetchJoke = async () => {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    const data = await response.json();
    console.log(data)
    if (data.setup) {
      setSetup(data.setup);
      setPunchline(data.delivery);
    } else {
      setSetup('');
      setPunchline(data.joke);
    }
    setShowPunchline(false); 
    setJokeFetched(true); 
  };

  const handleShowPunchline = () => {
    setShowPunchline(true); 
  };

  useEffect(() => {
    fetchJoke(); 
  }, []);

  return (
    <div className="joke-container">
      <h2>Joke of the Moment</h2>
      {jokeFetched ? ( 
        <>
          <p className={`joke`}>{setup}</p> 
          
          {showPunchline && <p className={`joke`}>{punchline}</p>} 
          
          {!showPunchline && ( 
            <button className="joke-button" onClick={handleShowPunchline}>Reveal Punchline</button>
          )}
          
          {showPunchline && ( 
            <button className="joke-button" onClick={fetchJoke}>Get Another Joke</button>
          )}
        </>
      ) : (
        <h1>loading</h1>
       
      )}
    </div>
  );
};

export default JokeComponent;
