import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BG_URL = "https://images.pexels.com/photos/11194861/pexels-photo-11194861.jpeg";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const leftX = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative h-[80svh] sm:h-[90svh] overflow-clip">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BG_URL})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 flex flex-col items-center justify-center text-center text-white">
        <div className="w-full">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1]">
            <motion.span style={{ x: leftX }} className="inline-block">
              KissanAI के साथ हिंदी में बोलकर
            </motion.span>
            <br className="hidden sm:block" />
            <motion.span style={{ x: rightX }} className="inline-block text-primary">
              अपनी खेती को बेहतर बनाएं
            </motion.span>
          </h1>
          <p className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl text-white/90">
            आवाज़ और तस्वीर से पूछें, तुरंत जवाब पाएं
          </p>
        </div>
      </div>
      <div className="absolute -bottom-8 left-0 right-0 h-16 rounded-t-[40px] bg-background/90 backdrop-blur border-t border-border" />
    </section>
  );
}
