import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/05d59772-b9ea-4228-ad82-30d58e8d81e6/files/ed9acab1-7ac4-4ea6-905a-e7457cf87f9d.jpg";
const RC1 = "https://cdn.ezst.app/projects/05d59772-b9ea-4228-ad82-30d58e8d81e6/files/099d76bf-4af5-4212-ba86-405e3f086749.jpg";
const RC2 = "https://cdn.ezst.app/projects/05d59772-b9ea-4228-ad82-30d58e8d81e6/files/df1049e7-4edb-401e-b494-d54b425c0c94.jpg";
const RC3 = "https://cdn.ezst.app/projects/05d59772-b9ea-4228-ad82-30d58e8d81e6/files/dd042814-8e42-4d34-a586-29213123cb4e.jpg";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  tag: string | null;
  description: string;
  reviewsList: { name: string; rating: number; text: string; date: string }[];
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Off-Road Beast",
    category: "RC Cars",
    price: "$89",
    rating: 4.9,
    reviews: 38,
    image: RC1,
    tag: "Bestseller",
    description: "High-speed 4WD off-road RC car. Hits 40km/h on any terrain. Built for thrill-seekers.",
    reviewsList: [
      { name: "Jordan T.", rating: 5, text: "Insane speed for the price. My kids won't put it down — neither will I.", date: "May 2026" },
      { name: "Marcus D.", rating: 5, text: "Runs through dirt, grass, everything. Absolutely built different.", date: "April 2026" },
    ],
  },
  {
    id: 2,
    name: "Drift King",
    category: "RC Cars",
    price: "$75",
    rating: 4.8,
    reviews: 27,
    image: RC2,
    tag: "New",
    description: "Low-profile drift RC car with precision steering. Smooth slides, tight turns, pure satisfaction.",
    reviewsList: [
      { name: "Marcus L.", rating: 5, text: "Drifts like a dream. Best RC car I've owned in years.", date: "April 2026" },
    ],
  },
  {
    id: 3,
    name: "Monster Crusher",
    category: "RC Cars",
    price: "$110",
    rating: 5.0,
    reviews: 19,
    image: RC3,
    tag: "Limited",
    description: "Massive monster truck RC with oversized suspension. Crushes obstacles and dominates any surface.",
    reviewsList: [
      { name: "Devon K.", rating: 5, text: "This thing is a beast. Runs over everything. Absolute unit.", date: "May 2026" },
    ],
  },
  {
    id: 4,
    name: "Add Your Product",
    category: "Custom",
    price: "—",
    rating: 5.0,
    reviews: 0,
    image: HERO_IMG,
    tag: "Coming Soon",
    description: "Got something to add? Contact us and we'll drop it in the shop.",
    reviewsList: [],
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width={size} height={size} viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "var(--gold)" : "none"}
          stroke={star <= Math.round(rating) ? "var(--gold)" : "#3a3530"}
          strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ProductModal({ product, onClose, editMode, onUpdate }: {
  product: Product;
  onClose: () => void;
  editMode: boolean;
  onUpdate: (p: Product) => void;
}) {
  const [added, setAdded] = useState(false);
  const [local, setLocal] = useState(product);

  const set = (field: keyof Product, val: string) => {
    const updated = { ...local, [field]: val };
    setLocal(updated);
    onUpdate(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-charcoal border border-[rgba(201,168,76,0.15)] max-w-2xl w-full rounded-sm overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-[rgba(240,232,216,0.5)] hover:text-[var(--gold)] transition-colors">
          <Icon name="X" size={20} />
        </button>

        <div className="grid grid-cols-2 max-sm:grid-cols-1">
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 py-2 text-center gold-gradient font-body text-xs tracking-widest font-bold uppercase z-10" style={{ color: '#0E0C0A' }}>
              BDH Tweaks
            </div>
            <div className="aspect-square overflow-hidden">
              <img src={local.image} alt={local.name} className="w-full h-full object-cover" />
            </div>
            {editMode && (
              <div className="p-3 border-t border-[rgba(201,168,76,0.1)]">
                <p className="font-body text-[10px] text-[rgba(201,168,76,0.6)] uppercase tracking-widest mb-1">Image URL</p>
                <input type="text" value={local.image} onChange={e => set("image", e.target.value)}
                  className="w-full px-2 py-1 rounded-sm text-xs" />
              </div>
            )}
          </div>

          <div className="p-8 flex flex-col justify-between">
            <div>
              <p className="text-[var(--gold)] font-body text-xs tracking-widest uppercase mb-2">{local.category}</p>
              {editMode ? (
                <div className="space-y-2 mb-4">
                  <input type="text" value={local.name} onChange={e => set("name", e.target.value)}
                    className="font-display text-xl text-[var(--cream)] w-full px-2 py-1 rounded-sm" />
                  <input type="text" value={local.price} onChange={e => set("price", e.target.value)}
                    className="font-display text-lg text-[var(--gold)] w-24 px-2 py-1 rounded-sm" />
                  <textarea value={local.description} onChange={e => set("description", e.target.value)}
                    rows={3} className="text-xs text-[rgba(240,232,216,0.6)] w-full px-2 py-1 rounded-sm resize-none" />
                  <input type="text" value={local.tag ?? ""} onChange={e => set("tag", e.target.value)}
                    className="text-xs w-full px-2 py-1 rounded-sm" placeholder="Tag (e.g. New, Limited)" />
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-[var(--cream)] mb-3">{local.name}</h3>
                  <p className="font-body text-sm text-[rgba(240,232,216,0.6)] leading-relaxed mb-4">{local.description}</p>
                </>
              )}
              <div className="flex items-center gap-2 mb-6">
                <StarRating rating={local.rating} />
                <span className="font-body text-xs text-[rgba(240,232,216,0.5)]">({local.reviews} reviews)</span>
              </div>
              {local.reviewsList.length > 0 && (
                <div className="space-y-3 mb-4">
                  {local.reviewsList.map((r, i) => (
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
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-display text-2xl text-[var(--gold)]">{local.price}</span>
              <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
                className="btn-gold px-5 py-2.5 rounded-sm">
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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    if (selectedProduct?.id === updated.id) setSelectedProduct(updated);
  };

  const updateField = (id: number, field: keyof Product, value: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="min-h-screen bg-obsidian">

      {/* EDIT BANNER */}
      {editMode && (
        <div className="fixed top-0 left-0 right-0 z-50 gold-gradient py-2 px-6 flex items-center justify-between">
          <span className="font-body text-xs font-bold tracking-widest uppercase" style={{ color: '#0E0C0A' }}>
            ✏️ Edit Mode — click product cards to edit name, price, description
          </span>
          <button onClick={() => setEditMode(false)}
            className="font-body text-xs font-bold px-4 py-1 rounded-sm bg-[#0E0C0A] text-[var(--gold)]">
            Done
          </button>
        </div>
      )}

      {/* NAV */}
      <nav className={`fixed left-0 right-0 z-40 flex items-center justify-between px-8 py-5 backdrop-blur-md bg-[rgba(14,12,10,0.9)] border-b border-[rgba(201,168,76,0.1)] ${editMode ? "top-10" : "top-0"}`}>
        <button onClick={() => scrollTo("home")} className="font-display text-2xl tracking-widest text-[var(--cream)]">
          BDH <span className="font-body text-xs font-light tracking-widest" style={{ color: 'var(--gold)' }}>TWEAKS</span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {[["home", "Home"], ["story", "Our Story"], ["shop", "Shop"], ["contact", "Contact"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`nav-link font-body text-xs tracking-widest uppercase text-[rgba(240,232,216,0.7)] hover:text-[var(--gold)] transition-colors ${activeSection === id ? "active text-[var(--gold)]" : ""}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setEditMode(e => !e)} title="Edit mode"
            className={`p-2 rounded-sm border transition-all ${editMode ? "border-[var(--gold)] text-[var(--gold)]" : "border-[rgba(201,168,76,0.2)] text-[rgba(240,232,216,0.4)] hover:text-[var(--gold)]"}`}>
            <Icon name="Pencil" size={15} />
          </button>
          <button className="relative p-2 text-[rgba(240,232,216,0.6)] hover:text-[var(--gold)] transition-colors">
            <Icon name="ShoppingBag" size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gold-gradient text-[10px] font-bold flex items-center justify-center" style={{ color: '#0E0C0A' }}>
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden text-[rgba(240,232,216,0.7)]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-obsidian flex flex-col items-center justify-center gap-10 animate-fade-in">
          {[["home", "Home"], ["story", "Our Story"], ["shop", "Shop"], ["contact", "Contact"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="font-display text-4xl italic text-[var(--cream)] hover:text-[var(--gold)] transition-colors">
              {label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className={`relative min-h-screen flex items-center overflow-hidden ${editMode ? "pt-10" : ""}`}
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.07) 0%, transparent 65%), #0E0C0A' }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0E0C0A 40%, transparent 100%)' }} />
        </div>

        <div className="relative z-10 px-8 md:px-20 pt-28 max-w-3xl">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-5 opacity-0 animate-fade-up delay-100">
            Scarborough's Finest · Est. 2026
          </p>
          <h1 className="font-display text-7xl md:text-9xl text-[var(--cream)] leading-none mb-6 opacity-0 animate-fade-up delay-200">
            BDH<br /><em className="gold-shimmer">Tweaks</em>
          </h1>
          <p className="font-body text-base text-[rgba(240,232,216,0.55)] max-w-sm leading-relaxed mb-10 opacity-0 animate-fade-up delay-300 font-light">
            RC cars. Real speed. No cap. We're four 16-year-olds from Scarborough and we're proud to sell to every single one of our customers.
          </p>
          <div className="flex items-center gap-4 opacity-0 animate-fade-up delay-400">
            <button onClick={() => scrollTo("shop")} className="btn-gold px-8 py-3.5 rounded-sm">
              Shop Now
            </button>
            <button onClick={() => scrollTo("story")} className="btn-outline-gold px-8 py-3.5 rounded-sm">
              Our Story
            </button>
          </div>

          <div className="flex items-center gap-10 mt-16 opacity-0 animate-fade-up delay-500">
            {[["3+", "RC Models"], ["4", "Founders"], ["5★", "Avg Rating"]].map(([val, label]) => (
              <div key={label}>
                <div className="font-display text-2xl text-[var(--gold)]">{val}</div>
                <div className="font-body text-xs text-[rgba(240,232,216,0.4)] tracking-wider mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRIP */}
      <div className="border-y border-[rgba(201,168,76,0.12)] py-5">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap px-8">
          {["Fast Shipping", "Real RC Cars", "Scarborough Built", "4 Boys 1 Dream", "No Cap Quality", "We Deliver"].map((item, i) => (
            <span key={i} className="font-body text-xs tracking-[0.25em] uppercase text-[rgba(201,168,76,0.5)] flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-60 inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* OUR STORY */}
      <section id="story" className="py-24 px-8 md:px-16 bg-charcoal">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-3">How We Started</p>
            <h2 className="font-display text-5xl md:text-6xl text-[var(--cream)]">
              Four boys. One <em>big dream.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="font-body text-sm text-[rgba(240,232,216,0.65)] leading-loose">
                It started in a bedroom in Scarborough. Four 16-year-olds — broke, ambitious, and done waiting for "someday." We looked around and saw a lane nobody our age was running, so we jumped in it.
              </p>
              <p className="font-body text-sm text-[rgba(240,232,216,0.65)] leading-loose">
                We pooled what little money we had, found the most fire RC cars we could get our hands on, and decided to sell them. No investors. No backing. Just four guys with a group chat, a laptop, and way too much energy.
              </p>
              <p className="font-body text-sm text-[rgba(240,232,216,0.65)] leading-loose">
                BDH Tweaks wasn't born in a boardroom. It was born at 2am, arguing about names, debating prices, and hyping each other up when it felt impossible. We built this from nothing and we're still building.
              </p>
              <p className="font-body text-sm text-[rgba(240,232,216,0.65)] leading-loose">
                Every car we sell, we believe in. Every customer we get, we appreciate for real. Scarborough made us and we're repping it with everything we do.
              </p>
              <p className="font-display text-xl italic text-[var(--gold)]">
                "We're not waiting to grow up to start. We already started."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Users", title: "4 Founders", sub: "All 16. All in." },
                { icon: "Flame", title: "Pure Hustle", sub: "Built from nothing" },
                { icon: "Heart", title: "Customers First", sub: "Proud to serve" },
                { icon: "TrendingUp", title: "Growing Fast", sub: "Just getting started" },
              ].map(({ icon, title, sub }) => (
                <div key={title} className="border border-[rgba(201,168,76,0.12)] rounded-sm p-6 bg-obsidian flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-sm gold-gradient flex items-center justify-center" style={{ color: '#0E0C0A' }}>
                    <Icon name={icon} size={16} />
                  </div>
                  <div>
                    <div className="font-display text-lg text-[var(--cream)]">{title}</div>
                    <div className="font-body text-xs text-[rgba(240,232,216,0.4)] mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[rgba(201,168,76,0.15)] rounded-sm p-8 bg-obsidian text-center">
            <p className="font-display text-2xl italic text-[rgba(240,232,216,0.85)] mb-4">
              "We are proud to sell to every single one of our customers. You're not just buying a car — you're supporting four teenagers from Scarborough who refused to give up."
            </p>
            <div className="section-divider mx-auto mb-4" />
            <p className="font-body text-xs text-[rgba(240,232,216,0.4)] tracking-widest uppercase">— The BDH Team</p>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-3">The Lineup</p>
            <h2 className="font-display text-5xl md:text-6xl text-[var(--cream)]">
              Our RC Cars —<br /><em>all BDH Tweaks</em>
            </h2>
          </div>

          {editMode && (
            <div className="mb-8 border border-[rgba(201,168,76,0.3)] rounded-sm px-5 py-4 bg-[rgba(201,168,76,0.04)] flex items-center gap-3">
              <Icon name="Pencil" size={16} />
              <p className="font-body text-xs text-[rgba(240,232,216,0.6)]">
                <span className="text-[var(--gold)] font-medium">Edit mode on.</span> Edit name, price or description directly on the cards below. Open any card for full edit including image.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id}
                className="product-card bg-charcoal border border-[rgba(201,168,76,0.08)] rounded-sm overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProduct(product)}>

                <div className="relative overflow-hidden aspect-[4/3]">
                  {/* BDH Tweaks label on every card */}
                  <div className="absolute top-0 left-0 right-0 py-1.5 text-center gold-gradient font-body text-[10px] tracking-[0.25em] font-bold uppercase z-10" style={{ color: '#0E0C0A' }}>
                    BDH Tweaks
                  </div>
                  <img src={product.image} alt={product.name} className="product-img w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  {product.tag && (
                    <div className="absolute top-10 left-4 font-body text-xs tracking-widest uppercase px-3 py-1 gold-gradient font-medium rounded-sm" style={{ color: '#0E0C0A' }}>
                      {product.tag}
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={e => { e.stopPropagation(); setCartCount(c => c + 1); }}
                      className="btn-gold w-9 h-9 rounded-full flex items-center justify-center shadow-lg">
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <p className="font-body text-xs tracking-widest uppercase text-[rgba(201,168,76,0.6)] mb-1">{product.category}</p>
                  {editMode ? (
                    <div className="space-y-2 mb-3" onClick={e => e.stopPropagation()}>
                      <input type="text" value={product.name}
                        onChange={e => updateField(product.id, "name", e.target.value)}
                        className="font-display text-lg text-[var(--cream)] w-full px-2 py-1 rounded-sm" />
                      <input type="text" value={product.description}
                        onChange={e => updateField(product.id, "description", e.target.value)}
                        className="font-body text-xs text-[rgba(240,232,216,0.5)] w-full px-2 py-1 rounded-sm" />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display text-xl text-[var(--cream)] mb-2">{product.name}</h3>
                      <p className="font-body text-xs text-[rgba(240,232,216,0.45)] leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                    </>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarRating rating={product.rating} size={12} />
                      <span className="font-body text-xs text-[rgba(240,232,216,0.4)]">({product.reviews})</span>
                    </div>
                    {editMode ? (
                      <input type="text" value={product.price}
                        onChange={e => updateField(product.id, "price", e.target.value)}
                        onClick={e => e.stopPropagation()}
                        className="font-display text-lg text-[var(--gold)] w-20 px-2 py-1 rounded-sm text-right" />
                    ) : (
                      <span className="font-display text-xl text-[var(--gold)]">{product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 px-8 md:px-16 bg-charcoal border-y border-[rgba(201,168,76,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-3">Real Talk</p>
            <h2 className="font-display text-5xl text-[var(--cream)]">What customers <em>say</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Jordan T.", rating: 5, role: "RC Enthusiast", text: "Off-Road Beast is no joke. These Scarborough guys know what they're doing. Already ordered again.", product: "Off-Road Beast" },
              { name: "Marcus L.", rating: 5, role: "Customer", text: "Drift King is smooth as butter. The control is insane for the price. 100% recommend BDH Tweaks.", product: "Drift King" },
              { name: "Devon K.", rating: 5, role: "Collector", text: "Monster Crusher is built different. Love that I'm supporting young entrepreneurs doing their thing.", product: "Monster Crusher" },
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
              Holla at<br /><em>the team</em>
            </h2>
            <p className="font-body text-sm text-[rgba(240,232,216,0.5)] leading-relaxed mb-10 max-w-sm">
              Questions about an RC car? Want to know what we're dropping next? We're real people — slide in our inbox.
            </p>
            <div className="space-y-5">
              {[
                { icon: "Mail", label: "Email", value: "boxyexpress99@gmail.com" },
                { icon: "MapPin", label: "Location", value: "Scarborough, Canada" },
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
                <h3 className="font-display text-2xl text-[var(--cream)] mb-2">Message sent!</h3>
                <p className="font-body text-sm text-[rgba(240,232,216,0.5)]">We'll hit you back soon. Appreciate you!</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setFormSent(true); }} className="space-y-5">
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-[rgba(240,232,216,0.4)] block mb-2">Your Name</label>
                  <input type="text" required value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm text-sm" placeholder="Your name" />
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-[rgba(240,232,216,0.4)] block mb-2">Email</label>
                  <input type="email" required value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm text-sm" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-[rgba(240,232,216,0.4)] block mb-2">Message</label>
                  <textarea required rows={5} value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm text-sm resize-none"
                    placeholder="What's good?" />
                </div>
                <button type="submit" className="btn-gold w-full py-3.5 rounded-sm">
                  Send It
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[rgba(201,168,76,0.1)] pt-10 pb-8 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-xl tracking-widest text-[var(--cream)]">
            BDH <span className="font-body font-light tracking-widest text-xs" style={{ color: 'var(--gold)' }}>TWEAKS</span>
          </div>
          <p className="font-body text-xs text-[rgba(240,232,216,0.3)] tracking-wider text-center">
            © 2026 BDH Tweaks · Scarborough, Canada · Four 16-year-olds who refused to wait.
          </p>
          <div className="flex gap-6">
            {["Instagram", "TikTok", "Twitter"].map(social => (
              <button key={social} className="font-body text-xs tracking-widest text-[rgba(240,232,216,0.35)] hover:text-[var(--gold)] transition-colors uppercase">
                {social}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)}
          editMode={editMode} onUpdate={updateProduct} />
      )}
    </div>
  );
}
