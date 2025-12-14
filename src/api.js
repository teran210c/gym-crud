export async function postWeek() {
    const res = await fetch("http://localhost:8080/weeks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    })
    const data = await res.json();
    return data
}

export async function getWeeks() {
    const res = await fetch("http://localhost:8080/weeks")
    const data = await res.json()
    return data    
}

export async function getWorkouts() {
    const res = await fetch("http://localhost:8080/workouts")
    const data = await res.json()
    return data    
}

export async function getMuscleGroups() {
    const res = await fetch("http://localhost:8080/api/muscle-groups")
    const data = await res.json()
    return data    
}