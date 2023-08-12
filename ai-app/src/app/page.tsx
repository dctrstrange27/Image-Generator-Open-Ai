import Image from "next";

export default function Home() {
  return (
    <main className=" border-[1px h-screen lg-screen m-auto w-[90%] project-page">
      <div className="h-screen w-full border-[1px flex flex-col justify-center">
        <h1 className="font-archivo text-[4rem] my-10">
          Unleash the Power of DALL-E AI
        </h1>
        <h2 className="text-2xl">Enter a World of Visually Stunning Imagery</h2>
        <br></br>
        <p className="font-inter max-w-4xl">
          Embrace the revolution of AI-generated art and witness the incredible
          possibilities it holds. Whether you&apos;re an artist seeking new
          dimensions or an art lover craving fresh perspectives, DALL-E Artistry
          will redefine how you perceive the world.
        </p>
      </div>
    </main>
  );
}
