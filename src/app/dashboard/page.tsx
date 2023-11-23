import Post from '@/components/Post/Post'
import PostModal from '@/components/Post/PostModal'

const PostMock = [
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    createdAt: new Date(),
    user: { fullname: 'John Doe' },
  },
]

export default function Dashboard() {
  return (
    <>
      <PostModal />
      {PostMock.map((post) => (
        <Post data={post} />
      ))}
    </>
  )
}
