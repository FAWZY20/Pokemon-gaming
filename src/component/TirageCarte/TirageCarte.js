import logo from "../../asset/logo.png"
import './TirageCarte.css';
import { useState, useEffect } from "react";
import api from '../../api/api';
import { Button } from "react-bootstrap";

function Tirage() {

    const [cartes, setCarte] = useState([])
    const [random, setRandom] = useState([])

    const [seconds, setSeconds] = useState(15);
    const [isActive, setIsActive] = useState(false);

    const fetchCarte = async () => {
        const { data } = await api.get()
        setCarte(data.pokemons)
    }

    const fetchrandom = () => {
        const keys = Object.keys(cartes);
        const randIndex = Math.floor(Math.random() * keys.length)
        const randKey = keys[randIndex]
        console.log('carte :', cartes[randKey]);
        setRandom(cartes[randKey])
    }

    useEffect(() => {
        fetchCarte()
    }, [])

    useEffect(() => {
        fetchrandom()
    }, [cartes])

    const toggle = () => {
        setSeconds(15);
        setIsActive(!isActive);
    }

    const stop = () => {
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (seconds == 0) stop();
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 800);
            fetchrandom()
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <div className='container-fluid' >
            <div className='container' >
                <div className='row tirage' >
                    <div className='logo' >
                        <img src={logo} heigh="139" width="375" alt='' />
                    </div>
                    {random && (
                        <div className="carteTirage" style={{ backgroundColor: `${random.background_color}` }} >
                            <div className="info-principal" >
                                <div>
                                    <p>{random.name}</p>
                                </div>
                                <div>
                                    <p><span className="niveau" >NV</span> {random.level} {random.abilities && (random.abilities.slice(0, 1).map((test) => (<span>{test.icon}</span>)))}</p>
                                </div>
                            </div>
                            <div className="image" >
                                <img src={random.image} heigh="200" width="200" alt="" />
                            </div>
                            {random.abilities && (random.abilities.slice(0, 2).map((abilities) => (
                                <div className="description" >
                                    <p className="description-name" ><span className="description-icon" >{abilities.icon}</span> {abilities.name} </p>
                                    <p className="description-info" >{abilities.description}</p>
                                </div>
                            )))}
                        </div>
                    )}
                    <div className="button-block" >
                        <div>
                            <Button className="btn-lancer" variant="warning" onClick={toggle} >Lancer</Button>
                        </div>
                        <div>
                            <Button className="btn-stop" variant="warning" onClick={stop} >Stop ( {seconds}s )</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tirage;