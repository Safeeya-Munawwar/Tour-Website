import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

export const experiences = [
  {
    slug: "yoga-meditation",
    title: "Yoga & Meditation",
    subtitle: "Spiritual Retreats",
    heroImg: "/images/yoga.jpg",
    mainImg: "/images/yoga-main.jpg",
    mainDesc: `Sri Lanka is all about the best things in life in one tiny place. Yoga, just like Ayurveda, has a special place here, its authenticity and Vedic tradition intact. Yoga and meditation need tranquility and gratifying natural beauty, and the island provides them both with Yoga retreats Sri Lanka scattered along its glorious coast to its wilderness havens. Yoga is a more holistic experience here that focuses on both physical and spiritual wellbeing rather than the watered-down versions that heavily rely on its physical aspect.`,
    subDesc: `Sunrise yoga on the beach or meditating in repose overlooking verdant hills, guided by skilled teachers enhances the experience of attaining serenity. Even the cuisine served in most yoga retreats are made for healthier and wholesome dining in par with Ayurvedic practices that go hand in hand with yoga. You can include other activities to go with your yoga holiday, even surfing, and Soul and Surf Sri Lanka is one such example.`,
    subExperiences: [
      {
        location: "Yoga in the wilderness",
        place: "Ulpotha",
        img: "/images/ulpotha.jpg",
        desc: "The north-central plains of the island were the centre of spiritual awakening in Sri Lanka, and it plays host to several retreats built inside forests and old villages. Ulpotha among them is extraordinary.",
      },
      {
        location: "Yoga in the hills",
        place: "Belihuloya / Santani",
        img: "/images/belihuloya-santani.jpg",
        desc: "The cool tea-country with its rolling green hills, misty waterfalls, and sweeping views is inspirational for yoga and meditation. You can even climb the sacred Adam’s Peak. Santani is a unique retreat here.",
      },
      {
        location: "Yoga on the south coast",
        place: "Talalla, Tri, Sen",
        img: "/images/talalla-tri-sen.jpg",
        desc: "It is perhaps the most popular yoga destination on the island. Talalla Retreat in Sri Lanka offers yoga and surfing, while Tri overlooking Koggala Lake, and Sen on Rekawa beach are exceptional retreats.",
      },
      {
        location: "Yoga on the Northwest Coast",
        place: "Kalpitiya / Wilpattu",
        img: "/images/kalpitiya-wilpattu.jpg",
        desc: "The remote northwest coast of the island offers less-known beachside, and wildlife getaways in Kalpitiya the peninsula, and at Wilpattu National Park. The Mudhouse and Dolphin Beach offer yoga programmes.",
      },
      {
        location: "Yoga and Ayurveda",
        place: "Barberyn & Siddhalepa",
        img: "/images/barberyn-siddhalepa.jpg",
        desc: "Sri Lanka is perfect for combining Ayurveda with yoga, as many Ayurveda retreats also offer yoga and meditation. Barberyn Reef and Barberyn Beach, and Siddhalepa Ayurveda Hotel are among the best.",
      },
      {
        location: "Yoga and surfing",
        place: "Ahangama / Talalla",
        img: "/images/ahangama-talalla.jpg",
        desc: "Sri Lanka is one of the best surf destinations in tropical Asia and has successfully married it with yoga. Soul and Surf for yoga Ahangama, Talalla retreat, and surf and yoga camps offer a mix of the two.",
      },
    ],
    gallery: [
      "/images/gallery1.jpg",
      "/images/gallery2.jpg",
      "/images/gallery3.jpg",
      "/images/gallery4.jpg",
      "/images/gallery5.jpg",
      "/images/gallery6.jpg",
    ],
    tips: [
      "Find places with qualified yoga teachers",
      "Do not be discouraged by the disciplined regime",
      "Add other activities to your itinerary",
      "Go sightseeing for more inspiration",
      "Read about yoga",
      "Travel with pro-yoga friends for support",
      "Plan a tour with this experience",
    ],
  },
  {
    slug: "weddings-in-the-sun",
    title: "Weddings in the Sun",
    subtitle: "Exotic Wedding Destinations",
    heroImg: "/images/wedding.jpg",
    mainImg: "/images/wedding-main.jpg",
    mainDesc: `As far as exotic wedding destinations go, Sri Lanka trumps all others. Get married on golden beaches, in jungle settings, or colonial-era hotels.`,
    subDesc: `You can combine traditional ceremonies with beach parties, luxury resorts, and scenic photography for memories that last a lifetime.`,
    subExperiences: [
      {
        location: "Beach Weddings",
        place: "Talalla Beach",
        img: "/images/wedding-talalla.jpg",
        desc: "Golden sands and sunset views make Talalla a perfect beach wedding location.",
      },
      {
        location: "Hotel Weddings",
        place: "Galle Fort Hotels",
        img: "/images/wedding-galle.jpg",
        desc: "Colonial-era hotels in Galle offer a mix of heritage and elegance for your big day.",
      },
    ],
    gallery: [
      "/images/wedding1.jpg",
      "/images/wedding2.jpg",
      "/images/wedding3.jpg",
      "/images/wedding4.jpg",
      "/images/wedding5.jpg",
      "/images/wedding6.jpg",
    ],
    tips: [
      "Book early for peak season",
      "Consider a wedding planner",
      "Plan both ceremony and reception",
      "Include scenic photography options",
    ],
  },
  {
    slug: "ayurveda-spa-therapy",
    title: "Ayurveda & Spa Therapy",
    subtitle: "Wellness & Healing",
    heroImg: "/images/ayurveda.jpg",
    mainImg: "/images/ayurveda-main.jpg",
    mainDesc: `Ayurveda Sri Lanka credentials go back thousands of years. Indian Ayurveda and indigenous knowledge shaped the authentic wellness therapies here.`,
    subDesc: `Enjoy massages, herbal treatments, and meditation programs at traditional Ayurveda retreats across the island.`,
    subExperiences: [
      {
        location: "Ayurveda Retreats",
        place: "Barberyn Beach",
        img: "/images/barberyn-ayurveda.jpg",
        desc: "World-class Ayurvedic therapies combined with serene coastal views.",
      },
      {
        location: "Spa Therapy",
        place: "Santani Wellness",
        img: "/images/santani-spa.jpg",
        desc: "Luxury spa experiences integrated with local wellness practices.",
      },
    ],
    gallery: [
      "/images/ayurveda1.jpg",
      "/images/ayurveda2.jpg",
      "/images/ayurveda3.jpg",
      "/images/ayurveda4.jpg",
      "/images/ayurveda5.jpg",
      "/images/ayurveda6.jpg",
    ],
    tips: [
      "Book treatments in advance",
      "Follow wellness guidelines",
      "Combine with yoga or meditation",
    ],
  },
  {
    slug: "shopping-sprees",
    title: "Shopping Sprees",
    subtitle: "Colombo Pettah & Local Markets",
    heroImg: "/images/shopping.jpg",
    mainImg: "/images/shopping-main.jpg",
    mainDesc: `Precious gemstones, batiks, saris, sarongs, figurines, Buddha statues, spices, or tea — Sri Lanka does not disappoint.`,
    subDesc: `From bustling Colombo markets to small local bazaars, find authentic souvenirs and crafts.`,
    subExperiences: [
      {
        location: "Market Exploration",
        place: "Colombo Pettah",
        img: "/images/pettah.jpg",
        desc: "Experience the vibrant colors and energy of Pettah markets.",
      },
      {
        location: "Local Crafts",
        place: "Kandy",
        img: "/images/kandy-crafts.jpg",
        desc: "Handmade crafts and batiks from local artisans.",
      },
    ],
    gallery: [
      "/images/shopping1.jpg",
      "/images/shopping2.jpg",
      "/images/shopping3.jpg",
      "/images/shopping4.jpg",
      "/images/shopping5.jpg",
      "/images/shopping6.jpg",
    ],
    tips: ["Carry cash", "Bargain politely", "Explore different markets"],
  },
  {
    slug: "delish-culinary",
    title: "Delish Culinary",
    subtitle: "Sri Lankan Cuisine",
    heroImg: "/images/food.jpg",
    mainImg: "/images/food-main.jpg",
    mainDesc: `The exotic aromas of Sri Lankan cuisine are distinctively delectable. Rice and curry is the staple, with influences from Southeast Asia.`,
    subDesc: `Experience cooking classes, street food tours, and fine dining across Sri Lanka.`,
    subExperiences: [
      {
        location: "Street Food",
        place: "Colombo",
        img: "/images/food-colombo.jpg",
        desc: "Taste authentic Sri Lankan street food in the heart of Colombo.",
      },
      {
        location: "Fine Dining",
        place: "Galle Fort",
        img: "/images/food-galle.jpg",
        desc: "Enjoy gourmet meals with local flavors in heritage settings.",
      },
    ],
    gallery: [
      "/images/food1.jpg",
      "/images/food2.jpg",
      "/images/food3.jpg",
      "/images/food4.jpg",
      "/images/food5.jpg",
      "/images/food6.jpg",
    ],
    tips: [
      "Try local specialties",
      "Visit night markets",
      "Take cooking classes",
    ],
  },
  {
    slug: "traditional-arts-crafts",
    title: "Traditional Arts & Crafts",
    subtitle: "Local Artistry",
    heroImg: "/images/crafts.jpg",
    mainImg: "/images/crafts-main.jpg",
    mainDesc: `The story of Sri Lanka’s arts and crafts comes from one of the oldest civilizations in the world.`,
    subDesc: `Explore artisan workshops, pottery villages, and traditional weaving centers.`,
    subExperiences: [
      {
        location: "Pottery & Crafts",
        place: "Matale",
        img: "/images/matale-crafts.jpg",
        desc: "Traditional pottery and weaving workshops.",
      },
      {
        location: "Local Artisans",
        place: "Kandy",
        img: "/images/kandy-artisans.jpg",
        desc: "Handmade crafts passed through generations.",
      },
    ],
    gallery: [
      "/images/crafts1.jpg",
      "/images/crafts2.jpg",
      "/images/crafts3.jpg",
      "/images/crafts4.jpg",
      "/images/crafts5.jpg",
      "/images/crafts6.jpg",
    ],
    tips: [
      "Support local artisans",
      "Learn techniques",
      "Visit craft villages",
    ],
  },
  {
    slug: "sporting-breaks",
    title: "Sporting Breaks",
    subtitle: "Adventure & Water Sports",
    heroImg: "/images/surfing.jpg",
    mainImg: "/images/surfing-main.jpg",
    mainDesc: `Sri Lanka’s landscape offering sun, sea, mountains, rivers, waterfalls, jungles, and rough terrains sets the scene for sporting activities of all kinds.`,
    subDesc: `Surfing, diving, trekking, and extreme sports are available in multiple regions.`,
    subExperiences: [
      {
        location: "Surfing",
        place: "Arugam Bay",
        img: "/images/arugam-surf.jpg",
        desc: "World-famous surfing destination on the east coast.",
      },
      {
        location: "Adventure Sports",
        place: "Nuwara Eliya",
        img: "/images/nuwara-adventure.jpg",
        desc: "Mountain treks, river rafting, and more.",
      },
    ],
    gallery: [
      "/images/surfing1.jpg",
      "/images/surfing2.jpg",
      "/images/surfing3.jpg",
      "/images/surfing4.jpg",
      "/images/surfing5.jpg",
      "/images/surfing6.jpg",
    ],
    tips: [
      "Follow safety guidelines",
      "Hire certified instructors",
      "Combine with sightseeing",
    ],
  },
  {
    slug: "colourful-culture",
    title: "Colourful Culture",
    subtitle: "Ancient Heritage",
    heroImg: "/images/culture.jpg",
    mainImg: "/images/culture-main.jpg",
    mainDesc: `Sri Lankan culture steeped in Buddhism has religious roots going back to the 3rd Century BC. From Anuradhapura to Kandy, heritage is everywhere.`,
    subDesc: `Participate in cultural festivals, temple visits, and traditional performances.`,
    subExperiences: [
      {
        location: "Heritage Sites",
        place: "Anuradhapura",
        img: "/images/anuradhapura.jpg",
        desc: "Explore ancient temples and ruins.",
      },
      {
        location: "Cultural Shows",
        place: "Kandy",
        img: "/images/kandy-show.jpg",
        desc: "Attend traditional dances and performances.",
      },
    ],
    gallery: [
      "/images/culture1.jpg",
      "/images/culture2.jpg",
      "/images/culture3.jpg",
      "/images/culture4.jpg",
      "/images/culture5.jpg",
      "/images/culture6.jpg",
    ],
    tips: ["Respect local customs", "Hire guides", "Visit festivals"],
  },
  {
    slug: "exhilarating-adventures",
    title: "Exhilarating Adventures",
    subtitle: "Jungle & Mountain Treks",
    heroImg: "/images/adventure.jpg",
    mainImg: "/images/adventure-main.jpg",
    mainDesc: `Sri Lanka’s landscape with jungles, mountains, giant rocks, rivers, rainforests, and hills is a paradise for adventure seekers.`,
    subDesc: `Hiking, rock climbing, wildlife safaris, and camping offer adrenaline-filled experiences across the island.`,
    subExperiences: [
      {
        location: "Jungle Treks",
        place: "Sinharaja",
        img: "/images/sinharaja.jpg",
        desc: "Explore the lush rainforest on guided treks.",
      },
      {
        location: "Mountain Treks",
        place: "Knuckles Range",
        img: "/images/knuckles.jpg",
        desc: "Hiking through scenic mountains and valleys.",
      },
    ],
    gallery: [
      "/images/adventure1.jpg",
      "/images/adventure2.jpg",
      "/images/adventure3.jpg",
      "/images/adventure4.jpg",
      "/images/adventure5.jpg",
      "/images/adventure6.jpg",
    ],
    tips: [
      "Hire guides for safaris",
      "Wear suitable gear",
      "Combine treks with cultural sites",
    ],
  },
];

