import { useEffect, useState, useRef } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import Workout from "./Workoutk";
import { getWeeks, getMuscleGroups } from "../api"

export default function Weeks() {
    const [weeks, setWeeks] = useState([])
    const [muscleGroups, setMuscleGroups] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [exerciseOptions, setExerciseOptions] = useState([])
    const [toEditId, setToEditId] = useState(null)
    const sliderRef = useRef(null)



    useEffect(() => {
        const load = async () => {
            try {
                const weeksRes = await fetch("http://localhost:8080/api/weeks");
                const weeksData = await weeksRes.json();
                setWeeks(weeksData);

                const groupsRes = await fetch("http://localhost:8080/api/exercise-templates/groups");
                const groupsData = await groupsRes.json();
                setMuscleGroups(groupsData);
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, []);




    const addWorkout = async (weekId) => {
        console.log(weekId)
        const res = await fetch(`http://localhost:8080/api/workouts/${weekId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const updatedWeek = await res.json();

        setWeeks(prev =>
            prev.map(w => w.id === weekId ? updatedWeek : w)
        );
    };

    useEffect(() => {
        if (!selectedCategory) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/exercise-templates/group/${selectedCategory}`);

                // optional: check if response is JSON
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log(data)
                setExerciseOptions(data);
            } catch (err) {
                console.error("Failed to fetch exercise templates:", err);
            }
        };

        fetchData();
    }, [selectedCategory]);


    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };




    return (
        <div style={{ width: "90%", maxWidth: "800px", margin: "0 auto", paddingTop: "30px" }}>
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
                            <div style={{ position: "relative", marginBottom: "10px", overflowX: "auto" }}>
                                <button>Add Week</button>
                                <h2 style={{ textAlign: "center" }}>Week {week.weekNumber}</h2>
                                <button onClick={() => addWorkout(week.id)}>Add Workout</button>

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
                                {/* {week.workouts?.map(workout => (
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
                                                {workout.exercises?.map(ex => (
                                                    <tr key={ex.id}>
                                                        <td>
                                                            <select
                                                                value={ex.muscleGroup || ""}
                                                                onChange={(e) => {
                                                                    const mg = Number(e.target.value);
                                                                    loadExercisesForGroup(ex.id, mg);
                                                                    setWeeks(prev =>
                                                                        prev.map(w =>
                                                                            w.id === week.id
                                                                                ? {
                                                                                    ...w,
                                                                                    workouts: w.workouts.map(wk =>
                                                                                        wk.id === workout.id
                                                                                            ? {
                                                                                                ...wk,
                                                                                                exercises: wk.exercises.map(e =>
                                                                                                    e.id === ex.id ? { ...e, muscleGroup: mg, template: null } : e
                                                                                                )
                                                                                            }
                                                                                            : wk
                                                                                    )
                                                                                }
                                                                                : w
                                                                        )
                                                                    );
                                                                }}
                                                            >

                                                                <option value="">Select</option>
                                                                {muscleGroups.map(mg => (
                                                                    <option key={mg.id} value={mg.id}>
                                                                        {mg.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select
                                                                value={ex.template?.id || ""}
                                                                onChange={(e) => {
                                                                    const templateId = Number(e.target.value);
                                                                    const template = exerciseOptions[ex.id]?.find(t => t.id === templateId);

                                                                    setWeeks(prev =>
                                                                        prev.map(w =>
                                                                            w.id === week.id
                                                                                ? {
                                                                                    ...w,
                                                                                    workouts: w.workouts.map(wk =>
                                                                                        wk.id === workout.id
                                                                                            ? {
                                                                                                ...wk,
                                                                                                exercises: wk.exercises.map(e =>
                                                                                                    e.id === ex.id
                                                                                                        ? {
                                                                                                            ...e,
                                                                                                            template: template,
                                                                                                            name: template.name
                                                                                                        }
                                                                                                        : e
                                                                                                )
                                                                                            }
                                                                                            : wk
                                                                                    )
                                                                                }
                                                                                : w
                                                                        )
                                                                    );
                                                                }}
                                                            >

                                                                <option value="">Select</option>

                                                                {(exerciseOptions[ex.id] || []).map(t => (
                                                                    <option key={t.id} value={t.id}>
                                                                        {t.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </td>

                                                        <td>{ex.reps || "—"}</td>
                                                        <td>{ex.weight || "—"}</td>
                                                        <td><button onClick={() => setToEditId(workout.id)}>Edit</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))} */}
                                {week.workouts?.map(workout => (
                                    <Workout
                                        key={workout.id}
                                        muscleGroups={muscleGroups}
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                        exerciseOptions={exerciseOptions}
                                    />
                                ))}

                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}