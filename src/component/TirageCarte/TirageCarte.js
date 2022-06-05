import logo from "../../asset/logo.png"
import './TirageCarte.css';
import { useState, useEffect } from "react";
import api from '../../api/api';
import { Button } from "react-bootstrap";

function Tirage() {

    //initialisation de la table cartes ou il y'aura tout les carte de l'API
    //initialisation de la table random ou il y'aura la carte aleatoir du debut du jeu
    //initialisation de la table favorites ou il y'aura tout les carte selectionner par le jouer
    //initialisation des seconds a 15scd
    //initialisation de du boolean active du chrono a false
    const [cartes, setCarte] = useState([])
    const [random, setRandom] = useState([])
    const [favorites, setFavorites] = useState([]);;
    const [seconds, setSeconds] = useState(15);
    const [isActive, setIsActive] = useState(false);

    // utilisation de l'api pour appeler les données et les integrer sur la constante Data
    // qui serat utilisée pour la function setCarte afin de remplir le tableau carte
    const fetchCarte = async () => {
        const { data } = await api.get()
        setCarte(data.pokemons)
    }

    //on appel les clée de tout les cartes
    //on les fait tourner aléatoirement pour en sortir une
    //on appel cette clée pour nous sortir la carte du debut
    const fetchrandom = () => {
        const keys = Object.keys(cartes);
        const randrandom = Math.floor(Math.random() * keys.length)
        const randKey = keys[randrandom]
        setRandom(cartes[randKey])
    }


    useEffect(() => {
        fetchCarte()
    }, [])

    //Quand la table cartes change on appel fetchrandom
    useEffect(() => {
        fetchrandom()
    }, [cartes])

    const addFavorites = () => {
        favorites.push(random) // ajout de l'item a la table favorie
        cartes.splice(random, 1); // suprime les item choisi pour pas les reprendre
        sessionStorage.setItem("favorites", JSON.stringify(favorites));// enregistrement dans la session actuel avec la clée facorites
    }


    //initialise le chrono a 15 et l'active
    const toggle = () => {
        setSeconds(15);
        setIsActive(!isActive);
    }

    //permet de stoper le chrono en passant le bool a faux
    const stop = () => {
        setIsActive(false);
    }

    // si le chrono et activer il serat d'une vitesse de 500ms et ferrat tourner les carte aleatoirement pendant 15 scd
    useEffect(() => {
        let interval = null;
        if (seconds == 0) stop();
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 500);
            fetchrandom()
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);


    return (
        <div className='tirage col-lg-4' >
            <div className='logo' >
                <img src={logo} heigh="139" width="375" alt='' />
            </div>
            {random && (
                <div className="carteTirage" style={{ backgroundColor: `${random.background_color}` }} onClick={() => addFavorites(random)} >
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
    )
}

export default Tirage;