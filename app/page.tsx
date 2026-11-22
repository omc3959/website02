const services = [
  {
    icon: "💡",
    title: "حلول مبتكرة",
    description: "نقدم أفكارًا وحلولًا عملية تساعدك على تحقيق أهدافك.",
  },
  {
    icon: "🚀",
    title: "تطوير مستمر",
    description: "نعمل على تطوير خدماتنا لمواكبة احتياجاتك وتطلعاتك.",
  },
  {
    icon: "🤝",
    title: "شراكة موثوقة",
    description: "نهتم ببناء علاقات طويلة الأمد قائمة على الثقة والجودة.",
  },
];

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-800">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-blue-700">
            اسم مشروعك
          </a>

          <a
            href="#contact"
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg transition"
          >
            تواصل معنا
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <span className="inline-block mb-5 px-4 py-2 rounded-full bg-white/10 text-blue-100">
            مرحبًا بك في موقعنا
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            نحوّل أفكارك إلى واقع
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-9">
            نقدم حلولًا وخدمات مبتكرة تلبي احتياجاتك،
            ونسعى دائمًا لتقديم تجربة مميزة تضيف قيمة حقيقية لمشروعك.
          </p>

          <a
            href="#contact"
            className="inline-block bg-white text-blue-800 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition"
          >
            اكتشف خدماتنا
          </a>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">من نحن</h2>
          <p className="text-lg text-slate-600 leading-9">
            نحن فريق يسعى إلى تقديم خدمات متميزة وحلول عملية
            تساعد الأفراد والشركات على تحقيق طموحاتهم.
            نؤمن بأن الجودة والابتكار والاهتمام بالعميل
            هي أساس النجاح والاستمرارية.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ماذا نقدم؟</h2>
            <p className="text-slate-500">
              مجموعة من الخدمات المصممة لتلبية احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-2xl border border-slate-200 bg-slate-50 text-center hover:shadow-lg transition"
              >
                <div className="text-5xl mb-5">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-8">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">لماذا تختارنا؟</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="font-bold text-lg mb-2">جودة عالية</h3>
            <p className="text-slate-600">نهتم بالتفاصيل ونحرص على جودة العمل.</p>
          </div>

          <div>
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-bold text-lg mb-2">التزام بالمواعيد</h3>
            <p className="text-slate-600">نقدّر وقتك ونسعى لإنجاز الأعمال بكفاءة.</p>
          </div>

          <div>
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-bold text-lg mb-2">تواصل مستمر</h3>
            <p className="text-slate-600">نستمع إليك ونتابع احتياجاتك باهتمام.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-5">
            لنعمل معًا
          </h2>

          <p className="text-blue-100 text-lg mb-8">
            هل لديك فكرة أو مشروع؟ يسعدنا التواصل معك.
          </p>

          <a
            href="mailto:info@example.com"
            className="inline-block bg-white text-blue-800 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition"
          >
            راسلنا الآن
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-6 text-center">
        <p>
          جميع الحقوق لاسم مشروعك
        </p>
      </footer>

    </main>
  );
}
