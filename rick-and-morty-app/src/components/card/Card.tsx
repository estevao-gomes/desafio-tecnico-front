import Image from 'next/image'
import Link from 'next/link';

import styles from './Card.module.css'

interface cardProps{
    name: string;
    imgUrl: string;
    id: number
}

export function Card({name, imgUrl, id}:cardProps){
    return(
        <div>
            <Link href={`/character/${id}`}>{name}</Link>    
        </div>
    )
}