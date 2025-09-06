import { useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "आवाज़ से सवाल",
    img: "https://images.pexels.com/photos/18925493/pexels-photo-18925493.jpeg",
    desc: "फोन में बोलें, तुरंत जवाब पाएं",
  },
  {
    title: "बीमारी की पहचान",
    img: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg",
    desc: "फसल की फोटो लें और पहचानें",
  },
  {
    title: "बाजार के भाव",
    img: "https://images.pexels.com/photos/15970244/pexels-photo-15970244.jpeg",
    desc: "आज के मंडी भाव देखें",
  },
  {
    title: "मौसम जानकारी",
    img: "https://images.pexels.com/photos/11194861/pexels-photo-11194861.jpeg",
    desc: "बारिश, तापमान, हवा का पूर्वानुमान",
  },
];

export default function Carousel3D() {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative">
          <Carousel setApi={(a) => {
            setApi(a);
            a?.on("select", () => setIndex(a.selectedScrollSnap()))
          }}
          opts={{ loop: true, align: "center" }}
          className="[perspective:1200px]">
            <CarouselContent>
              {slides.map((s, i) => (
                <CarouselItem key={s.title} className="md:basis-1/2 lg:basis-1/3">
                  <TiltCard title={s.title} img={s.img} desc={s.desc} active={i === index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/70 dark:bg-black/50 border-0 shadow" />
            <CarouselNext className="bg-white/70 dark:bg-black/50 border-0 shadow" />
          </Carousel>
          <div className="mt-4 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${i === index ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltCard({ title, img, desc, active }: { title: string; img: string; desc: string; active: boolean }) {
  const [xy, setXy] = useState({ x: 0, y: 0 });
  return (
    <motion.article
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setXy({ x: px, y: py });
      }}
      onMouseLeave={() => setXy({ x: 0, y: 0 })}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative h-64 sm:h-80 rounded-3xl overflow-hidden border border-border bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-xl transition-transform duration-300 ${active ? "" : "opacity-90"}`}
      animate={{ rotateY: xy.x * 8, rotateX: -xy.y * 8 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})`, transform: "translateZ(-40px) scale(1.1)" }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
        <p className="text-sm text-white/90">{desc}</p>
      </div>
    </motion.article>
  );
}
