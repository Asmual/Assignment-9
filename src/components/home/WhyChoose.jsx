import Image from "next/image";
import { FaUserMd, FaRegCheckCircle, FaComments, FaHeartbeat } from "react-icons/fa";

export default function WhyChoose() {
  const features = [
    {
      id: 1,
      icon: <FaUserMd className="text-xl" />,
      title: "Certified & Experienced Doctors",
      description: "Consult with highly qualified, board-certified medical specialists with years of clinical experience.",
    },
    {
      id: 2,
      icon: <FaRegCheckCircle className="text-xl" />,
      title: "Easy & Instant Booking",
      description: "Skip the long queues. Book your preferred doctor's appointment online within just a few clicks.",
    },
    {
      id: 3,
      icon: <FaComments className="text-xl" />,
      title: "Friendly & Attentive Consultations",
      description: "Our doctors take the time to listen to your health concerns patiently and provide deep, caring guidance.",
    },
    {
      id: 4,
      icon: <FaHeartbeat className="text-xl" />,
      title: "Comprehensive Patient Care",
      description: "From routine checkups to specialized treatments, we ensure a premium healthcare experience for everyone.",
    },
  ];

  return (
    <section className="py-16 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-[#941865]">
              Why Choose DocAppoint?
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-xl leading-relaxed">
              We connect you with trusted healthcare professionals, ensuring a modern, seamless, and deeply compassionate medical journey.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((item) => (
              <div key={item.id} className="flex gap-4 items-start group">
                {/* Icon Wrapper */}
                <div 
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "#941865" }}
                >
                  {item.icon}
                </div>
                {/* Text Wrapper */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-800 transition-colors duration-200 group-hover:text-[#941865]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image Content */}
        <div className="relative h-75 sm:h-100 lg:h-125 w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
          <Image
            src="/images/why-choices.png"
            alt="Why Choose DocAppoint"
            fill
            priority
            sizes="(max-w-7xl) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}