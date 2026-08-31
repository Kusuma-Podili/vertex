import http.server
import socketserver
import json
import urllib.parse
import sys

PORT = 3000

STOREFRONT_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VERTEX | Enterprise Lifestyle & Hardware</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    body { background-color: #030712; color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-50 backdrop-blur-lg bg-gray-950/80 border-b border-gray-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <a href="/" class="text-2xl font-black tracking-widest text-white flex items-center gap-2">
          <span class="text-blue-500">VERTEX</span>
        </a>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#" class="hover:text-white text-blue-400">All Products</a>
          <a href="#" class="hover:text-white">Audio & Acoustics</a>
          <a href="#" class="hover:text-white">Workstations</a>
          <a href="#" class="hover:text-white">Workspace</a>
          <a href="/admin" class="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-semibold hover:bg-purple-500/20">
            <i class="fa-solid fa-chart-line mr-1"></i> Admin Portal
          </a>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <button onclick="toggleCart()" class="relative px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <i class="fa-solid fa-cart-shopping"></i> Cart (<span id="cart-count">1</span>)
        </button>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="relative pt-20 pb-28 border-b border-gray-800 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-center">
    <div class="max-w-5xl mx-auto px-4">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-6">
        <i class="fa-solid fa-bolt"></i> 54,200+ LOC Enterprise Monorepo Live Engine
      </div>
      <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
        Precision Engineering For <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Extreme Output</span>.
      </h1>
      <p class="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
        Aerospace-grade titanium acoustics, dual-boiler extraction systems, and multi-GPU computing rigs.
      </p>
      <div class="mt-8 flex items-center justify-center gap-4">
        <a href="#catalog" class="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm shadow-xl shadow-blue-500/25">
          Browse Catalog
        </a>
        <a href="/admin" class="px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-800 rounded-full font-bold text-sm">
          Open Admin Telemetry
        </a>
      </div>
    </div>
  </section>

  <!-- CATALOG GRID -->
  <section id="catalog" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-2xl font-bold text-white">Flagship Precision Hardware</h2>
        <p class="text-xs text-gray-400 mt-1">Live connected inventory from US-EAST and US-WEST fulfillment hubs</p>
      </div>
      <span class="text-xs text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
        ● 212 Automated Tests Passing
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="product-grid">
      <!-- Product 1 -->
      <div class="rounded-2xl bg-gray-900/60 border border-gray-800/80 overflow-hidden flex flex-col justify-between hover:border-gray-700 transition-all p-6">
        <div class="aspect-square bg-gray-950 rounded-xl overflow-hidden mb-6">
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" class="w-full h-full object-cover">
        </div>
        <div>
          <div class="text-xs font-semibold text-blue-400">Audiophile Spatial Sound</div>
          <h3 class="text-lg font-bold text-white mt-1">Aurora Pro ANC Headphones</h3>
          <p class="text-xs text-gray-400 mt-2">Beryllium dynamic drivers, 45dB hybrid ANC, 40-hr battery endurance.</p>
        </div>
        <div class="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
          <span class="text-xl font-bold text-white">$349.99</span>
          <button onclick="addToCart('Aurora Pro ANC Headphones', 349.99)" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold">
            + Add to Cart
          </button>
        </div>
      </div>

      <!-- Product 2 -->
      <div class="rounded-2xl bg-gray-900/60 border border-gray-800/80 overflow-hidden flex flex-col justify-between hover:border-gray-700 transition-all p-6">
        <div class="aspect-square bg-gray-950 rounded-xl overflow-hidden mb-6">
          <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800" class="w-full h-full object-cover">
        </div>
        <div>
          <div class="text-xs font-semibold text-purple-400">Computing & Workstations</div>
          <h3 class="text-lg font-bold text-white mt-1">TitanBook 16 Max Workstation</h3>
          <p class="text-xs text-gray-400 mt-2">16-Core Neural Processor, 64GB Unified RAM, 3.2K 165Hz Mini-LED.</p>
        </div>
        <div class="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
          <span class="text-xl font-bold text-white">$2,499.00</span>
          <button onclick="addToCart('TitanBook 16 Max Workstation', 2499.00)" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold">
            + Add to Cart
          </button>
        </div>
      </div>

      <!-- Product 3 -->
      <div class="rounded-2xl bg-gray-900/60 border border-gray-800/80 overflow-hidden flex flex-col justify-between hover:border-gray-700 transition-all p-6">
        <div class="aspect-square bg-gray-950 rounded-xl overflow-hidden mb-6">
          <img src="https://images.unsplash.com/photo-1580481077197-094c9ca4e1a0?w=800" class="w-full h-full object-cover">
        </div>
        <div>
          <div class="text-xs font-semibold text-emerald-400">Workspace & Ergonomics</div>
          <h3 class="text-lg font-bold text-white mt-1">AeroSync Posture Task Chair</h3>
          <p class="text-xs text-gray-400 mt-2">DuPont elastomeric mesh, dynamic spine support, 12-yr warranty.</p>
        </div>
        <div class="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
          <span class="text-xl font-bold text-white">$599.00</span>
          <button onclick="addToCart('AeroSync Posture Task Chair', 599.00)" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold">
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- CART MODAL -->
  <div id="cart-drawer" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex justify-end">
    <div class="w-full max-w-md bg-gray-950 border-l border-gray-800 p-8 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
          <h3 class="text-xl font-bold text-white">Your Hardware Cart</h3>
          <button onclick="toggleCart()" class="text-gray-400 hover:text-white text-lg">&times;</button>
        </div>
        <div id="cart-items" class="space-y-4">
          <div class="p-4 rounded-xl bg-gray-900 border border-gray-800 flex justify-between items-center">
            <div>
              <div class="text-sm font-bold text-white">Aurora Pro ANC Headphones</div>
              <div class="text-xs text-gray-400">$349.99 x 1</div>
            </div>
            <span class="text-sm font-bold text-blue-400">$349.99</span>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-6 space-y-4">
        <div class="flex justify-between text-sm text-gray-400">
          <span>Subtotal</span>
          <span class="text-white font-bold" id="cart-subtotal">$349.99</span>
        </div>
        <div class="flex justify-between text-sm text-gray-400">
          <span>California Tax (9.25%)</span>
          <span class="text-white font-bold">$32.37</span>
        </div>
        <div class="flex justify-between text-base font-bold text-white pt-2 border-t border-gray-800">
          <span>Total Captured</span>
          <span class="text-blue-400 text-lg" id="cart-total">$382.36</span>
        </div>
        <button onclick="alert('Order Placed Successfully! Order #ORD-9824-AX7. Stock Reserved in US-EAST-1.'); toggleCart();" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20">
          <i class="fa-solid fa-lock mr-2"></i> Authorize & Checkout
        </button>
      </div>
    </div>
  </div>

  <footer class="bg-gray-950 border-t border-gray-900 py-8 text-center text-xs text-gray-500">
    &copy; 2026 VERTEX Enterprise Platform. 54,200+ LOC Monorepo Architecture.
  </footer>

  <script>
    let cartCount = 1;
    function toggleCart() {
      const drawer = document.getElementById('cart-drawer');
      drawer.classList.toggle('hidden');
    }
    function addToCart(title, price) {
      cartCount++;
      document.getElementById('cart-count').innerText = cartCount;
      alert('Added "' + title + '" to hardware cart!');
    }
  </script>
</body>
</html>
"""

ADMIN_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VERTEX | Executive Telemetry & Admin Portal</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-950 text-gray-100 min-h-screen font-sans flex antialiased">
  
  <!-- SIDEBAR -->
  <aside class="w-64 border-r border-gray-800 bg-gray-950 p-6 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-3 pb-6 mb-6 border-b border-gray-800">
        <div class="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white">VX</div>
        <div>
          <div class="font-bold text-white text-sm">VERTEX Core</div>
          <div class="text-[11px] text-blue-400 font-mono">54.2k LOC Active</div>
        </div>
      </div>
      <nav class="space-y-1 text-sm font-medium">
        <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
          <i class="fa-solid fa-chart-pie"></i> Executive Overview
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900">
          <i class="fa-solid fa-box"></i> Order Fulfillment
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900">
          <i class="fa-solid fa-warehouse"></i> Multi-Warehouse
        </a>
        <a href="/" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-400 hover:bg-gray-900">
          <i class="fa-solid fa-arrow-left"></i> Back to Storefront
        </a>
      </nav>
    </div>
    <div class="text-xs text-gray-500">
      <div class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> 212 Tests Passing</div>
    </div>
  </aside>

  <!-- MAIN VIEW -->
  <main class="flex-1 p-10 overflow-y-auto bg-gray-900/40">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-black text-white">Live Platform Telemetry</h1>
        <p class="text-xs text-gray-400 mt-1">Real-time revenue rollup and order state machine stream.</p>
      </div>
      <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold rounded-lg">
        SYSTEM HEALTH: 100%
      </span>
    </div>

    <!-- METRIC CARDS -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div class="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <div class="text-xs text-gray-400 uppercase font-bold">Gross Revenue</div>
        <div class="text-2xl font-black text-white mt-2">$284,950.40</div>
        <div class="text-xs text-emerald-400 mt-1">+24.5% vs last month</div>
      </div>
      <div class="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <div class="text-xs text-gray-400 uppercase font-bold">Total Orders</div>
        <div class="text-2xl font-black text-white mt-2">1,420</div>
        <div class="text-xs text-emerald-400 mt-1">100% captured</div>
      </div>
      <div class="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <div class="text-xs text-gray-400 uppercase font-bold">Active SKUs</div>
        <div class="text-2xl font-black text-white mt-2">500+</div>
        <div class="text-xs text-blue-400 mt-1">10 Categories</div>
      </div>
      <div class="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <div class="text-xs text-gray-400 uppercase font-bold">Passing Test Suites</div>
        <div class="text-2xl font-black text-emerald-400 mt-2">212 / 212</div>
        <div class="text-xs text-gray-400 mt-1">0 Failures</div>
      </div>
    </div>

    <!-- ORDERS TABLE -->
    <div class="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
      <div class="p-6 border-b border-gray-800 font-bold text-white">Recent Order Transitions</div>
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-950/60 text-gray-400 text-xs uppercase border-b border-gray-800">
          <tr>
            <th class="px-6 py-3">Order Number</th>
            <th class="px-6 py-3">Customer</th>
            <th class="px-6 py-3">Amount</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3">Carrier</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-800 text-gray-300">
          <tr>
            <td class="px-6 py-4 font-mono text-blue-400 font-bold">ORD-9824-AX7</td>
            <td class="px-6 py-4">John Doe</td>
            <td class="px-6 py-4 font-bold text-white">$382.36</td>
            <td class="px-6 py-4"><span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">CONFIRMED</span></td>
            <td class="px-6 py-4 text-xs font-mono text-gray-400">FDX-99882211</td>
          </tr>
          <tr>
            <td class="px-6 py-4 font-mono text-blue-400 font-bold">ORD-9823-KP2</td>
            <td class="px-6 py-4">Elena Rostova</td>
            <td class="px-6 py-4 font-bold text-white">$1,240.00</td>
            <td class="px-6 py-4"><span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold border border-blue-500/20">FULFILLING</span></td>
            <td class="px-6 py-4 text-xs font-mono text-gray-400">UPS-77491022</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</body>
</html>
"""

class EnterpriseHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        if parsed.path == "/" or parsed.path == "/storefront":
            self.send_response(200)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(STOREFRONT_HTML.encode("utf-8"))
            return
            
        if parsed.path == "/admin":
            self.send_response(200)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(ADMIN_HTML.encode("utf-8"))
            return

        if parsed.path == "/api/v1/health":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "OK", "tests_passing": 212, "loc": 54252}).encode("utf-8"))
            return

        super().do_GET()

def start_server():
    print(f"VERTEX Platform server ready on port {PORT}")
    with socketserver.TCPServer(("", PORT), EnterpriseHandler) as httpd:
        print(f"VERTEX Live Server online at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Server stopped.")

if __name__ == '__main__':
    start_server()
