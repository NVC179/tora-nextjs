// app/components/Hero.tsx
export default function Hero() {
  return (
    <section className="pt-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Discover Design Excellence
          </h1>
          <p className="text-lg text-gray-700 max-w-lg">
            Explore curated collections of design and art that ignite imagination and stir the soul.
          </p>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img src="/images/projects/a3003/1.png" alt="Design showcase" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
}
