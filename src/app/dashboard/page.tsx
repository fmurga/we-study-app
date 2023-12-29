'use server'
import Post from '@/components/Post/Post'
import PostModal from '@/components/Post/PostModal'

export async function getPosts() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/posts?limit=100000`, {
    next: { revalidate: 10 },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getTags() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/tags`, {
    next: { revalidate: 10 },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Dashboard() {
  const Posts = await getPosts()
  const Tags = await getTags()
  return (
    <>
      <PostModal tags={Tags} />
      {Posts.map((post) => (
        <Post data={post} />
      ))}
    </>
  )
}
