export default function Hero() {
  return (
    <section className="w-full bg-white ">
      <section className="px-4 py-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto gap-8">
        {/* Text Content */}
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            LEARN TODAY
            <br />
            SHINE TOMORROW
          </h2>
          <p className="text-lg md:text-xl text-black font-light">
            Di ASC Smart Edu, setiap siswa punya potensi untuk bersinar. Dengan
            bimbingan terstruktur, tutor profesional, dan pendekatan yang
            menyenangkan, kami bantu siswa paham materi, percaya diri, dan
            berprestasi!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-[#FF6103] hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
              Contact Kami
            </button>
            <button className="bg-[#08797F] hover:bg-teal-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
              Daftar Sekarang
            </button>
          </div>
        </div>

        {/* Image */}
        <img
          src="src\assets\pic1.jpg"
          alt="students"
          className="w-full max-w-[600px] h-auto rounded-2xl shadow-md"
        />
      </section>
    </section>
  );
}
