import logo from "../../asset/logo.png"
import './TirageCarte.css';
import { useState, useEffect } from "react";
import api from '../../api/api';

function Tirage() {

    const [cartes, setCarte] = useState([])
    const [random, setRandom] = useState([])

    const fetchrandom = () => {
        const value = Object.keys(cartes);
        const randIndex = Math.floor(Math.random() * value.length)
        const randKey = value[randIndex]
        const name = cartes[randKey]
        setRandom(name)
    }
    
    const fetchCarte = async () => {
        const { data } = await api.get()
        setCarte(data.pokemons)
    }

    useEffect(() => {
        fetchCarte()
    }, [])

    useEffect(() => {
        fetchrandom()
    }, [])

    console.log(random);

    return (
        <div className='container-fluid' >
            <div className='container' >
                <div className='row tirage' >
                    <div className='logo' >
                        <img src={logo} alt='' />
                    </div>
                    {
                   
                    }
                </div>
            </div>
        </div>
    )
}

export default Tirage;