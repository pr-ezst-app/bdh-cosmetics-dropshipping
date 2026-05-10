import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.ezst.app/projects/05d59772-b9ea-4228-ad82-30d58e8d81e6/files/f8db47f5-b755-4ad7-8117-fd2688b32ed6.jpg";
const SERUM_IMAGE = "https://cdn.ezst.app/projects/05d59772-b9ea-4228-ad82-30d58e8d81e6/files/a714e6ed-b6bd-463a-bd30-e1f45b25bfbe.jpg";
const LIPSTICK_IMAGE = "https://cdn.ezst.app/projects/05d59772-b9ea-4228-ad82-30d58e8d81e6/files/afeedba0-6345-476d-ad5c-4fed3ad3598b.jpg";

const products = [
  {
    id: 1,
    name: "Noir Velvet Sérum",
    category: "Skincare",
    price: "$128",
    rating: 4.9,
    reviews: 214,
    image: SERUM_IMAGE,
    tag: "Bestseller",
    description: "Ultra-rich peptide serum with black rose extract. Visibly firms and illuminates overnight.",
    reviewsList: [
      { name: "Sophia M.", rating: 5, text: "Transformed my skin in 2 weeks. The texture is divine — absorbs instantly with no greasy residue.", date: "April 2026" },
      { name: "Elena R.", rating: 5, text: "Luxurious formula. I wake up with a visible glow. Worth every penny.", date: "March 2026" },
    ],
  },
  {
    id: 2,
    name: "Obsidian Lip Rouge",
    category: "Makeup",
    price: "$64",
    rating: 4.8,
    reviews: 187,
    image: LIPSTICK_IMAGE,
    tag: "New",
    description: "Velvet-matte pigment in 12 wearable shades. 10-hour wear with plumping hyaluronic complex.",
    reviewsList: [
      { name: "Clara V.", rating: 5, text: "The pigment payoff is incredible. It stays all day and feels comfortable, not drying at all.", date: "April 2026" },
      { name: "Isabelle T.", rating: 4, text: "Beautiful shade range. My personal favorite is Noir Rose — so sophisticated.", date: "March 2026" },
    ],
  },
  {
    id: 3,
    name: "Aurore Face Oil",
    category: "Skincare",
    price: "$96",
    rating: 4.7,
    reviews: 143,
    image: HERO_IMAGE,
    tag: "Limited",
    description: "A rare blend of 24K gold microparticles and rosehip oil. The ultimate radiance ritual.",
    reviewsList: [
      { name: "Maya K.", rating: 5, text: "This is pure luxury. My skin glows like I've had a professional facial. Obsessed.", date: "May 2026" },
      { name: "Nadia S.", rating: 4, text: "A little goes a long way. Beautiful scent and my skin drinks it up.", date: "April 2026" },
    ],
  },
  {
    id: 4,
    name: "Midnight Eye Ritual",
    category: "Skincare",
    price: "$82",
    rating: 4.9,
    reviews: 98,
    image: SERUM_IMAGE,
    tag: null,
    description: "Advanced caffeine & retinol eye treatment. Visibly reduces dark circles and puffiness in 7 days.",
    reviewsList: [
      { name: "Priya L.", rating: 5, text: "My dark circles are noticeably lighter. The applicator tip is perfectly cooling in the morning.", date: "May 2026" },
    ],
  },
  {
    id: 5,
    name: "Gold Dust Highlighter",
    category: "Makeup",
    price: "$58",
    rating: 4.6,
    reviews: 76,
    image: LIPSTICK_IMAGE,
    tag: null,
    description: "Finely milled mineral powder with 18K gold. Delivers a dimensional, lit-from-within glow.",
    reviewsList: [
      { name: "Aria F.", rating: 5, text: "The most beautiful highlighter I've ever used. Catches light so elegantly.", date: "April 2026" },
    ],
  },
  {
    id: 6,
    name: "Velvet Mist Perfume",
    category: "Fragrance",
    price: "$195",
    rating: 5.0,
    reviews: 52,
    image: HERO_IMAGE,
    tag: "Exclusive",
    description: "Oud, black iris and warm amber. A statement fragrance that commands a room.",
    reviewsList: [
      { name: "Valentina C.", rating: 5, text: "I get compliments every single time I wear this. Utterly addictive.", date: "May 2026" },
    ],
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width={size} height={size} viewBox="0 0 24 24" fill={star <= Math.round(rating) ? "var(--gold)" : "none"} stroke={star <= Math.round(rating) ? "var(--gold)" : "#3a3530"} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ProductModal({ product, onClose }: { product: typeof products[0]; onClose: () => void }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative bg-charcoal border border-[rgba(201,168,76,0.15)] max-w-2xl w-full rounded-sm animate-scale-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-[rgba(240,232,216,0.5)] hover:text-[var(--gold)] transition-colors">
          <Icon name="X" size={20} />
        </button>
        <div className="grid grid-cols-2 max-sm:grid-cols-1">
          <div className="aspect-square overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <p className="text-[var(--gold)] font-body text-xs tracking-widest uppercase mb-2">{product.category}</p>
              <h3 className="font-display text-2xl text-[var(--cream)] mb-3">{product.name}</h3>
              <p className="font-body text-sm text-[rgba(240,232,216,0.6)] leading-relaxed mb-4">{product.description}</p>
              <div className="flex items-center gap-2 mb-6">
                <StarRating rating={product.rating} />
                <span className="font-body text-xs text-[rgba(240,232,216,0.5)]">({product.reviews} reviews)</span>
              </div>
              <div className="space-y-3 mb-6">
                {product.reviewsList.map((r, i) => (
                  <div key={i} className="border-t border-[rgba(201,168,76,0.1)] pt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-xs font-medium text-[var(--cream)]">{r.name}</span>
                      <span className="font-body text-xs text-[rgba(240,232,216,0.4)]">{r.date}</span>
                    </div>
                    <StarRating rating={r.rating} size={10} />
                    <p className="font-body text-xs text-[rgba(240,232,216,0.55)] mt-1 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl text-[var(--gold)]">{product.price}</span>
              <button onClick={handleAdd} className="btn-gold px-5 py-2.5 rounded-sm">
                {added ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ["All", "Skincare", "Makeup", "Fragrance"];
  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartCount(c => c + 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-obsidian noise-overlay">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5 backdrop-blur-md bg-[rgba(14,12,10,0.85)] border-b border-[rgba(201,168,76,0.08)]">
        <button onClick={() => scrollTo("home")} className="font-display text-xl tracking-widest text-[var(--cream)]">
          BDH <span className="text-gold text-xs font-body font-light tracking-widest align-top mt-1 inline-block">COSMETICS</span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {["home", "products", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`nav-link font-body text-xs tracking-widest uppercase text-[rgba(240,232,216,0.7)] hover:text-[var(--gold)] transition-colors ${activeSection === s ? "active text-[var(--gold)]" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-[rgba(240,232,216,0.6)] hover:text-[var(--gold)] transition-colors">
            <Icon name="ShoppingBag" size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gold-gradient text-[10px] font-bold flex items-center justify-center text-obsidian" style={{ color: '#0E0C0A' }}>
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden text-[rgba(240,232,216,0.7)] hover:text-[var(--gold)] transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-obsidian flex flex-col items-center justify-center gap-10 animate-fade-in">
          {["home", "products", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="font-display text-4xl italic text-[var(--cream)] hover:text-[var(--gold)] transition-colors capitalize"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center hero-bg overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
        </div>

        <div className="relative z-10 px-8 md:px-20 pt-24 max-w-4xl">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-6 opacity-0 animate-fade-up delay-100">
            Artisan Luxury Beauty
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-[var(--cream)] leading-none mb-4 opacity-0 animate-fade-up delay-200">
            Where Beauty<br />
            <em className="gold-shimmer">Becomes Art</em>
          </h1>
          <p className="font-body text-sm md:text-base text-[rgba(240,232,216,0.55)] max-w-md leading-relaxed mb-10 opacity-0 animate-fade-up delay-300 font-light">
            Handcrafted formulas, rare botanicals, and a commitment to beauty that transcends the ordinary.
            For those who refuse to be forgotten.
          </p>
          <div className="flex items-center gap-4 opacity-0 animate-fade-up delay-400">
            <button onClick={() => scrollTo("products")} className="btn-gold px-8 py-3.5 rounded-sm">
              Explore Collection
            </button>
            <button className="btn-outline-gold px-8 py-3.5 rounded-sm">
              Our Story
            </button>
          </div>

          <div className="flex items-center gap-10 mt-16 opacity-0 animate-fade-up delay-500">
            {[["2,500+", "Happy Clients"], ["12", "Rare Botanicals"], ["4.8★", "Average Rating"]].map(([val, label]) => (
              <div key={label}>
                <div className="font-display text-2xl text-[var(--gold)]">{val}</div>
                <div className="font-body text-xs text-[rgba(240,232,216,0.4)] tracking-wider mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/2 max-md:hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-obsidian z-10" />
          <img src={HERO_IMAGE} alt="BDH Cosmetics" className="w-full h-full object-cover object-center opacity-40" />
          <div className="absolute bottom-12 right-12 z-20 text-right">
            <div className="font-display text-sm italic text-[rgba(201,168,76,0.6)] tracking-wider">
              "Beauty is not in the face;<br/>beauty is a light in the heart."
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <div className="border-y border-[rgba(201,168,76,0.12)] py-6">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap px-8">
          {["Cruelty Free", "Vegan Formula", "Sustainable Packaging", "Dermatologist Tested", "Rare Botanicals", "Handcrafted"].map((item, i) => (
            <span key={i} className="font-body text-xs tracking-[0.25em] uppercase text-[rgba(201,168,76,0.5)] flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-60 inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section id="products" className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-3">The Collection</p>
              <h2 className="font-display text-5xl md:text-6xl text-[var(--cream)]">
                Curated for<br /><em>the discerning</em>
              </h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-body text-xs tracking-widest uppercase px-4 py-2 rounded-sm border transition-all duration-300 ${
                    activeCategory === cat
                      ? "btn-gold border-transparent"
                      : "btn-outline-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="product-card bg-charcoal border border-[rgba(201,168,76,0.08)] rounded-sm overflow-hidden cursor-pointer group"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  {product.tag && (
                    <div className="absolute top-4 left-4 font-body text-xs tracking-widest uppercase px-3 py-1 gold-gradient font-medium rounded-sm" style={{ color: '#0E0C0A' }}>
                      {product.tag}
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={handleAddToCart}
                      className="btn-gold w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <p className="font-body text-xs tracking-widest uppercase text-[rgba(201,168,76,0.6)] mb-1">{product.category}</p>
                  <h3 className="font-display text-xl text-[var(--cream)] mb-2">{product.name}</h3>
                  <p className="font-body text-xs text-[rgba(240,232,216,0.45)] leading-relaxed mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarRating rating={product.rating} size={12} />
                      <span className="font-body text-xs text-[rgba(240,232,216,0.4)]">({product.reviews})</span>
                    </div>
                    <span className="font-display text-xl text-[var(--gold)]">{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-8 md:px-16 bg-charcoal border-y border-[rgba(201,168,76,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-3">Voices</p>
            <h2 className="font-display text-5xl text-[var(--cream)]">What our clients <em>say</em></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Valeria K.", rating: 5, role: "Beauty Editor", text: "BDH has completely replaced my previous luxury routine. The formulas are extraordinary — nothing compares.", product: "Noir Velvet Sérum" },
              { name: "Amara J.", rating: 5, role: "Influencer & Artist", text: "The packaging alone is a work of art. But the products? Even better. My skin has never looked this luminous.", product: "Aurore Face Oil" },
              { name: "Céleste M.", rating: 5, role: "Dermatologist", text: "As someone who recommends with care, I confidently suggest BDH to my clients. Clean, effective, extraordinary.", product: "Midnight Eye Ritual" },
            ].map((t, i) => (
              <div key={i} className="border border-[rgba(201,168,76,0.12)] p-8 rounded-sm bg-obsidian relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-[0.06]">
                  <Icon name="Quote" size={64} />
                </div>
                <StarRating rating={t.rating} />
                <p className="font-display text-lg italic text-[rgba(240,232,216,0.8)] mt-4 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="border-t border-[rgba(201,168,76,0.1)] pt-4">
                  <div className="font-body text-sm font-medium text-[var(--cream)]">{t.name}</div>
                  <div className="font-body text-xs text-[rgba(240,232,216,0.4)] mt-0.5">{t.role}</div>
                  <div className="font-body text-xs text-[var(--gold)] mt-2 tracking-wider">Re: {t.product}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4">Get in Touch</p>
            <h2 className="font-display text-5xl md:text-6xl text-[var(--cream)] mb-6">
              Let's talk<br /><em>beauty</em>
            </h2>
            <p className="font-body text-sm text-[rgba(240,232,216,0.5)] leading-relaxed mb-10 max-w-sm">
              Whether you have questions about our formulations, want to explore wholesale partnerships, or simply want to know which product is right for you — we're here.
            </p>

            <div className="space-y-5">
              {[
                { icon: "Mail", label: "Email", value: "hello@bdhcosmetics.com" },
                { icon: "Phone", label: "Phone", value: "+1 (800) BDH-GLOW" },
                { icon: "MapPin", label: "Atelier", value: "Paris · New York · London" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-[var(--gold)]">
                    <Icon name={icon} size={16} />
                  </div>
                  <div>
                    <div className="font-body text-xs tracking-widest uppercase text-[rgba(240,232,216,0.35)]">{label}</div>
                    <div className="font-body text-sm text-[rgba(240,232,216,0.75)]">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-charcoal border border-[rgba(201,168,76,0.1)] p-8 rounded-sm">
            {formSent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={24} style={{ color: '#0E0C0A' }} />
                </div>
                <h3 className="font-display text-2xl text-[var(--cream)] mb-2">Message sent</h3>
                <p className="font-body text-sm text-[rgba(240,232,216,0.5)]">We'll be in touch within 24 hours. Merci.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-[rgba(240,232,216,0.4)] block mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm text-sm"
                    placeholder="Alexandra Smith"
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-[rgba(240,232,216,0.4)] block mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-[rgba(240,232,216,0.4)] block mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm text-sm resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button type="submit" className="btn-gold w-full py-3.5 rounded-sm">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[rgba(201,168,76,0.1)] py-10 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-lg tracking-widest text-[var(--cream)]">
            BDH <span className="font-body font-light tracking-widest text-xs" style={{ color: 'var(--gold)' }}>COSMETICS</span>
          </div>
          <p className="font-body text-xs text-[rgba(240,232,216,0.3)] tracking-wider">
            © 2026 BDH Cosmetics. All rights reserved. Crafted with care.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Facebook", "Twitter"].map(social => (
              <button key={social} className="font-body text-xs tracking-widest text-[rgba(240,232,216,0.35)] hover:text-[var(--gold)] transition-colors uppercase">
                {social}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}