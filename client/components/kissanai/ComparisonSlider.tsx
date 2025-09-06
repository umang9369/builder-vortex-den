import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Mic, Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const LEFT_URL = "https://cdn.builder.io/api/v1/image/assets%2F823f55bf46824ad3a2e7751fa8fe2b67%2F6037ea33a0c94512965ad23e1717c9bc?format=webp&width=800"; // farmer with tablet
const RIGHT_URL = "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg"; // rice close-up

export default function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const [pos, setPos] = useState(0.5); // 0..1

  // Mic dialog state
  const [micOpen, setMicOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Camera dialog state
  const [camOpen, setCamOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
      };
      recorder.start();
      setRecording(true);
    } catch (e) {
      alert("माइक्रोफोन की अनुमति आवश्यक है।");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setRecording(false);
  };

  const triggerCamera = () => {
    setCamOpen(true);
    fileInputRef.current?.click();
  };

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const cleanupCam = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
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
                <button
                  type="button"
                  onClick={() => setMicOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 cursor-pointer hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <Mic className="h-4 w-4" />
                  <span className="text-sm">आवाज़ की सुविधा</span>
                </button>
                <h3 className="mt-3 text-2xl font-bold">बोलकर पूछें</h3>
                <ul className="mt-2 space-y-1 text-white/90 text-sm sm:text-base">
                  <li>• आज का मौसम कैसा है?</li>
                  <li>• गेहूं का भा��� क्या है?</li>
                  <li>• खाद कब डालना चाहिए?</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="absolute inset-0 p-5 sm:p-8 flex justify-end text-right">
            <div className="max-w-sm text-white ml-auto">
              <button
                type="button"
                onClick={triggerCamera}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 cursor-pointer hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <Camera className="h-4 w-4" />
                <span className="text-sm">फोटो से जांच</span>
              </button>
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

          {/* Hidden camera input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      </div>

      {/* Mic dialog */}
      <Dialog open={micOpen} onOpenChange={(o) => {
        setMicOpen(o);
        if (!o && recording) stopRecording();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>माइक्रोफोन</DialogTitle>
            <DialogDescription>हिंदी में अपना सवाल रिकॉर्ड करें</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            {audioUrl ? (
              <audio src={audioUrl} controls className="w-full" />
            ) : (
              <p className="text-sm text-muted-foreground">रिकॉर्डिंग सेव होने के बाद आप सुन सकेंगे।</p>
            )}
          </div>
          <DialogFooter className="flex items-center gap-2">
            {!recording ? (
              <Button onClick={startRecording} className="bg-primary hover:bg-secondary">रिकॉर्ड शुरू करें</Button>
            ) : (
              <Button onClick={stopRecording} variant="destructive">रिकॉर्ड बंद करें</Button>
            )}
            <Button variant="outline" onClick={() => setMicOpen(false)}>बंद करें</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Camera dialog */}
      <Dialog open={camOpen} onOpenChange={(o) => { setCamOpen(o); if (!o) cleanupCam(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>कैमरा</DialogTitle>
            <DialogDescription>फसल की फोटो कैप्चर करें</DialogDescription>
          </DialogHeader>
          <div className="grid place-items-center">
            {imageUrl ? (
              <img src={imageUrl} alt="कैप्चर की गई फोटो" className="max-h-80 w-auto rounded-md border border-border" />
            ) : (
              <p className="text-sm text-muted-foreground">कैमरा खुल गया है। फोटो लेने के बाद यहाँ प्रीव्यू दिखेगा।</p>
            )}
          </div>
          <DialogFooter className="flex items-center gap-2">
            <Button onClick={() => fileInputRef.current?.click()} className="bg-primary hover:bg-secondary">फिर से लें</Button>
            <Button variant="outline" onClick={() => setCamOpen(false)}>बंद करें</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
