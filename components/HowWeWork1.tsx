import { Playfair_Display, Inter } from "next/font/google";

/* ================= Fonts ================= */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

export default function TestimonialSection() {
  return (
    <section className="w-full bg-[#e9e5df] py-40">
      <div
        className="
          max-w-7xl
          mx-auto
          px-8
          grid
          md:grid-cols-2
          xl:grid-cols-[1.3fr_0.7fr]
          gap-24
          items-center
        "
      >

        {/* LEFT CARD */}
        <div
          className="
            relative
            bg-[#E6E1DA]
            rounded-[36px]
            px-20
            py-20
          "
        >

          <div
            className="
              absolute
              -top-10
              left-16
              w-[76px]
              h-[76px]
              bg-black
              rounded-2xl
              flex
              items-center
              justify-center
              text-white
              text-[36px]
            "
          >
            “
          </div>

          <p
            className={`
              ${inter.className}
              text-[28px]
              md:text-[32px]
              xl:text-[36px]
              leading-[1.35]
              font-semibold
              text-black
            `}
          >
            They helped turn our concept into a beautifully
            functional product and guided us through every
            design decision. Our customers have never been{" "}
            <span className={playfair.className}>
              more satisfied
            </span>
            <span
              className="
                inline-block
                w-4 h-4
                bg-black
                rounded-full
                ml-2
                translate-y-[3px]
              "
            ></span>
          </p>

          <p className="mt-12 text-[#7A766F] text-[16px]">
            Ahmed Raza • Consumer Electronics Founder
          </p>
        </div>

        {/* RIGHT VIDEO */}
        <div>
          <div
            className="
              relative
              h-[480px]
              overflow-hidden
              rounded-[10px]
            "
          >

            <video
              src="https://framerusercontent.com/assets/6XfEmiD6m02yjpZAyc2nDmmOA.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="
                w-full
                h-full
                object-cover
                rounded-[10px]
              "
            />

          </div>
        </div>

      </div>
    </section>
  );
}