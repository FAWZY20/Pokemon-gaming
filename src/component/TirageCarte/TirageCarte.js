import logo from "../../asset/logo.png"
import './TirageCarte.css';
import { useState, useEffect } from "react";
import api from '../../api/api';
import { Button } from "react-bootstrap";

function Tirage() {

    const [cartes, setCarte] = useState([])
    const [random, setRandom] = useState([])

    const fetchrandom = () => {
        const keys = Object.keys(cartes);
        const randIndex = Math.floor(Math.random() * keys.length)
        const randKey = keys[randIndex]
        setRandom( cartes[randKey])
        console.log(cartes[randIndex]);

    }

    const fetchCarte = async () => {
        const { data } = await api.get()
        setCarte(data.pokemons)
        fetchrandom()
    }

    useEffect(() => {
        fetchCarte()
    }, [])

    console.log();

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
                            <Button className="btn-lancer" variant="warning">Lancer</Button>
                        </div>
                        <div>
                            <Button className="btn-stop" variant="warning">Stop</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tirage;