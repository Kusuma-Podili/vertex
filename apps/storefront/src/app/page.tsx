import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Truck, RotateCcw, Star } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = [
    {
      id: 'aurora-pro-anc-headphones',
      title: 'Aurora Pro ANC Wireless Headphones',
      category: 'Audiophile Spatial',
      price: '$349.99',
      comparePrice: '$399.99',
      rating: 4.85,
      reviews: 142,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    },
    {
      id: 'titanbook-16-max-laptop',
      title: 'TitanBook 16 Max Creator Workstation',
      category: 'Computing Power',
      price: '$2,499.00',
      comparePrice: '$2,799.00',
      rating: 4.92,
      reviews: 89,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    },
    {
      id: 'aerosync-ergonomic-mesh-chair',
      title: 'AeroSync Ergonomic Posture Task Chair',
      category: 'Workspace Design',
      price: '$599.00',
      comparePrice: '$699.00',
      rating: 4.78,
      reviews: 310,
      imageUrl: 'https://images.unsplash.com/photo-1580481077197-094c9ca4e1a0?w=800',
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-32 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-6">
            <Zap className="w-3.5 h-3.5" /> Next-Generation Studio Hardware Line
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Engineered For The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Extreme Output</span> Mindset.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Uncompromising studio acoustics, workstation hardware, and ergonomics crafted for modern creators.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="/shop"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/categories/electronics"
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-full font-semibold transition-all"
            >
              Hardware Specs
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">Flagship Releases</div>
            <h2 className="text-3xl font-bold text-white mt-1">Curated Engineering Highlights</h2>
          </div>
          <a href="/shop" className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View all 48 pieces &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((p) => (
            <a
              key={p.id}
              href={`/products/${p.id}`}
              className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-blue-500/5 flex flex-col"
            >
              <div className="aspect-square w-full overflow-hidden bg-slate-950 relative">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-300 border border-slate-800">
                  {p.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold mb-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{p.rating}</span>
                    <span className="text-slate-500 font-normal">({p.reviews})</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-white">{p.price}</span>
                    {p.comparePrice && (
                      <span className="text-xs text-slate-500 line-through">{p.comparePrice}</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* VALUE PILLARS */}
      <section className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/50">
            <Truck className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="text-sm font-bold text-white">Express Global Shipping</h3>
            <p className="text-xs text-slate-400 mt-1">Direct air freight fulfillment from our US & EU hubs.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/50">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="text-sm font-bold text-white">12-Year Structural Warranty</h3>
            <p className="text-xs text-slate-400 mt-1">Comprehensive guarantee on all structural & precision parts.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/50">
            <RotateCcw className="w-6 h-6 text-indigo-400 mb-3" />
            <h3 className="text-sm font-bold text-white">30-Day Studio Trial</h3>
            <p className="text-xs text-slate-400 mt-1">Test in your acoustic workspace with zero restocking fees.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/50">
            <Zap className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="text-sm font-bold text-white">Live Telemetric Support</h3>
            <p className="text-xs text-slate-400 mt-1">Direct engineering concierge support for all device drivers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
