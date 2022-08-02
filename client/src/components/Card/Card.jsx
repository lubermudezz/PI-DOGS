import React, {useEffect} from "react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Link} from "react-router-dom";
import { filterApiBreeds, searchByTemp, filterDbBreeds, getAllDogs,  getDogsMaxWeight,  getDogsMinWeight,  getDogsZA} from "../../redux/actions/actions";
//import Detail from "../Detail/Detail";
import Paginación from "../Paginación/Paginación";
import Order from "../Order/Order"
import S from "./card.module.css"
import Filter from "../Filter/Filter";

export default function Card () {
    const dispatch = useDispatch()
    const allDogs = useSelector(state => state.allDogs)
   // const temperaments = useSelector(state=> state.temperaments)
    const [page, setPage] = useState(1)
    const perPage = 8;
    const [filter, setFilter] = useState('All')

    const [order, setOrder] = useState ('AZ')
    const [tempSearch, setTempSearch] = useState('All')

    

    useEffect(() => {
        if(order === 'AZ') dispatch(getAllDogs())
        if(filter === 'All') dispatch(getAllDogs())
        if(filter === 'Our') dispatch(filterApiBreeds())
        if(order === 'ZA') dispatch(getDogsZA())
        if(order === 'minW') dispatch(getDogsMinWeight())
        if(order === 'maxW') dispatch (getDogsMaxWeight())
        if(filter === 'Your') dispatch(filterDbBreeds())
        if(tempSearch !== 'All') dispatch(searchByTemp(tempSearch))
        //dispatch(getAllTemperaments())
    }, [dispatch, order, filter, tempSearch])

   
    
    return (
     
        <div key='perri'>
            <Order setOrder={setOrder}/>
            <Filter setFilter={setFilter} setTempSearch={setTempSearch} setPage={setPage}></Filter>
            <Paginación page={page} setPage={setPage}/>
            <div  className={S.cardDiv}>
                { allDogs ?
                        allDogs
                        .slice((page-1) * perPage, (page-1) * perPage + perPage)
                        .map (e => {
                            return (

                            
                                <div key={e.id}> 
                                <Link to={`/dogs/detail/${e.id}`}>
                                    <span> 
                                        
                                    <img src={e.image} alt='perito' />
                                    
                                    <h1 key='pichi'>{e.name}</h1>
                                 <p>Temperaments: {e.temperaments[0] ? e.temperaments[0].name : 'sin temperamentos'}</p> 
                                    <p>soy el peso: {e.weight}</p> 
                                    
                                    
                                    </span>                         
                                </Link>
                                </div>
                            
                                //<img src={e.image} alt="fotito" />
                            )
                        }) : console.log('no hay perritos')
 
                } 
            </div>
            
            <div>
            <Filter setFilter={setFilter} setTempSearch={setTempSearch} setPage={setPage} ></Filter>
                <Order setOrder={setOrder}/>
                <Paginación page={page} setPage={setPage} />

            </div>

        </div>
        
    )
}