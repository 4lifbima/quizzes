import { Button } from "flowbite-react";
import heroImage from "@/assets/images/hero2.png";
import { getUser } from "@/services/userService";
import { useNavigate } from "react-router-dom";
import { HiOutlineSparkles, HiOutlineDocumentDuplicate, HiOutlineDocumentArrowDown, HiOutlineAdjustmentsHorizontal, HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

export default function Home() {
  const user = getUser();
  const navigate = useNavigate();

  const features = [
    {
      icon: HiOutlineSparkles,
      title: "AI Generated",
      description: "Soal dibuat otomatis dengan teknologi Gemini AI yang canggih"
    },
    {
      icon: HiOutlineDocumentDuplicate,
      title: "Soal Unik",
      description: "Setiap siswa mendapat variasi soal yang berbeda untuk mencegah mencontek"
    },
    {
      icon: HiOutlineDocumentArrowDown,
      title: "Export PDF",
      description: "Unduh dan cetak soal dalam format PDF yang rapi dan siap pakai"
    },
    {
      icon: HiOutlineAdjustmentsHorizontal,
      title: "Kustomisasi",
      description: "Atur tingkat kesulitan dan jumlah soal sesuai kebutuhan"
    }
  ];

  const steps = [
    {
      number: "01",
      icon: HiOutlineAcademicCap,
      title: "Pilih Mata Pelajaran",
      description: "Tentukan jenjang, mata pelajaran, dan materi yang ingin dibuat soalnya"
    },
    {
      number: "02",
      icon: HiOutlineLightBulb,
      title: "Generate dengan AI",
      description: "AI akan membuat soal unik berdasarkan kriteria yang Anda tentukan"
    },
    {
      number: "03",
      icon: HiOutlineClipboardDocumentCheck,
      title: "Review & Export",
      description: "Periksa hasilnya, lalu unduh dalam format PDF atau simpan untuk nanti"
    }
  ];

  const stats = [
    { value: "10+", label: "Mata Pelajaran" },
    { value: "1000+", label: "Soal Dibuat" },
    { value: "100%", label: "Gratis" },
    { value: "∞", label: "Variasi Soal" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23e5e7eb' stroke-width='1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        ></div>

        {/* Soft Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gray-200/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gray-300/40 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-gray-200/60 rounded-full blur-3xl"></div>

        <div className="relative flex flex-col lg:flex-row items-center px-5 sm:px-20 py-20 lg:py-32 gap-12">
          <div className="lg:basis-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2">
              <HiOutlineSparkles className="text-[#1F2937]" />
              <span className="text-[#1F2937] text-sm font-medium">Powered by Gemini AI</span>
            </div>
            <div className="space-y-5">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Buat Soal <span className="text-[#1F2937] underline decoration-4 decoration-gray-300">Unik</span> untuk Setiap Siswa
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                Quizzes membantu guru membuat soal yang dapat disesuaikan untuk berbagai mata pelajaran dan tingkat kesulitan. Hasilkan soal berbeda untuk setiap siswa dalam hitungan detik.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => navigate(user ? '/dashboard/generate' : '/login')}
                size="xl"
                style={{ backgroundColor: '#1F2937' }}
                className="font-semibold hover:opacity-90 border-0 focus:ring-gray-400"
              >
                Buat Soal Sekarang
              </Button>
              <Button
                onClick={() => navigate('/about')}
                color="light"
                size="xl"
                className="font-semibold border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
          <div className="lg:basis-1/2 flex justify-center hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gray-200 rounded-3xl blur-2xl opacity-60"></div>
              <img src={heroImage} alt="Hero Image" className="relative max-w-md lg:max-w-lg drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1F2937]">
        <div className="px-5 sm:px-20 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-gray-300 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="px-5 sm:px-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-gray-600 text-lg">
              Semua yang Anda butuhkan untuk membuat soal berkualitas dengan cepat dan mudah
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-6 bg-gray-50 rounded-2xl hover:bg-[#1F2937] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#1F2937] group-hover:bg-white flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
                  <feature.icon className="text-white group-hover:text-[#1F2937] text-2xl transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="px-5 sm:px-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cara Kerja
            </h2>
            <p className="text-gray-600 text-lg">
              Tiga langkah mudah untuk membuat soal dengan AI
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-[#1F2937]"></div>
                )}
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-6xl font-bold text-gray-100 absolute top-4 right-6">
                    {step.number}
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-[#1F2937] flex items-center justify-center mb-6">
                      <step.icon className="text-white text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-white py-20">
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23e5e7eb' stroke-width='1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Soft Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-100/60 rounded-full blur-3xl"></div>

        <div className="relative px-5 sm:px-20 justify-center text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Siap Membuat Soal dengan AI?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Mulai buat soal unik untuk siswa Anda sekarang. Gratis dan tanpa batas!
          </p>
          <Button
            onClick={() => navigate(user ? '/dashboard/generate' : '/login')}
            size="xl"
            style={{ backgroundColor: '#1F2937' }}
            className="font-semibold hover:opacity-90 border-0 focus:ring-gray-400 px-10 absolute left-1/2 -translate-x-1/2 text-center"
          >
            Mulai Sekarang!
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2937] py-8">
        <div className="px-5 sm:px-20 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Quizzes. Dibuat dengan ❤️ untuk pendidikan Indonesia.
          </p>
        </div>
      </footer>
    </>
  );
}
