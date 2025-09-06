export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-primary/5 to-transparent">
      <div className="text-center px-6">
        <h1 className="text-3xl font-extrabold text-primary">{title}</h1>
        <p className="mt-2 text-muted-foreground">यह पेज जल्द ही जोड़ा जाएगा। कृपया होमपेज देखें।</p>
      </div>
    </section>
  );
}
