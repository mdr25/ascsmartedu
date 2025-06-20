const options = [
  {
    name: 'ASC CENDEKIA',
    grades: '(Kelas 1-6 SD)',
    subjects: ['Matematika', 'IPS', 'IPA', 'Bahasa Inggris', 'Bahasa Indonesia'],
    schedule: '3 Kali Sesi/Minggu',
  },
  {
    name: 'ASC PRIMA',
    grades: '(Kelas 7-9 SMP)',
    subjects: ['Matematika', 'IPS', 'IPA', 'Bahasa Inggris', 'Bahasa Indonesia'],
    schedule: '4 Kali Sesi/Minggu',
  },
  {
    name: 'ASC SATRIA',
    grades: '(Kelas 10-12 SMA)',
    subjects: ['Matematika', 'Biologi', 'Kimia', 'Fisika', 'Bahasa Inggris'],
    schedule: '3 Kali Sesi/Minggu',
  },
];

export default function ClassOptions() {
  return (
    <section className="w-full px-4 py-10 bg-white relative">
      {/* Title */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-8">
        Ayo Pilih Kelasmu dan Mulai Belajar!
      </h3>

      {/* Card Container */}
      <div className="bg-white border-4 border-teal-600 rounded-3xl p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {options.map((cls, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-[2px_2px_6px_rgba(0,0,0,0.2)] relative overflow-hidden"
          >
            {/* Header */}
            <div className="bg-orange-600 px-4 py-3 rounded-t-xl">
              <h4 className="text-white text-xl sm:text-2xl font-bold font-montserrat">{cls.name}</h4>
              <p className="text-white text-sm sm:text-lg font-medium font-montserrat">{cls.grades}</p>
            </div>

            {/* Subjects */}
            <ul className="px-6 py-4 text-base font-medium font-poppins text-black leading-7">
              {cls.subjects.map((subj, i) => (
                <li key={i}>{subj}</li>
              ))}
            </ul>

            {/* Schedule */}
            <p className="px-6 pb-4 text-sm text-orange-600 font-medium font-montserrat italic">
              {cls.schedule}
            </p>
          </div>
        ))}
        <div className="mt-10 flex justify-center">
 </div>
         <button onClick={() => navigate("/register")}
         className="w-full sm:w-72 h-14 bg-teal-600 rounded-lg text-white text-xl sm:text-2xl font-bold font-montserrat shadow-md transition hover:bg-teal-700">
          Daftar Sekarang
        </button>
      </div>
    </section>
  );
}
