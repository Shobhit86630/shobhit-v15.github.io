import { Navbar } from "@/components/Navbar";
import { Hero, ProfileCard } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Tools } from "@/components/Tools";
import { Thoughts } from "@/components/Thoughts";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-[1200px] overflow-x-clip px-4 pt-28 sm:px-6 md:pt-32">
        <div id="home" className="grid gap-14 lg:grid-cols-[minmax(300px,340px)_1fr] lg:gap-16 xl:gap-20">
          {/* Left: sticky profile card */}
          <aside aria-label="Profile" className="lg:sticky lg:top-28 lg:self-start">
            <ProfileCard />
          </aside>

          {/* Right: all sections */}
          <div className="min-w-0">
            <Hero />
            <Stats />
            <Projects />
            <Experience />
            <Tools />
            <Thoughts />
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
