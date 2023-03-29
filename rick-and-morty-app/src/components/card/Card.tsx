import Image from 'next/image'

import styles from './Card.module.css'

interface CardProps{
    name: string;
    imgUrl: string
}

export function Card({name, imgUrl}:CardProps){
    return(
        <div>
            <span>{name}</span>    
        </div>
    )
}