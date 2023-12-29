'use server'

import dynamic from 'next/dynamic'

const Post = dynamic( () => import('@/components/Post/Post'))
const PostModal = dynamic( () => import('@/components/Post/PostModal')) 


export async function getPosts() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/posts?limit=100000`, {
    next: { revalidate: 10 },
  })
  if (!res.ok) {
    console.log("Error fetching posts")
  }
  return res.json()
}

export async function getTags() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/tags`, {
    next: { revalidate: 10 },
  })
  if (!res.ok) {
    console.log("Error fetching tags")
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
