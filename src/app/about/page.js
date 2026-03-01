import Link from 'next/link';

export default function About() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <Link href="/" className="text-gray-500 hover:text-black transition mb-6 inline-block">
        ← Back to albums
      </Link>

      <h1 className="text-4xl font-bold mb-8">About</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          I'm based in Switzerland and photography is one of those hobbies I truly enjoy — yet somehow never do enough of. 
          With this project I'm hoping to change that, giving myself a reason to pick up the camera more regularly. 
          A little self-imposed push, if you will.
        </p>
        <p>
          I love being outside and capturing moments consciously, slowing down rather than just snapping away.
        </p>
        <p>
          No professional here. My photos are unedited and straight from the camera, which is exactly how I want it. 
          Honest moments, nothing more.
        </p>
        <p>
          Occasionally you'll spot a shot taken by my father too — he shares the same passion.
        </p>
        <p>
          This website is a side project I built to learn web development, share my favourite shots, and have my own 
          little space on the internet — independent from big social media platforms. Always a work in progress, always learning.
        </p>
      </div>
    </main>
  );
}
