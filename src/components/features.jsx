const features = [
  {
    title: 'Tatap Muka Interaktif',
    desc: 'Belajar langsung di kelas bersama tutor profesional dengan maksimal 20 siswa per sesi. Memberikan perhatian lebih dan suasana belajar yang nyaman.',
    bgColor: 'bg-teal-600/90',
    border: 'border border-white',
    fontFamily: 'font-montserrat',
    img: 'https://placehold.co/360x240',
    imgClass: 'rounded-[20px]'
  },
  {
    title: 'Latihan Soal & Test Berkala',
    desc: 'Siswa rutin mengerjakan soal untuk mengasah pemahaman materi. Ujian berkala dilakukan untuk mengevaluasi progres belajar.',
    bgColor: 'bg-orange-600/90',
    fontFamily: 'font-montserrat',
    img: 'https://placehold.co/391x237',
    imgClass: 'rounded-[20px]'
  },
  {
    title: 'Laporan Kemajuan Belajar',
    desc: 'Perkembangan siswa dicatat dan dilaporkan secara berkala. Orang tua dapat memantau hasil belajar dan progres akademik anak.',
    bgColor: 'bg-teal-600/90',
    fontFamily: 'font-plus-jakarta-sans',
    img: 'https://placehold.co/355x237',
    imgClass: 'rounded-[10px]'
  }
];

export default function Features() {
  return (
    <div className="relative w-full max-w-[1277px] mx-auto py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-black text-3xl font-medium font-montserrat mb-4">
          Pembelajaran Terarah, Terstruktur dan Terpantau
        </h2>
        <p className="text-black text-lg font-light font-montserrat max-w-3xl mx-auto">
          Dengan pendekatan yang terencana dan evaluasi rutin, kami memastikan siswa belajar secara efektif, terarah, dan sesuai dengan kurikulum masing-masing jenjang.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`relative h-[624px] ${feature.bgColor} rounded-[20px] ${feature.border || ''} overflow-hidden`}
          >
            {/* Content */}
            <div className="p-8 h-full flex flex-col">
              <h3 className={`text-white text-3xl font-semibold ${feature.fontFamily} mb-6`}>
                {feature.title}
              </h3>
              <p className={`text-white text-lg font-normal font-montserrat mb-8 flex-grow`}>
                {feature.desc}
              </p>
              
              {/* Image */}
              <div className="relative w-full h-60">
                <img 
                  src="src\assets\pic1.jpg" 
                  alt={feature.title}
                  className={`w-full h-full object-cover ${feature.imgClass}`}
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-b-[20px]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute -z-10 right-0 top-0 w-32 h-32 bg-teal-100/50 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 left-0 bottom-0 w-40 h-40 bg-orange-100/50 rounded-full blur-3xl"></div>
    </div>
  );
}