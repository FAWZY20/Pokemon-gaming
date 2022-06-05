import './SauvegardeCarte.css';
import { useState, useEffect } from 'react';

function Sauvegarde() {

    //initialisation de la table ou il y'aura les carte selectionner
    const [sauvegarde, setSauvegarde] = useState([])
    const getArray = JSON.parse(sessionStorage.getItem('favorites'))

    //affichage de la liste des carte si le tableau de la session actif et different de nul sinon supression de la session actuel
    const fetchSauvegarde = () => {
        if (getArray !== null) {
            setSauvegarde(getArray)
        } 
        else {
            sessionStorage.removeItem('favorites')
        }
    }

    //activation de la function fetchSauvegarde si le tableau sauvegarde change
    useEffect(()  => {
        fetchSauvegarde()
    }, [sauvegarde])

    return (
        <div className='carte col-lg-8 col-sm-8' >
            <div className='carteSauvegarde-cadre' >
                {sauvegarde && (
                    sauvegarde.slice(0, 6).map((sauv) => (
                        <div className='carteSauvegarde' style={{ backgroundColor: `${sauv.background_color}` }} >
                            <div className="info-principal-svg" >
                                <div>
                                    <p>{sauv.name}</p>
                                </div>
                                <div>
                                    <p><span className="niveau-svg" >NV</span> {sauv.level} {sauv.abilities && (sauv.abilities.slice(0, 1).map((test) => (<span>{test.icon}</span>)))}</p>
                                </div>
                            </div>
                            <div className="image-svg" >
                                <img src={sauv.image} heigh="100" width="100" alt="" />
                            </div>
                            {sauv.abilities && (sauv.abilities.slice(0, 2).map((abilities) => (
                                <div className="description-svg" >
                                    <p className="description-name-svg" ><span className="description-icon-svg" >{abilities.icon}</span> {abilities.name} </p>
                                    <p className="description-info-svg" >{abilities.description}</p>
                                </div>
                            )))}
                        </div>
                    )))
                }
            </div>
        </div>

    )
}

export default Sauvegarde;