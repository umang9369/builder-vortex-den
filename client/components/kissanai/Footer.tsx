import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-gradient-to-b from-transparent to-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold text-primary">किसानAI</h3>
          <p className="mt-2 text-muted-foreground">हिंदी में आपकी खेती का AI सहायक — आवाज़ और फोटो से पूछें, तुरंत जवाब पाएं।</p>
          <div className="mt-4 flex gap-3">
            <a aria-label="Facebook" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted/50">
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="Twitter" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted/50">
              <Twitter className="h-4 w-4" />
            </a>
            <a aria-label="YouTube" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted/50">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold">कृषि टिप्स न्यूज़लेटर</h4>
          <p className="text-sm text-muted-foreground mt-1">साप्ताहिक मौसम, कीमतें, और सलाह सीधे आपके इनबॉक्स में</p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" required placeholder="आपका ईमेल" className="flex-1" />
            <Button className="bg-primary hover:bg-secondary">सब्सक्राइब करें</Button>
          </form>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Link className="hover:text-primary" to="/prices">फसल की कीमतें</Link>
            <Link className="hover:text-primary" to="/weather">मौसम की जानकारी</Link>
            <Link className="hover:text-primary" to="/schemes">सरकारी योजनाएं</Link>
            <Link className="hover:text-primary" to="/advice">कृषि सलाह</Link>
            <a className="hover:text-primary" href="tel:18001801551">किसान हेल्पलाइन: 1800-180-1551</a>
            <a className="hover:text-primary" href="mailto:hello@kissan.ai">hello@kissan.ai</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} KissanAI</div>
    </footer>
  );
}
