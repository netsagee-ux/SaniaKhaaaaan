import { Inter, Playfair_Display } from "next/font/google";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

/* ================= Fonts ================= */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

export default function Footer() {
  return (
    <footer className={`${inter.className} bg-[#e9e5df] pt-24 pb-10`}>
      <div className="max-w-6xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* LEFT SIDE */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center text-white text-sm">
                ✷
              </div>
              <span className="font-semibold text-lg">viral</span>
            </div>

            <h3 className="text-2xl leading-snug mb-3">
              Social media that <br />
              drives{" "}
              <span className={playfair.className}>
                real results
              </span>
            </h3>

            <p className="text-neutral-600 mb-6">
              Built for creators, businesses, and brands.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
              >
                <FaXTwitter size={16} />
              </a>

              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* NAVIGATE */}
          <div>
            <h4 className="font-semibold mb-5">Navigate</h4>
            <ul className="space-y-3 text-neutral-600">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h4 className="font-semibold mb-5">Connect</h4>
            <ul className="space-y-3 text-neutral-600">
              <li><a href="/contact">Book a call</a></li>
              <li><a href="https://instagram.com">Instagram</a></li>
              <li><a href="https://linkedin.com">LinkedIn</a></li>
              <li><a href="https://twitter.com">Twitter</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="font-semibold mb-5">Legal</h4>
            <ul className="space-y-3 text-neutral-600">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/404">404</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-black/10 mt-16 pt-6 flex flex-col md:flex-row justify-between text-sm text-neutral-600">
          <p>© 2026 Sania. Created by Ahmad Baloch.</p>
          <p className="mt-2 md:mt-0">Built with heart ❤️</p>
        </div>

      </div>
    </footer>
  );
}