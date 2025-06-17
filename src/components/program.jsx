const programData = [
  {
    title: 'ASC Cendekia',
    grade: '(Kelas 1-6 SD)',
    subjects: ['Matematika', 'IPS', 'IPA', 'Bahasa Inggris'],
    outlineColor: 'outline-teal-700',
    iconColor: 'bg-teal-100'
  },
  {
    title: 'ASC Prima',
    grade: '(Kelas 7-9 SMP)',
    subjects: ['Matematika', 'IPS', 'IPA', 'Bahasa Inggris'],
    outlineColor: 'outline-orange-600',
    iconColor: 'bg-orange-100'
  },
  {
    title: 'ASC Satria',
    grade: '(Kelas 10-12 SMA)',
    subjects: ['Matematika', 'Bahasa Inggris', 'Biologi', 'Kimia', 'Fisika'],
    outlineColor: 'outline-teal-600',
    iconColor: 'bg-teal-100'
  }
];
import picLevel1 from '../assets/pic_level1.jpg';
export default function Programs() {
  return (
    <section className="w-full max-w-[1265px] mx-auto py-12 px-4">
      <h2 className="text-black text-3xl font-medium font-montserrat mb-2">
        Program Pilihan ASC SmartEdu
      </h2>
      <p className="text-black text-lg font-light font-montserrat mb-8">
        Belajar sesuai jenjang, fokus pada kebutuhanmu.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {programData.map((program, index) => (
          <div 
            key={index}
            className={`relative bg-white rounded-xl outline outline-4 ${program.outlineColor} p-6 h-100`}
          >
            <div className={`w-20 h-20 rounded-full ${program.iconColor} flex items-center justify-center mb-4`}>
              <img 
                className="w-12 h-12" 
                src={picLevel1} 
                alt={program.title}
              />
            </div>
            <h3 className="text-black text-2xl font-bold font-montserrat mb-1">
              {program.title}
            </h3>
            <p className="text-black text-base font-medium font-montserrat mb-4">
              {program.grade}
            </p>
            <div className="text-zinc-800 text-lg font-medium font-poppins space-y-1">
              {program.subjects.map((subject, i) => (
                <div key={i}>{subject}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}