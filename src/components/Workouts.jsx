import { useEffect, useState } from "react"

export default function Workouts() {
    const [workouts, setWorkouts] = useState([])
    const [names, setNames] = useState({})

    useEffect(() => {
        fetch("http://localhost:8080/workouts")
            .then((res) => res.json())
            .then((json) => {
                setWorkouts(json)
            })
    }, [])

    async function createWorkout() {
        const response = await fetch("http://localhost:8080/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });

        const data = await response.json()
        console.log("Workout creado:", data)
        setWorkouts(prev => [...prev, data])
    }

    async function updateName(id, name) {
        const response = await fetch(`http://localhost:8080/exercises/${id}/name`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newName: name
            })
        })
        const updatedExercise = await response.json();
        setWorkouts(prev =>
            prev.map(workout => ({
                ...workout,
                exercises: workout.exercises?.map(exercise =>
                    exercise.id === updatedExercise.id ? updatedExercise : exercise
                )
            }))
        )


    }



    return (
        <div>
            <h1>Workouts</h1>
            <button onClick={createWorkout}>Add Workout</button>
            <ol>
                {workouts.map((workout, index) => (
                    <table key={index}>
                        <thead>
                            <tr>
                                <th>{workout.id}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workout.exercises?.map((exercise, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{exercise.name === null ? (
                                        <>
                                            <input
                                                type="text"
                                                value={names[exercise.id] || ""}
                                                onChange={(e) => setNames(prev => ({ ...prev, [exercise.id]: e.target.value }))}
                                            />
                                            <button onClick={() => updateName(exercise.id, names[exercise.id])}>
                                                Guardar
                                            </button>

                                        </>

                                    ) : (
                                        <>
                                            {exercise.name}
                                        </>
                                        
                                    )}</td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <button>+</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </ol>




        </div>

    )
}