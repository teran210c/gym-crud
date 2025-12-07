import { useEffect, useState, useRef } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

import { getWeeks, getWorkouts, postWeek } from "../api"

export default function Weeks() {
    const [weeks, setWeeks] = useState([])
    const [workouts, setWorkouts] = useState([])
    const sliderRef = useRef(null)


    useEffect(() => {
        async function fetchWeeks() {
            const data = await getWeeks()
            setWeeks(data)
        }
        fetchWeeks()
    }, [])

    // async function addWeek() {
    //     const newWeek = await postWeek()
    //     setWeeks(prev => [...prev, newWeek])
    // }

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };




    return (
        <div style={{ width: "90%", maxWidth: "600px", margin: "0 auto", paddingTop: "30px" }}>
            <Slider ref={sliderRef} {...settings}>
                {weeks.map((week, i) => (
                    <div key={week.id}>
                        <div
                            style={{
                                background: "#fafafa",
                                borderRadius: "12px",
                                padding: "20px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                textAlign: "center"
                            }}
                        >
                            <div style={{ position: "relative", marginBottom: "10px" }}>
                                <h2 style={{ textAlign: "center" }}>{week.title}</h2>

                                {i !== 0 && (
                                    <button
                                        onClick={() => sliderRef.current.slickPrev()}
                                        style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", fontSize: "20px", background: "none", border: "none", cursor: "pointer" }}
                                    >
                                        ⬅️
                                    </button>
                                )}

                                {i !== weeks.length - 1 && (
                                    <button
                                        onClick={() => sliderRef.current.slickNext()}
                                        style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", fontSize: "20px", background: "none", border: "none", cursor: "pointer" }}
                                    >
                                        ➡️
                                    </button>
                                )}
                                {week.workouts.map(workout => (
                                    <div key={workout.id} style={{ marginTop: "20px" }}>
                                        <h3>Workout {workout.titleNumber}</h3>

                                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                            <thead>
                                                <tr>
                                                    <th>Muscle Group</th>
                                                    <th>Exercise</th>
                                                    <th>Reps</th>
                                                    <th>Weight</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {workout.exercises.map(ex => (
                                                    <tr key={ex.id}>
                                                        <td>{ex.muscleGroup || "—"}</td>
                                                        <td>{ex.name || "—"}</td>
                                                        <td>{ex.reps || "—"}</td>
                                                        <td>{ex.weight || "—"}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}