import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

const voiceItems = [
  {
    title: "आवाज़ से सवाल",
    desc: "हिंदी में पूछें और तुरंत जवाब पाएं",
    img: "https://images.pexels.com/photos/18925493/pexels-photo-18925493.jpeg",
  },
  {
    title: "कीमतें और मौसम",
    desc: "आज के बाजार भाव और मौसम की जानकारी",
    img: "https://images.pexels.com/photos/15970244/pexels-photo-15970244.jpeg",
  },
];

const photoItems = [
  {
    title: "बीमारी पहचान",
    desc: "पत्तियों की फोटो लेकर तुरंत पता करें",
    img: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg",
  },
  {
    title: "इलाज और सलाह",
    desc: "सटीक उपचार और सावधानियाँ",
    img: "https://images.pexels.com/photos/5673978/pexels-photo-5673978.jpeg",
  },
];

export default function FeaturesTabs() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-border bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-xl p-4 sm:p-6">
          <Tabs defaultValue="voice" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList className="relative grid grid-cols-2 w-full max-w-sm bg-white/40 dark:bg-white/10 backdrop-blur rounded-full p-1">
                <motion.div
                  layoutId="pill"
                  className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-gradient-to-r from-primary/20 to-secondary/30"
                />
                <TabsTrigger value="voice" className="relative z-10 rounded-full">आवाज़ की सुविधा</TabsTrigger>
                <TabsTrigger value="photo" className="relative z-10 rounded-full">फोटो से जांच</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="voice" className="mt-6 focus:outline-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key="voice"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {voiceItems.map((item) => (
                    <article key={item.title} className="group relative overflow-hidden rounded-2xl border border-border">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${item.img})` }}
                      />
                      <div className="relative p-4 sm:p-6 h-48 sm:h-60 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/30 to-transparent text-white">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-white/90">{item.desc}</p>
                      </div>
                    </article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="photo" className="mt-6 focus:outline-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key="photo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {photoItems.map((item) => (
                    <article key={item.title} className="group relative overflow-hidden rounded-2xl border border-border">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${item.img})` }}
                      />
                      <div className="relative p-4 sm:p-6 h-48 sm:h-60 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/30 to-transparent text-white">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-white/90">{item.desc}</p>
                      </div>
                    </article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
