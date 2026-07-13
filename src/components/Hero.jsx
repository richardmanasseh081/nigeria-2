function Hero() {
  return (
    <section
      className="relative text-white py-30 text-center h-96 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i0.wp.com/brandcrunch.com.ng/wp-content/uploads/2021/09/The-Cost-Of-Starting-A-Restaurant-In-Nigeria.png?fit=980%2C595&ssl=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black to-transparent opacity-60"></div>

      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-4">Authentic Nigerian Dishes</h2>
        <p className="text-lg">Freshly prepared & delivered to your door</p>
      </div>
    </section>
  );
}

export default Hero;
