import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ✅ Correct
import "swiper/css";
import { useRef, useState } from "react";

const slides = [
  { image: "/40.jpg", title: "Kuttam Pokuna", desc: "Ancient royal bathing ponds in Anuradhapura." },
  { image: "/41.jpg", title: "Ruwanweliseya", desc: "A magnificent stupa with historical significance." },
  { image: "/43.jpg", title: "Jethawanaramaya", desc: "Tallest stupa in Sri Lanka, a Buddhist landmark." },
  { image: "/45.jpg", title: "Mirisavetiya", desc: "Historic temple with royal connections." },
  { image: "/d1.jpg", title: "Brazen Temple", desc: "Ancient temple ruins with cultural heritage." },
];

export default function TourDetail() {
 const [activeIndex, setActiveIndex] = useState(0);
  const innerSwiperRef = useRef();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white">
        {/* LEFT IMAGE WRAPPER */}
        <div
          className="
            w-full md:w-1/2 h-80 md:h-full 
            overflow-hidden 
            rounded-r-[45%] 
            relative
          "
        > 
          <img
            src="/d1.jpg"
            alt="Anuradhapura"
            className="
              absolute inset-0 
              w-full h-full 
              object-cover object-center
            "
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 mt-20">
          {/* TITLE */}
          <h1
            className="
              font-playfair 
              text-5xl md:text-6xl 
              font-bold 
              leading-[1.05] 
              tracking-[-1px]
              max-w-xl
            "
          >
            Anuradhapura
            <span className="block">Day Tour</span>
          </h1>

          {/* SUBTITLE */}
          <p
            className="
              font-playfair 
              text-2xl md:text-3xl 
              text-gray-700 
              mt-6 
              leading-snug 
              tracking-[-0.5px]
              max-w-xl
            "
          >
            Go deep into Sri Lankan history
            <br />
            with an <strong>Anuradhapura Day Tour...</strong>
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-sm font-semibold">
              EXPLORE DESTINATIONS
            </button>

            <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-sm font-semibold">
              BOOK THIS TOUR
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="w-full px-6 md:px-32 py-10 mt-14 text-center">
        <p
          className="
            font-inter 
            text-base
            leading-relaxed 
            text-gray-800 
            max-w-5xl mx-auto
            tracking-tight
          "
        >
          The ancient city of Anuradhapura is a UNESCO World Heritage Site
          because of its well-preserved historical ruins dating back to the
          CENTURIES (4th century BC – 11th century AD) during which it remained
          the capital of Sri Lanka. Anuradhapura was also the center of
          Theravada Buddhism for many centuries and is known today as one of the
          oldest inhabited cities of the world.
        </p>

        <div className="my-10"></div>

        <p
          className="
            font-inter 
            text-base
            leading-relaxed 
            text-gray-800 
            max-w-5xl mx-auto
            tracking-tight
          "
        >
          Located in the North central province of the island, Anuradhapura is
          about 205kms north of Colombo. The city continuously draws millions of
          tourists to the sites of ancient ruins – which are the most expressive
          and unmatchable sites in all of South Asia. A magnificent collection of
          architectural and archaeological marvels include massive dagobas,
          crumbling temples, giant brick towers, and archaic pools that were
          constructed during the several thousand years that the Kingdom of
          Anuradhapura ruled the nation. At present, these sites that you will
          visit on your Anuradhapura day tour are used mostly as temples and
          holy places hence should be given respect at all times.
        </p>
      </section>

      {/* HISTORICAL SECTION */}
      <section className="w-full px-6 md:px-32 py-10 mt-6">
        <h2
          className="
            font-playfair 
            text-4xl 
            leading-tight 
            tracking-[-1px]
            mb-10
          "
        >
          Historical prominence of Anuradhapura
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base leading-relaxed">
          {/* LEFT COLUMN */}
          <ul className="list-disc pl-5 space-y-1">
            <li>
              4th century BC was when Anuradhapura became the capital of ancient
              Lanka – during the reign of King Pandukhabaya.
            </li>
            <li>
              Buddhism was introduced in the 3rd century BC – during the reign
              of King Devanampiyatissa.
            </li>
            <li>
              King Tissa built the country’s first Stupa to house the relic of
              Buddha’s right collarbone.
            </li>
            <li>
              He also planted the sacred Bo Sapling brought by Princess
              Sangamitta.
            </li>
          </ul>

          {/* RIGHT COLUMN */}
          <ul className="list-disc pl-5 space-y-1">
            <li>
              King Tissa built irrigation tanks and a man-made lake (still in
              use today) to develop inland agriculture.
            </li>
            <li>
              Towards the end of the 3rd century, King Mahasena built 16
              irrigation tanks and the tallest stupa: Jethavanaramaya.
            </li>
            <li>
              In the 2nd century BC, King Dutugemunu successfully recaptured the
              city whenever it fell to invading Indian armies.
            </li>
            <li>
              King Dutugemunu’s reign saw a massive construction boost including
              monuments such as Ruwanweliseya Stupa, Mirisavetiya Temple, and
              the Brazen Temple.
            </li>
          </ul>
        </div>
      </section>
 <h2
          className="
            font-playfair 
            text-4xl 
            leading-tight 
            tracking-[-1px]
            mb-10
            text-center
            mt-10
          "
        >
          Gallery
        </h2>
<section className="relative w-full h-[600px] px-10 py-10 flex items-center">
   
  {/* Main Background Slider */}
  <Swiper
    modules={[Autoplay]}
    autoplay={{ delay: 4000, disableOnInteraction: false }}
    loop={true}
    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
    className="h-full w-full"
  >
    {slides.map(({ image, title,desc }, index) => (
      <SwiperSlide key={index}>
        <div className="relative h-full w-full">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover brightness-[0.6]"
          />

          {/* Title & Subtitle on right side */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-1/3 text-white flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold">
              {title}
            </h2>
            <p className="text-sm md:text-base">
             {desc}
            </p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Inner Bottom Left Slider */}
  <div className="absolute bottom-10 left-10 w-[500px] px-4 py-4">
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      slidesPerView={3}
      spaceBetween={10}
      ref={innerSwiperRef}
      initialSlide={activeIndex}
      className="h-52"
    >
      {slides.map(({ image, title }, index) => (
        <SwiperSlide key={index}>
          <div className="h-full w-full relative rounded overflow-hidden cursor-pointer">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs text-center py-1">
              {title}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>


    </>
  );
}
