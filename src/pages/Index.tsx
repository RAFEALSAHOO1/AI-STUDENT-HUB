import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Flame, Zap, DollarSign, ArrowUp } from "lucide-react";
import { AI_TOOLS, CATEGORIES, PRICE_TYPES, type PriceType } from "@/data/tools";

const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const priceBadgeStyles: Record<PriceType, string> = {
  "Free": "bg-accent/20 text-accent",
  "Student Discount": "bg-primary/20 text-primary",
  "Freemium": "bg-muted-foreground/20 text-muted-foreground",
};

const priceBadgeLabels: Record<PriceType, string> = {
  "Free": "100% Free",
  "Student Discount": "Student Discount",
  "Freemium": "Freemium",
};

function ToolCard({ tool, index }: { tool: typeof AI_TOOLS[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group block rounded-xl bg-card border border-border p-3 sm:p-5 transition-all duration-300 hover:bg-card-hover hover:scale-[1.03] hover:shadow-[0_0_30px_hsl(var(--neon-glow)/0.15)] hover:border-primary/30 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl sm:text-3xl">{tool.logo}</span>
        <span className={`text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap ${priceBadgeStyles[tool.priceType]}`}>
          {priceBadgeLabels[tool.priceType]}
        </span>
      </div>
      <h3 className="text-foreground font-bold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors truncate">
        {tool.name}
      </h3>
      <p className="text-muted-foreground text-[10px] sm:text-xs mb-2 sm:mb-3 leading-relaxed line-clamp-2">{tool.description}</p>
      <p className="text-primary/60 text-[9px] sm:text-[10px] mb-2 sm:mb-3 hidden sm:block">{tool.studentOffer}</p>
      <div className="flex items-center gap-1 sm:gap-1.5 text-primary text-[10px] sm:text-xs font-bold group-hover:gap-2.5 transition-all">
        <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline">Get Free Access</span>
        <span className="sm:hidden">Get Access</span>
      </div>
    </motion.a>
  );
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState<PriceType | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return AI_TOOLS.filter((t) => {
      const matchCat = category === "All" || t.category === category;
      const matchPrice = !priceFilter || t.priceType === priceFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.tags.some(tag => tag.includes(q)) || t.description.toLowerCase().includes(q);
      return matchCat && matchPrice && matchSearch;
    });
  }, [search, category, priceFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[500px] overflow-hidden">
        {/* Animated gradient fallback behind video */}
        <div className="hero-animated-bg hero-particles absolute inset-0" />
        
        {/* Video layer */}
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          style={{ WebkitTransform: 'translateZ(0)' }}
        />
        <div className="noise-overlay absolute inset-0 opacity-[0.5] mix-blend-overlay pointer-events-none z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background z-[3]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground tracking-tight leading-[0.95] mb-3 sm:mb-4"
          >
            100+ FREE AI TOOLS
            <br />
            <span className="text-primary">FOR STUDENTS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg max-w-md sm:max-w-xl px-2"
          >
            Save ₹10,000+ with exclusive student discounts on premium AI tools
          </motion.p>
          <motion.a
            href="#filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 bg-primary text-primary-foreground font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <Flame className="w-4 h-4" /> Explore Tools
          </motion.a>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="bg-card border-y border-border">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-12 py-4 px-4 text-xs sm:text-sm font-bold text-foreground">
          <span className="flex items-center gap-2"><Flame className="w-4 h-4 text-accent" /> 100+ Tools</span>
          <span className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-primary" /> Save Money</span>
          <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent" /> Updated Daily</span>
        </div>
      </section>

      {/* FILTERS */}
      <section id="filters" ref={filterRef} className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border py-4">
        <div className="max-w-6xl mx-auto px-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="w-px bg-border mx-1" />
            {PRICE_TYPES.map(pt => (
              <button
                key={pt}
                onClick={() => setPriceFilter(priceFilter === pt ? null : pt)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  priceFilter === pt
                    ? "bg-accent text-accent-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {pt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-muted-foreground text-sm mb-6">
          Showing <span className="text-foreground font-bold">{filtered.length}</span> tools
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No tools found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="bg-noise absolute inset-0 opacity-[0.1] pointer-events-none" />
        <div className="relative z-10 text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Stop wasting time.
            <br />
            <span className="text-primary">Start using AI tools.</span>
          </motion.h2>
          <motion.a
            href="#filters"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-10 py-4 rounded-full text-base hover:scale-105 transition-transform mt-6"
          >
            <ArrowUp className="w-5 h-5" /> Explore Top Tools
          </motion.a>
        </div>
      </section>
    </div>
  );
}
