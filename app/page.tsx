
const services = [
  {
    icon: "💡",
    title: "حلول مبتكرة",
    description:
      "نحوّل الأفكار إلى حلول عملية ومدروسة تساعدك على تطوير أعمالك وتحقيق أهدافك.",
    number: "01",
  },
  {
    icon: "🚀",
    title: "تطوير مستمر",
    description:
      "نواكب التغيير ونعمل باستمرار على تحسين خدماتنا لنقدم لك تجربة أفضل.",
    number: "02",
  },
  {
    icon: "🤝",
    title: "شراكة موثوقة",
    description:
      "نبني علاقات عمل طويلة الأمد تقوم على الثقة والشفافية والاهتمام بالتفاصيل.",
    number: "03",
  },
];

const benefits = [
  {
    icon: "✦",
    title: "جودة تستحق ثقتك",
    description: "نهتم بأدق التفاصيل ونحرص على تقديم نتائج تليق بتطلعاتك.",
  },
  {
    icon: "◷",
    title: "احترام وقتك",
    description: "نخطط جيدًا ونعمل بكفاءة لإنجاز الأعمال في الوقت المحدد.",
  },
  {
    icon: "♡",
    title: "اهتمام حقيقي",
    description: "نستمع إليك ونفهم احتياجاتك ونجعل رضاك أولوية.",
  },
];

export default function Home() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-slate-50 text-slate-800"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-xl font-bold text-white shadow-lg shadow-blue-700/20">
              م
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              اسم مشروعك
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="transition hover:text-blue-700">
              من نحن
            </a>
            <a href="#services" className="transition hover:text-blue-700">
              خدماتنا
            </a>
            <a href="#why-us" className="transition hover:text-blue-700">
              لماذا نحن؟
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
          >
            تواصل معنا
            <span className="mr-2">←</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate bg-gradient-to-bl from-slate-950 via-blue-950 to-blue-800 text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 md:grid-cols-2 md:py-32">
          <div>
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-100 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              أفكارك تستحق بداية مميزة
            </span>

            <h1 className="max-w-2xl text-4xl leading-[1.4] font-black tracking-tight sm:text-5xl md:text-6xl">
              نحوّل أفكارك
              <span className="block text-blue-300">إلى واقع ملموس</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-9 text-blue-100/90 sm:text-lg">
              نقدم حلولًا وخدمات مبتكرة تلبي احتياجاتك، ونسعى دائمًا إلى
              تقديم تجربة مميزة تضيف قيمة حقيقية لمشروعك.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-xl bg-white px-7 py-4 font-bold text-blue-900 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50"
              >
                ابدأ التواصل معنا
                <span className="mr-3">←</span>
              </a>
              <a
                href="#services"
                className="rounded-xl border border-white/30 bg-white/5 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                استكشف خدماتنا
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] bg-blue-400/10 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/15 pb-6">
                <div>
                  <p className="text-sm text-blue-200">رؤيتنا</p>
                  <h2 className="mt-2 text-2xl font-bold">نصنع الفرق معًا</h2>
                </div>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                  ✨
                </span>
              </div>

              <div className="space-y-5 pt-7">
                {[
                  ["الابتكار", "أفكار جديدة وحلول عملية", "💡"],
                  ["الجودة", "اهتمام بالتفاصيل والنتائج", "✦"],
                  ["الثقة", "علاقات مبنية على التعاون", "🤝"],
                ].map(([title, description, icon]) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">
                      {icon}
                    </span>
                    <div>
                      <h3 className="font-bold">{title}</h3>
                      <p className="mt-1 text-sm text-blue-100/75">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-xl bg-blue-400/15 px-5 py-4 text-center text-sm font-medium text-blue-100">
                معًا نحو مستقبل أفضل
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-l from-blue-300 via-indigo-300 to-transparent" />
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-bold text-blue-700">من نحن</span>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
            نؤمن أن النجاح يبدأ بفكرة
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-600">
            نحن فريق يسعى إلى تقديم خدمات متميزة وحلول عملية تساعد الأفراد
            والشركات على تحقيق طموحاتهم. نؤمن بأن الجودة والابتكار والاهتمام
            بالعميل هي أساس النجاح والاستمرارية.
          </p>
          <div className="mx-auto mt-8 h-1.5 w-20 rounded-full bg-blue-700" />
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="scroll-mt-24 border-y border-slate-200 bg-white px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="text-sm font-bold text-blue-700">
              خدماتنا
            </span>
            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
              كيف يمكننا مساعدتك؟
            </h2>
            <p className="mt-5 text-slate-500">
              نضع خبراتنا وأفكارنا لتقديم قيمة حقيقية لأعمالك.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10"
              >
                <span className="absolute left-7 top-7 text-sm font-bold text-slate-300">
                  {service.number}
                </span>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl transition group-hover:bg-blue-700 group-hover:scale-110">
                  <span className="transition group-hover:scale-110">
                    {service.icon}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-extrabold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-4 leading-8 text-slate-600">
                  {service.description}
                </p>
                <div className="mt-7 h-1 w-12 rounded-full bg-blue-700 transition-all group-hover:w-24" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section
        id="why-us"
        className="scroll-mt-24 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="text-sm font-bold text-blue-700">
              ما يميزنا
            </span>
            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
              لماذا تختارنا؟
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl font-bold text-blue-700">
                  {benefit.icon}
                </div>
                <h3 className="mt-6 text-lg font-extrabold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs leading-8 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 bg-gradient-to-bl from-blue-900 to-indigo-950 px-5 py-20 text-white sm:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-bold text-blue-300">
            الخطوة التالية تبدأ منك
          </span>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            لنعمل معًا ونصنع شيئًا مميزًا
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-9 text-blue-100">
            هل لديك فكرة أو مشروع؟ يسعدنا الاستماع إليك ومناقشة كيف يمكننا
            مساعدتك في تحويل طموحاتك إلى واقع.
          </p>
          <a
            href="mailto:info@example.com"
            className="mt-9 inline-flex items-center rounded-xl bg-white px-8 py-4 font-bold text-blue-900 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50"
          >
            راسلنا الآن
            <span className="mr-3 text-xl">←</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-8 text-center text-sm text-slate-400">
        <p>
          © 2026 اسم مشروعك. جميع الحقوق محفوظة.
        </p>
      </footer>
    </main>
  );
}
