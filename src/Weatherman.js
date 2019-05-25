// code bootstrapped from CSC630 projects and modified

import React from 'react';
import './Weatherman.css';

class Weatherman extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      weather: [],
      energy_collected: 0, // note that this variable stores GROSS energy; dissipated energy has not yet been accounted for
      efficiency: 100 // default efficiency is maximum
    };
  }

  // fetching the data from the API (retrieves the weather updated every 3h)
  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?id=5016374&APPID=28b20427ad5a107e5c9c775c943ec27e")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          weather: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: false,
          error
        });
      }
    )
  }

  // computations are about to happen up in this household !! get r e a d y
  mathMagic() {
    var weather = this.state.weather.list[0].main.temp; // the average temperature for the day
    // area is area of solar panel (same for all three)
    // solar_const is a physical constant measuring the solar fux
    // max_energy_gen is the optimal power efficiency output of the solar panels
    const area = 2, solar_const = 1370, max_energy_gen = 50;

    // actual efficiency correction terms - IN THE WORKS
    var eff = 100;
    if(weather - 273.15 > 25) { // pmax constant comes into play, reducing efficiency
      eff = 100; // assume temperature operates at maximum efficiency of 100%
    }
    else {
      eff = 100 - (0.4 * (weather - 25)); // see README under adapted factors
    }
    this.setState({
      efficiency: eff
    });
  }

  // render function, called every time state is altered
  render() {
    // this.mathMagic();
    const { error, isLoaded, weather, efficiency, energy_collected } = this.state;
    const total_energy = 150;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="parent-container">
          <div id="header">
            <h1>interactive solar exhibit</h1>
            <h5>an independent research project at Phillips Academy</h5>
          </div>
          <div id="about">
            <h2> about us </h2>
            <p>
            We are three seniors at Phillips Academy
            performing independent study within the
            disciplines of solar energy, public education,
            and computer science. Our original intention with this
            project was to better understand the applications of
            photovoltaics (solar cells) while engineering a product
            which would allow the community to engage with the
            idea of solar energy in an interesting and useful way.
            </p>
            <div id="gallery">
              <div className="profile">
                <img src={require("./assets/DUDE.jpg")} class="headshot" alt="headshot of student here"></img>
                <h3>Vish Dhar</h3>
                <p>about me...</p>
              </div>
              <div className="profile">
                <img src={require("./assets/DUDE.jpg")} class="headshot" alt="headshot of student here"></img>
                <h3> Nalu Concepcion </h3>
                <p>about me...</p>
              </div>
              <div className="profile">
                <img src={require("./assets/DUDE.jpg")} class="headshot" alt="headshot of student here"></img>
                <h3> Clayson Briggs </h3>
                <p>about me...</p>
              </div>
            </div>
          </div>
          <div id="stats">
            <h2> some cool stats </h2>
            <div id="card-container">
              <div className="card">
                <h1> today's current temperature is a whopping </h1>
                <p>{Math.round(weather.list[0].main.temp - 273.15)} degrees Celcius,
                 or approximately {Math.round((weather.list[0].main.temp - 273.15) * 9/5 + 32)} degrees Fahrenheit</p>
               </div>
               <div className="card">
                  <h1> today, the bench has generated </h1>
                  <p>{total_energy + " Watts"}, operating at approximately {efficiency}% efficiency</p>
                </div>
              <div className="card">
                <h1> which is equal to </h1>
                <p>{Math.round(total_energy/5.45)} full iPhone charges</p>
              </div>
            </div>
          </div>
          <div id="significance">
            <h2>Project Significance</h2>
            <p>
            By harnessing a vast amount of the sun’s latent energy,
            photovoltaics’ role in the struggle against carbon emissions in the
            energy sector and providing electricity for
            off-grid communities in developing nations is growing exponentially and engineers are finding new,
            innovate ways to integrate solar cells into our lifestyles.
            </p>
          </div>
          <footer>This project was made with ♥ at Phillips Academy.</footer>
        </div>
      );
    }
  }
}

export default Weatherman;
