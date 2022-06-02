import logo from "../../asset/logo.png"
import './TirageCarte.css';
import { useState, useEffect } from "react";
import api from '../../api/api';
import { Button } from "react-bootstrap";

function Tirage() {

    // carte aleatoir
    const [cartes, setCarte] = useState([])
    const [random, setRandom] = useState([])

    // Timer
    const [seconds, setSeconds] = useState(15);
    const [isActive, setIsActive] = useState(false);

    const fetchrandom = () => {
        const keys = Object.keys(cartes);
        const randIndex = Math.floor(Math.random() * keys.length)
        const randKey = keys[randIndex]
        setRandom(cartes[randKey])
        console.log(cartes[randIndex]);

    }

    const fetchCarte = async () => {
        const { data } = await api.get()
        setCarte(data.pokemons)
        fetchrandom()
    }

    const toggle = () => {
        setIsActive(!isActive);
    }

    const reset = () => {
        setSeconds(15);
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if(seconds == 0) reset();
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 500);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    useEffect(() => {
        fetchCarte()
    }, [])
    
    return (
        <div className='container-fluid' >
            <div className='container' >
                <div className='row tirage' >
                    <div className='logo' >
                        <img src={logo} heigh="139" width="375" alt='' />
                    </div>
                    <div className="carteTirage">
                        {

                        }
                    </div>
                    <div className="button-block" >
                        <div>
                            <Button className="btn-lancer" variant="warning" onClick={toggle} >Lancer</Button>
                        </div>
                        <div>
                            <Button className="btn-stop" variant="warning" onClick={reset} >Stop ( {seconds}s )</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tirage;