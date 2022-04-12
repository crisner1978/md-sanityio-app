import { Comment } from 'typings'

interface Props {
  comments: Comment[]
}

const Comments = ({ comments = [] }: Props) => {
  console.log('comments', comments)
  return (
    <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-500">
      <h2 className="text-3xl">Comments:</h2>
      <ul>
        {comments?.length > 0 ? (
          comments.map(({ _id, _createdAt, name, email, comment }) => (
            <li className="" key={_id}>
              <hr className="pb-2" />
              <h4>
                <a className="text-yellow-500" href={`mailto:${email}`}>
                  {name}
                </a>{' '}
                <span className='text-gray-400 italic'>Published on {new Date(_createdAt).toLocaleString()}</span> 
              </h4>
              <p>{comment}</p>
            </li>
          ))
        ) : (
          <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
            <h3 className="text-3xl font-bold">Nothing to Show here!</h3>
          </div>
        )}
      </ul>
    </div>
  )
}

export default Comments
