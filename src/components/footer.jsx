export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-white pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

        {/* Google Map */}
        <div className="col-span-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510117.14280210575!2d100.82045173018076!3d-2.7299970733914862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e325de580702433%3A0x3039d80b220cea0!2sMukomuko%20Regency%2C%20Bengkulu!5e0!3m2!1sen!2sid!4v1748980979788!5m2!1sen!2sid"
            className="w-[280px] h-[180px] rounded-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Logo & Motto */}
        <div className="space-y-2">
          <div className="text-2xl font-bold font-montserrat text-orange-600">
            ASC <span className="text-teal-600">SmartEdu</span>
          </div>
          <p className="text-xs text-orange-500 font-medium font-montserrat">
            Learn Today Shine Tomorrow
          </p>
        </div>

        {/* Contact Us */}
        <div className="space-y-1">
          <h4 className="text-lg font-semibold font-montserrat">Contact Us</h4>
          <p className="text-sm font-medium">+62-858-4021-48152</p>
          <p className="text-sm font-medium">ASC@gmail.com</p>
        </div>

        {/* Term and Policies */}
        <div className="space-y-1">
          <h4 className="text-lg font-semibold font-montserrat">Term and Policies</h4>
          {/* Add links here if needed */}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 bg-orange-500 py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-medium">
          <p>©2025 All rights Reserved | Block is made with by ASC SmartEdu</p>
        </div>
      </div>
    </footer>
  );
}
