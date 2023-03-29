import Image from 'next/image'
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';


import styles from './Card.module.css'

interface cardProps{
    name: string;
    imgUrl: string;
    id: number;
    favorite: boolean;
    handleFavorite: (id:number) => void;
}

export function Card({name, imgUrl, id}:cardProps){
    return(
        <div>
            <Link href={`/character/${id}`}>{name}</Link>   
            <button><FontAwesomeIcon icon={faHeart} /></button> 
        </div>
    )
}