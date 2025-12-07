import { useEffect, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

import { getWeeks, postWeek } from "../api"

export default function Workouts() {
    const [weeks, setWeeks] = useState([])

    useEffect(() => {
        async function fetchData() {
            const data = await getWeeks()
            setWeeks(data)
        }
        fetchData()
    }, [])

    // async function addWeek() {
    //     const newWeek = await postWeek()
    //     setWeeks(prev => [...prev, newWeek])
    // }

const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};




return (
        <div style={{ width: "90%", maxWidth: "600px", margin: "0 auto", paddingTop: "30px" }}>
            <Slider {...settings}>
                {weeks.map((week) => (
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
                            <h2>{week.title}</h2>
                            <p>hola</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}