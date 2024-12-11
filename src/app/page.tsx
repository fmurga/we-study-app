import Link from "next/link";
import Image from "next/image"; // Import for displaying images

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="mb-6">
          <Image
            src="/images/WeStudy-Logo.png" // Update this path to where you store your logo
            alt="WeStudy Logo"
            width={300}
            height={100}
            priority
          />
        </div>
        <h1 className="text-5xl font-bold text-blue-500 mb-4">
          Connect, Collaborate, and Grow
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mb-6">
          Join the ultimate social network for students. Connect with peers, share knowledge, and build your network.
        </p>
        <div className="inline-flex gap-3">
          <Link href="/auth/register" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
            Sign Up
          </Link>
          <Link href="/auth/login" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
            Sing In
          </Link>
        </div>

      </section>

      <section className="py-16 bg-gray-800 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-500">Features</h2>
          <p className="text-gray-300">
            Discover what makes our platform the perfect place for students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <Feature
            title="Networking"
            description="Connect with other students, alumni, and professionals."
            icon="🌐"
          />
          <Feature
            title="Resources"
            description="Access study materials, forums, and mentorship programs."
            icon="📚"
          />
          <Feature
            title="Events"
            description="Stay updated with campus events and webinars."
            icon="📅"
          />
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-900">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-500">What Students Say</h2>
          <p className="text-gray-300">
            Hear from students who have benefited from our network.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <Testimonial
            name="Alex T."
            feedback="An amazing platform that helped me connect with like-minded students and professionals."
          />
          <Testimonial
            name="Sara K."
            feedback="The resources available here are top-notch. They helped me ace my exams!"
          />
          <Testimonial
            name="Chris L."
            feedback="A great place to find new opportunities and grow my network."
          />
        </div>
      </section>

      <section className="py-16 bg-gray-800 px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">
          Ready to Join the Community?
        </h2>
        <p className="text-gray-300 mb-6">
          Don’t miss out on the chance to connect with students around the world.
        </p>
        <Link href="/auth/register" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          Sign Up Now
        </Link>
      </section>

      <footer className="bg-black py-8 text-center">
        <p className="text-gray-500">© 2024 WeStudy. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Feature({ title, description, icon }) {
  return (
    <div className="text-center p-6 bg-gray-700 rounded-lg shadow-lg">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-500 mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function Testimonial({ name, feedback }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <p className="text-gray-300 italic">{feedback}</p>
      <h4 className="text-blue-500 mt-4 font-semibold">- {name}</h4>
    </div>
  );
}
