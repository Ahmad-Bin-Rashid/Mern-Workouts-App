import { useEffect } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// componenets
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {

    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                console.log(json)
                dispatch({type: 'SET-WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])
    
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home
