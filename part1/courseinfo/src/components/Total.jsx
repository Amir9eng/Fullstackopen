
const Total = ({course}) => {
  return (
    <div>
     Number of exercise {course.parts.reduce((sum, exercise) => 
       sum + exercise.exercises,0)
     }
    </div>
  )
}

export default Total
 
