import { ProfileActions } from "@/components/Profile/ProfileActions"
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export const revalidate = 60

export const dynamicParams = true

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/usernames`, {
    next: { revalidate: revalidate },
  });

  if (!res.ok) {
    console.error("Error fetching users");
    return [];
  }

  const usernames = await res.json();

  if (!Array.isArray(usernames) || !usernames.every((u) => typeof u === 'string')) {
    console.error("Unexpected response format");
    return [];
  }

  return usernames.map((username) => ({ username }));
}


export async function getUser(username: string) {
  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/user/${username}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    console.log("Error fetching user data")
  }
  return res.json()
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const user = await getUser((await params).username)

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-6 bg-white shadow-xl rounded-lg">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
        <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative mb-4 z-0">
          <img
            src={user?.image || '/images/profile-placeholder.png'}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <CheckCircleIcon className="h-8 w-8 text-blue-500 absolute bottom-2 right-2 bg-white rounded-full p-1" />

        </div>

        <div className="flex-grow text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {user?.fullName}
          </h1>
          <p className="text-lg text-gray-600 mb-4">@{user?.username}</p>
          <p className="text-md text-gray-500 mb-6">
            {user?.bio ? user?.bio : 'Welcome to my profile! Here you can find my latest updates and information.'}
          </p>

          <ProfileActions user={user?.username} />

        </div>
      </div>

      {/* Posts, Likes, Lessons, and Following Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Posts</h3>
            <p className="text-4xl font-bold text-blue-500">{user?.posts?.length || 0}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Likes</h3>
            <p className="text-4xl font-bold text-blue-500">{user?.likes?.length || 0}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Lessons Followed</h3>
            <p className="text-4xl font-bold text-blue-500">{user?.lessons?.length || 0}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Following</h3>
            <p className="text-4xl font-bold text-blue-500">{user?.following?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
