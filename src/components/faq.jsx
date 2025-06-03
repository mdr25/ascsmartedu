import { useState } from "react";

const faqList = [
  {
    q: "Apa saja jenjang yang tersedia di ASC SmartEdu?",
    a: "Kami menyediakan program bimbingan belajar untuk siswa jenjang SD, SMP, dan SMA, disesuaikan dengan kurikulum dan kebutuhan akademik masing-masing.",
  },
  {
    q: "Bagaimana sistem belajar di ASC SmartEdu?",
    a: "Pembelajaran dilakukan secara tatap muka di kelas, maksimal 20 siswa per sesi, dengan durasi 90 menit, 3-5 kali per minggu.",
  },
  {
    q: "Apa saja program belajar yang tersedia di ASC SmartEdu?",
    a: "Kami menyediakan tiga program unggulan: Cendekia (SD), Prima (SMP), Satria (SMA).",
  },
  {
    q: "Apakah tersedia program persiapan UTBK/SNBT?",
    a: "Ya, ASC Satria mencakup persiapan UTBK/SNBT dengan bimbingan strategi masuk PTN.",
  },
  {
    q: "Bagaimana cara mendaftar ASC SmartEdu?",
    a: "Pendaftaran dapat dilakukan melalui: website resmi, admin WhatsApp, atau datang ke kantor cabang.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 p-6">
      <h3 className="text-xl font-bold text-center mb-6">Frequently Asked Questions</h3>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqList.map((item, idx) => (
          <div
            key={idx}
            className="border border-teal-300 rounded bg-white shadow-sm"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left p-4 flex justify-between items-center"
            >
              <span className="font-semibold">{idx + 1}. {item.q}</span>
              <span className="text-teal-600">{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-4 text-sm text-gray-700">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
