import './SauvegardeCarte.css';
import { useState, useEffect } from 'react';

function Sauvegarde() {

    const [sauvegarde, setSauvegarde] = useState([])
    const getArray = JSON.parse(sessionStorage.getItem('favorites'))

    const fetchSauvegarde = () => {
        if (getArray !== null) {
            setSauvegarde(getArray)
        } 
        else {
            sessionStorage.removeItem('favorites')
        }
    }

    useEffect(()  => {
        fetchSauvegarde()
    }, [sauvegarde])

    console.log(sauvegarde);
    return (
        <div className='carte col-lg-8' >
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