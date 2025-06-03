export default function About() {
  return (
    <div className="relative w-full max-w-[1254px] h-60 mx-auto my-8">
      {/* Background container with shadow */}
      <div className="w-full h-full absolute bg-teal-600/40 rounded-[20px] shadow-[4px_4px_4px_0px_rgba(255,255,255,1.00)]" />
      
      {/* Top bar */}
      <div className="w-full h-10 absolute top-0 bg-teal-600 rounded-t-[20px] shadow-[2px_2px_2px_0px_rgba(255,255,255,1.00)]" />
      
      {/* Title - centered */}
      <h2 className="absolute left-1/2 top-1 transform -translate-x-1/2 text-white text-3xl font-medium font-montserrat">
        ABOUT US
      </h2>
      
      {/* Content */}
      <div className="absolute w-[calc(100%-134px)] left-[67px] top-[49px] text-justify text-black text-xl font-medium font-montserrat leading-9">
        ASC SmartEdu adalah platform belajar untuk siswa SD, SMP, dan SMA dengan pendekatan yang menyenangkan dan efektif. Kami percaya setiap siswa punya cara belajar yang berbeda, karena itu kami hadir dengan program fleksibel, durasi yang bisa disesuaikan, dan materi dari pengajar berpengalaman. Dengan metode interaktif, kami siap menjadi teman belajarmu menuju prestasi terbaik.
      </div>
    </div>
  );
}