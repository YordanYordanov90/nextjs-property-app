export const dynamic = "force-dynamic";
import { checkUser } from "@/lib/userDb";
import Link from "next/link";

export default async function BackgroundVideo() {
  const user = await checkUser();
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* The video element (absolute) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay content (z-10 so it's above the video) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div className="text-4xl font-bold mb-4">
          {user ? (
            <h2 className="text-center">Welcome to PropertyPulse </h2>
          ) : (
            <h2>
              <Link className="hover:underline" href="/sign-in">
                Sign in
              </Link>{" "}
              to get started
            </h2>
          )}
        </div>
        <p className="text-lg mb-8">
          Discover the perfect property that suits your needs.
        </p>
      </div>
    </div>
  );
}
