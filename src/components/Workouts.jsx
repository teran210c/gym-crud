import { useEffect, useState } from "react"
import { postWeek } from "../api"

export default function Workouts() {
    const [weeks, setWeeks] = useState([])

    async function addWeek() {
        const newWeek = await postWeek()
        setWeeks(prev => [...prev, newWeek])
    }


    return (
        <>
            <h1>GYM app</h1>
            <button onClick={addWeek}>Add week</button>

            <ul>
                {weeks.map(week => (
                    <li key={week.id}>{week.title}</li>
                ))}
            </ul>          


        </>
    )
}