export default function ExperienceDetail() {
  const { slug } = useParams();
  const experience = experiences.find((exp) => exp.slug === slug);
  const [showText, setShowText] = useState(false);
  const otherExperiences = experiences.filter((exp) => exp.slug !== slug);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  if (!experience) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Experience Not Found</h2>
      </div>
    );
  }

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO ---------------------------- */}
      <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('${
            experience.heroImg || "/images/info5.JPEG"
          }')`,
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div
          className={`absolute bottom-10 right-10 w-[440px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            {experience.title}
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>

      {/* ---------------------------- MAIN SECTION ---------------------------- */}
      <section className="max-w-7xl mx-auto px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={experience.mainImg}
            alt={experience.title}
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {experience.title}
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {experience.mainDesc}
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {experience.subDesc}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate(`/experience`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition flex items-center gap-2"
            >
              Explore More
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate("/tailor-made-tours")}
              className="bg-[#ce2a40] hover:bg-[#ef0530] text-white uppercase px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-colors duration-300 justify-center"
            >
              Tailor-make a Tour
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------- SUB EXPERIENCES ---------------------------- */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Where you can experience
          </h3>
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto">
            Explore the destinations where this unique experience comes to life,
            from hidden gems to iconic locales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {experience.subExperiences.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.img}
                alt={item.place}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.location}
                </h4>
                <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                <button className="text-yellow-600 font-semibold text-sm hover:underline">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------- LOCATION GALLERY ---------------------------- */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
            Location Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0">
            {experience.gallery.map((img, idx) => (
              <div key={idx} className="overflow-hidden">
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- TIPS & RELATED TOURS ---------------------------- */}
      <section className="max-w-7xl mx-auto px-32 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20">
        {/* Left - Tips + Button */}
        <div className="flex flex-col justify-between bg-[#b4c5df] p-8 rounded-xl shadow-md">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Tips to Remember
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              {experience.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center lg:justify-center">
            <button
              onClick={() => navigate("/tailor-made-tours")}
              className="
          bg-[#ce2a40] hover:bg-[#ef0530]
          text-white uppercase px-6 py-3 rounded-full font-semibold flex items-center gap-2 text-sm
          shadow-lg transition-colors duration-300
          justify-center
        "
            >
              Start Planning Your Trip
              <Calendar className="w-4" />
            </button>
          </div>
        </div>

        {/* Right - Related Tours */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Related Tours & Itineraries
          </h3>
          <p className="list-disc list-inside space-y-3 text-gray-700 text-center mb-6">
            Discover similar journeys and curated itineraries that include this
            unforgettable experience.
          </p>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            loop
            autoplay={{ delay: 3000 }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
          >
            {otherExperiences.map((exp, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={exp.heroImg}
                    alt={exp.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {exp.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">{exp.subtitle}</p>
                    <a
                      href={`/experience/${exp.slug}`}
                      className="mt-3 inline-block text-[#8C1F28] font-semibold text-sm hover:underline"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
