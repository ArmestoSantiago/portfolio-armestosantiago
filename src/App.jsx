import { useEffect, useState } from 'react';
import { CvIncon, DownloadArrow, ExternalArrow, GitHubIcon, HammerIcon, LinkedinIcon, LocationIcon, MailIcon } from './components/icons';
import TEXT_ES from './assets/TEXT_ES.json';
import TEXT_EN from './assets/TEXT_EN.json';
import { Tecnologies } from './components/Tecnologies';
import { getWeatherAndCity } from './services/getWeatherAndCity';
import './style.css';

export function App() {

  const [language, setLanguage] = useState(true);
  const [lightsOn, setLightsOn] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(false);
  const [city, setCity] = useState(null);
  const [temp, setTemp] = useState(null);
  const [weather, setWeather] = useState(null);
  const texts = language ? TEXT_EN : TEXT_ES;

  const handleChangeLanguage = () => {
    setLanguage(prevState => !prevState);
  };

  const handleTurnOnLights = () => {
    setLightsOn(prevState => !prevState);
    if (lightsOn) document.body.style.backgroundColor = '#121111';
    if (!lightsOn) document.body.style.backgroundColor = '#f7f2f2';
  };

  useEffect(() => {

    const onSuccess = async (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      const data = await getWeatherAndCity({ lat, lng });
      if (!data) {
        setError(true);
        return;
      }
      setCity(data.cityName);
      setWeather(data.weather);
      setTemp(data.temp);
      setLocation(true);
    };

    const onError = () => {
      setLocation(false);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

  }, []);

  const cardsBackground = {
    backgroundColor: lightsOn ? '#fff' : '#0c1015'
  };

  const mainBackground = {
    backgroundColor: lightsOn ? '#f7f2f2' : '#121111'
  };

  const textColor = {
    color: lightsOn ? '#000' : '#fff'
  };

  return (
    <main style={mainBackground}>
      <div className='grid-main' style={{ color: '#fff' }}>
        <div className='card about-card' style={cardsBackground}>
          <div className='header-about flex'>
            <div>
              <span style={textColor}>{texts.nameHeader}</span>
              <h2>{texts.name}</h2>
            </div>
            <img src="/thumbnail.jpeg" alt="Santiago Armesto photo" className='photo' />
          </div>
          <p style={textColor}>{texts.about}</p>
          <img className='signature' alt="signature" src="signature.png" />
        </div>
        <div className='card linkedin-card relative hover' style={{ backgroundColor: '#00659c' }}>
          <div className="external-link">
            <ExternalArrow />
          </div>
          <a href='https://www.linkedin.com/in/santiago-armesto1/' target='_blank' aria-label='Go to LikedIn' rel="noreferrer">
            <LinkedinIcon />
          </a>
        </div>
        <div className='card github-card relative hover' style={{ background: '#242524' }}>
          <div className="external-link">
            <ExternalArrow />
          </div>
          <a href='https://github.com/armestoSantiago/' target='_blank' aria-label='Go to github' rel="noreferrer">
            <GitHubIcon />
          </a>
        </div>
        <div className='card cv-card relative hover' style={cardsBackground}>
          <div className="external-link" style={{ backgroundColor: lightsOn ? '#000' : '#fff' }}>
            <DownloadArrow lightsOn={lightsOn} />
          </div>
          <a href='https://drive.google.com/file/d/1AC25Vt8mGSyaDuotDSgAq6fdjYOgtfdw' target='_blank' aria-label='curriculum' rel="noreferrer">
            <CvIncon lightsOn={lightsOn} />
          </a>
        </div >
        <div className='card mail-card relative hover' style={{ backgroundColor: '#ba777c' }}>
          <div className="external-link">
            <ExternalArrow />
          </div>
          <a href='mailto:contactosantiagoarmesto@gmail.com' target='_blank' aria-label='Mail me' rel="noreferrer">
            <MailIcon />
          </a>
        </div>
        <div className='card tecnologies-card' style={{ backgroundColor: '#0c1015' }}><Tecnologies /></div>
        <div className='card lights-card' style={cardsBackground}>
          <button onClick={handleTurnOnLights}>
            <img className='toggler-img' src={lightsOn ? 'moon.png' : 'sun.png'} alt="sun/moon image" />
          </button>
        </div>
        <div className='card language-card column' style={{ background: '#483d54' }}>
          <button onClick={handleChangeLanguage}>
            <p>{texts.lang}</p>
            <div className='lang-options-container'>
              <span className={language && 'gold'}>EN</span>
              <span className={!language && 'gold'}>ES</span>
            </div>
          </button>
        </div>
        <div className='card column english-card relative hover' style={cardsBackground}>
          <div className="external-link " style={{ backgroundColor: lightsOn ? '#000' : '#fff' }}>
            <ExternalArrow lightsOn={lightsOn} />
          </div>
          <a href='https://cert.efset.org/ZQ5yHN' target='_blank' aria-label='Go to english certification' rel="noreferrer">
            <span style={textColor}>{texts.organization}</span>
            <strong>{texts.level}</strong>
            <p style={textColor}>{texts.english}</p>
          </a>
        </div>
        <div className='card welcome-card column' style={cardsBackground}>
          {error && <span className='gold center'>{texts.failFetch}</span>}
          {!location && !error && <span className='gold center'>{texts.errorMessage}</span>}
          {location && <p style={textColor} className='welcome-message'>{texts.headerWelcomeMessage}</p>}
          {city && <span className='gold city-message'>{city}</span>}
        </div>
        <div className='card weather-card' style={cardsBackground}>
          {error &&
            <div className='hammer-container flex column'>
              <HammerIcon />
              <p className='hammer-text' style={{ textAlign: 'center' }}>{texts.failFetch2}</p>
            </div>
          }
          {!error && !location && <div className="flex column">
            <LocationIcon lightsOn={lightsOn} />
            <p className='weather-enable' style={textColor}>{texts.weatherErrorMessage}</p>
          </div>
          }
          {city && <div className='flex'>
            <div>
              <p className='gold city-text'>{city}</p>
              <span className='weather-text' style={textColor}>{temp} °C</span>
            </div>
            <img className='weather-img' src={`${weather.toLowerCase()}.png`} alt={`${weather} img`} />
          </div>}
        </div>
        <div className='card institute-card column' style={cardsBackground}>
          <p className='gold institute-degree'>{texts.degree}</p>
          <p className="institute-institute" style={textColor}>{texts.institute}</p>
          <p className="institute-location" style={textColor}>{texts.location}</p>
        </div>
        <div className='card column age-card' style={{ backgroundColor: '#087f5b' }}>
          <p>{texts.age}</p>
          <span>{texts.ageText}</span>
        </div>
      </div>
    </main >
  );
}
