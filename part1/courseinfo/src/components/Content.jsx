
const Content = ({course}) => {
  const content = () => course.parts.map((part) => (<p key ={part.id}>{part.name} - {part.exercises}</p>))

  return (
    <section>
      {content()}   
    </section>
  )
}

export default Content
