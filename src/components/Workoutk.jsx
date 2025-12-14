export default function Workout({ muscleGroups, selectedCategory, setSelectedCategory, exerciseOptions }) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Muscle Group</th>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {muscleGroups.map(mg => (
                                <option key={mg} value={mg}>{mg}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select disabled={!exerciseOptions.length}>
                            <option value="">Select item</option>
                            {exerciseOptions.map(exercise => (
                                <option key={exercise.id} value={exercise.id}>
                                    {exercise.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td><input type="number" /></td>
                    <td>From: <input type="number" name="" id="" /> To: <input type="number" /></td>
                    <td><input type="number" /></td>
                    <td><button>Save</button></td>
                </tr>
            </tbody>
        </table>
    )
}