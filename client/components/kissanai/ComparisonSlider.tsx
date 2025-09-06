import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Mic, Camera } from "lucide-react";

const LEFT_URL = "https://cdn.builder.io/api/v1/image/assets%2F823f55bf46824ad3a2e7751fa8fe2b67%2F6037ea33a0c94512965ad23e1717c9bc?format=webp&width=800"; // farmer with tablet
const RIGHT_URL = "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg"; // rice close-up

export default function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const [pos, setPos] = useState(0.5); // 0..1

  useEffect(() => {
    const update = () => {
      const w = containerRef.current?.clientWidth || 0;
      setWidth(w);
      x.set(w * pos);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pos, x]);

  const onDrag = (_: any, info: { point: { x: number } }) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const next = Math.min(1, Math.max(0, (info.point.x - rect.left) / rect.width));
    setPos(next);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="sr-only">आवाज़ बनाम फोटो</h2>
        <div ref={containerRef} className="relative h-[420px] sm:h-[520px] rounded-2xl overflow-hidden border border-border bg-muted">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${RIGHT_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

          {/* Left overlay */}
          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: width * pos }}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${LEFT_URL})` }} />
            <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/30 to-transparent" />
          </div>

          {/* Left content */}
          <div className="absolute inset-0 p-5 sm:p-8 flex">
            <div className="w-[min(90%,calc(100%_*_var(--pos)))]" style={{ ['--pos' as any]: pos }}>
              <div className="max-w-sm text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <Mic className="h-4 w-4" />
                  <span className="text-sm">आवाज़ की सुविधा</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold">बोलकर पूछें</h3>
                <ul className="mt-2 space-y-1 text-white/90 text-sm sm:text-base">
                  <li>• आज का मौसम कैसा है?</li>
                  <li>• गेहूं का भाव क्या है?</li>
                  <li>• खाद कब डालना चाहिए?</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="absolute inset-0 p-5 sm:p-8 flex justify-end text-right">
            <div className="max-w-sm text-white ml-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <Camera className="h-4 w-4" />
                <span className="text-sm">फोटो से जांच</span>
              </div>
              <h3 className="mt-3 text-2xl font-bold">तस्वीर भेजें</h3>
              <ul className="mt-2 space-y-1 text-white/90 text-sm sm:text-base">
                <li>• पत्तियों की फोटो खींचे</li>
                <li>• तुरंत बीमारी की पहचान</li>
                <li>• इलाज के तरीके जानें</li>
              </ul>
            </div>
          </div>

          {/* Handle */}
          <motion.div
            className="absolute top-0 bottom-0 w-10 -ml-5 flex items-center justify-center cursor-col-resize"
            drag="x"
            dragElastic={0}
            dragMomentum={false}
            onDrag={onDrag}
            style={{ x, left: 0 }}
          >
            <div className="h-20 w-20 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur border border-border shadow-xl grid place-content-center">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
