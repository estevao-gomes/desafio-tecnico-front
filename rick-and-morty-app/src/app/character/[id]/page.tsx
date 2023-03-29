'use client'

interface paramsProps{
    params: {
        id: number
    }
}
export default function Page({params}:paramsProps){    
    return (
        <h1>{params.id}</h1>
    )
}