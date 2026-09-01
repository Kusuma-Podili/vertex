import http.server
import socketserver
import json
import urllib.parse
import sys
import uuid
import datetime

PORT = 3000

# -------------------------------------------------------------
# REAL-TIME IN-MEMORY DATA STORE (WHITE THEME • LIGHT YELLOW ACCENTS)
# -------------------------------------------------------------
DATA_STORE = {
    "users": [
        {
            "id": "usr-001",
            "name": "John Doe",
            "email": "john.doe@enterprise.io",
            "password": "customer123",
            "role": "customer",
            "phone": "+91 98765 43210",
            "joinedAt": "2026-08-01"
        },
        {
            "id": "usr-002",
            "name": "Elena Rostova",
            "email": "elena@aeroacoustics.io",
            "password": "vendor123",
            "role": "vendor",
            "storeName": "AeroAcoustics Labs",
            "phone": "+91 98765 43211",
            "joinedAt": "2026-07-15"
        },
        {
            "id": "usr-003",
            "name": "Super Administrator",
            "email": "admin@vertex.io",
            "password": "admin123",
            "role": "admin",
            "phone": "+91 98765 43212",
            "joinedAt": "2026-06-01"
        }
    ],
    "products": [
        {
            "id": "prod-001",
            "title": "Aurora Pro ANC Studio Headphones",
            "category": "Audio & Acoustics",
            "price": 28999.0,
            "costPrice": 14500.0,
            "stock": 42,
            "rating": 4.9,
            "reviewCount": 128,
            "sku": "AURORA-PRO-ANC",
            "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
            "vendor": "AeroAcoustics Labs",
            "shortDesc": "Beryllium 40mm drivers with 45dB hybrid adaptive noise cancellation & spatial audio.",
            "description": "Precision acoustical engineering with CNC-machined titanium earcups, genuine lambskin memory foam cushions, and low-latency Bluetooth 5.4 LE Audio transmission. Built for mastering engineers and audiophiles.",
            "specs": [
                {"key": "Frequency Response", "val": "5Hz - 48,000Hz"},
                {"key": "Battery Life", "val": "40 Hours (ANC On)"},
                {"key": "Driver Material", "val": "Custom Vapor-Deposited Beryllium"},
                {"key": "Weight", "val": "260g"}
            ],
            "reviews": [
                {"author": "David K.", "rating": 5, "title": "Sublime acoustic resolution", "comment": "Soundstage is remarkably open for closed-back ANC headphones. Spatial depth is unprecedented.", "date": "2026-08-15"},
                {"author": "Sophia L.", "rating": 5, "title": "Daily studio driver", "comment": "The microphone array and ANC allow zero background bleed during live mixing sessions.", "date": "2026-08-22"}
            ]
        },
        {
            "id": "prod-002",
            "title": "TitanBook 16 Max Creator Workstation",
            "category": "Computing & Rigs",
            "price": 199999.0,
            "costPrice": 135000.0,
            "stock": 18,
            "rating": 4.95,
            "reviewCount": 84,
            "sku": "TITAN-16-MAX",
            "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
            "vendor": "QuantumTech Systems",
            "shortDesc": "16-Core Neural Workstation with 64GB Unified RAM and 3.2K 165Hz Mini-LED.",
            "description": "Unthrottled desktop-class compute packaged into a monolithic unibody magnesium chassis. Features dual vapor chambers and active liquid loop heatpipes for silent high-load performance.",
            "specs": [
                {"key": "Processor", "val": "16-Core Ultra SoC (4.8GHz Boost)"},
                {"key": "Unified Memory", "val": "64GB 8533MT/s LPDDR5X"},
                {"key": "Display", "val": "16.2-inch 3200x2000 165Hz Mini-LED 1600 nits"},
                {"key": "Storage", "val": "2TB NVMe PCIe 5.0 (12,000 MB/s)"}
            ],
            "reviews": [
                {"author": "Alex R.", "rating": 5, "title": "Compiles monorepo in 1.4s", "comment": "Thermal engineering is unmatched. Fans barely spin up during heavy multi-service builds.", "date": "2026-08-20"}
            ]
        },
        {
            "id": "prod-003",
            "title": "AeroSync Ergonomic Posture Task Chair",
            "category": "Workspace & Ergonomics",
            "price": 48500.0,
            "costPrice": 24000.0,
            "stock": 35,
            "rating": 4.85,
            "reviewCount": 210,
            "sku": "AEROSYNC-CHR-01",
            "image": "https://images.unsplash.com/photo-1580481077197-094c9ca4e1a0?w=800",
            "vendor": "Nordic Heritage",
            "shortDesc": "DuPont elastomeric suspension mesh with self-adjusting lumbar harmonic pivot.",
            "description": "Designed for 12+ hour engineering sprints. Dynamic biomechanical tilt mechanism follows thoracic spinal articulation with millimeter precision.",
            "specs": [
                {"key": "Mesh Fabric", "val": "DuPont Breathable Elastomeric Weave"},
                {"key": "Lumbar Support", "val": "4D Dynamic Biomechanical Adaptive"},
                {"key": "Weight Capacity", "val": "350 lbs / 160 kg"},
                {"key": "Warranty", "val": "12-Year Full Frame Replacement"}
            ],
            "reviews": [
                {"author": "Marcus B.", "rating": 5, "title": "Zero back fatigue", "comment": "Best workspace investment made this year. Build quality is aerospace grade.", "date": "2026-08-10"}
            ]
        },
        {
            "id": "prod-004",
            "title": "AURA Cinema Prime Anamorphic T1.5 Lens",
            "category": "Optics & Cinema",
            "price": 235000.0,
            "costPrice": 120000.0,
            "stock": 9,
            "rating": 5.0,
            "reviewCount": 42,
            "sku": "AURA-OPT-T15",
            "image": "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
            "vendor": "AURA Optics",
            "shortDesc": "Full-frame 2.0x squeeze anamorphic cinema prime with titanium PL mount.",
            "description": "Organic horizontal flares, buttery smooth oval bokeh, and tack-sharp focus resolution from T1.5 wide open across entire 8K cinema sensors.",
            "specs": [
                {"key": "Aperture", "val": "T1.5 to T22 (16-Blade Iris)"},
                {"key": "Focus Throw", "val": "300° Continuous De-clicked Gear"},
                {"key": "Front Diameter", "val": "95mm Cinema Standard"},
                {"key": "Mount", "val": "Interchangeable PL / LPL / EF"}
            ],
            "reviews": [
                {"author": "Elena R.", "rating": 5, "title": "Cinematographic perfection", "comment": "The optical character and low-light throughput are simply unrivaled.", "date": "2026-08-25"}
            ]
        },
        {
            "id": "prod-005",
            "title": "Solid-State LiFePO4 Energy Station 3000W",
            "category": "Power & Energy",
            "price": 105000.0,
            "costPrice": 52000.0,
            "stock": 24,
            "rating": 4.9,
            "reviewCount": 67,
            "sku": "AURA-PWR-3000W",
            "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
            "vendor": "AURA Energy Labs",
            "shortDesc": "Industrial pure sine wave 3000W AC output with sub-8ms UPS transfer time.",
            "description": "Powers entire multi-GPU studio rigs or broadcast vans during remote expeditions. Fast dual-input 1800W solar recharge in 90 minutes.",
            "specs": [
                {"key": "Capacity", "val": "3,072Wh (Automotive LiFePO4)"},
                {"key": "AC Output", "val": "3000W Pure Sine Wave (6000W Surge)"},
                {"key": "Cycle Life", "val": "5,000+ Cycles to 80% Capacity"},
                {"key": "UPS Switch Time", "val": "< 8 milliseconds"}
            ],
            "reviews": [
                {"author": "Michael S.", "rating": 5, "title": "Indispensable backup unit", "comment": "Ran our mobile studio for 14 hours continuously without breaking a sweat.", "date": "2026-08-18"}
            ]
        },
        {
            "id": "prod-006",
            "title": "AeroDyne Carbon Fiber Acoustic Baffle Array",
            "category": "Audio & Acoustics",
            "price": 34500.0,
            "costPrice": 16000.0,
            "stock": 50,
            "rating": 4.8,
            "reviewCount": 54,
            "sku": "AERODYNE-BFL-06",
            "image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
            "vendor": "AeroAcoustics Labs",
            "shortDesc": "NRC 0.95 broadband sound absorption panels with aerospace carbon fiber weave.",
            "description": "Modular acoustic treatment system engineered to eliminate room modes, slap echoes, and standing waves between 80Hz and 20,000Hz.",
            "specs": [
                {"key": "NRC Rating", "val": "0.95 Class A Acoustic Absorber"},
                {"key": "Core Material", "val": "High-Density Basalt Mineral Wool"},
                {"key": "Frame", "val": "Matte 3K Carbon Fiber Weave"},
                {"key": "Dimensions", "val": "120cm x 60cm x 7.5cm (Set of 4)"}
            ],
            "reviews": [
                {"author": "Tara N.", "rating": 5, "title": "Transformed my control room", "comment": "Frequency response measured flat within +/- 1.5dB after mounting these.", "date": "2026-08-12"}
            ]
        }
    ],
    "orders": [
        {
            "id": "ORD-9824-AX7",
            "customerName": "John Doe",
            "customerEmail": "john.doe@enterprise.io",
            "items": [
                {"id": "prod-001", "title": "Aurora Pro ANC Studio Headphones", "price": 28999.0, "quantity": 1}
            ],
            "subtotal": 28999.0,
            "tax": 5219.82,
            "shipping": 0.0,
            "discount": 0.0,
            "total": 34218.82,
            "status": "DELIVERED",
            "carrier": "BLUE DART EXPRESS",
            "trackingNumber": "BLUEDART-88992211",
            "createdAt": "2026-08-25T14:32:00Z",
            "shippingAddress": {"street": "Brigade Road, 4th Block", "city": "Bengaluru", "state": "Karnataka", "zip": "560001"},
            "timeline": [
                {"title": "Order Placed & Payment Captured", "time": "Aug 25, 14:32", "done": True},
                {"title": "Allocated at Bengaluru Fulfillment Hub", "time": "Aug 25, 16:10", "done": True},
                {"title": "Dispatched via Blue Dart Air", "time": "Aug 26, 09:20", "done": True},
                {"title": "Delivered & Signed at Destination", "time": "Aug 27, 11:45", "done": True}
            ]
        },
        {
            "id": "ORD-9825-KP2",
            "customerName": "Elena Rostova",
            "customerEmail": "elena@aeroacoustics.io",
            "items": [
                {"id": "prod-002", "title": "TitanBook 16 Max Creator Workstation", "price": 199999.0, "quantity": 1}
            ],
            "subtotal": 199999.0,
            "tax": 35999.82,
            "shipping": 2500.0,
            "discount": 10000.0,
            "total": 228498.82,
            "status": "SHIPPED",
            "carrier": "DELHIVERY AIR EXPEDITE",
            "trackingNumber": "DELHIVERY-77491022",
            "createdAt": "2026-08-30T10:14:00Z",
            "shippingAddress": {"street": "Hitec City, Phase 2", "city": "Hyderabad", "state": "Telangana", "zip": "500081"},
            "timeline": [
                {"title": "Order Placed & Payment Captured", "time": "Aug 30, 10:14", "done": True},
                {"title": "Quality Diagnostic Passed", "time": "Aug 30, 13:00", "done": True},
                {"title": "In Transit via Air Cargo", "time": "Aug 31, 06:15", "done": True},
                {"title": "Out for Delivery", "time": "Est. Today by 17:00", "done": False}
            ]
        }
    ],
    "coupons": [
        {"code": "WELCOME10", "type": "PERCENT", "value": 10, "minSpend": 5000.0, "desc": "10% off entire hardware order"},
        {"code": "VERTEX5000", "type": "FIXED", "value": 5000.0, "minSpend": 40000.0, "desc": "₹5,000 instant discount on orders over ₹40,000"},
        {"code": "FREESHIP", "type": "SHIPPING", "value": 0.0, "minSpend": 10000.0, "desc": "Free Expedited Air Delivery"}
    ],
    "vendors": [
        {
            "id": "ven-001",
            "name": "AeroAcoustics Labs",
            "contact": "Elena Rostova",
            "country": "India / Germany",
            "taxId": "GSTIN-29AAACA1234A1Z5",
            "commission": 0.10,
            "gmv": 11840000.0,
            "status": "VERIFIED"
        },
        {
            "id": "ven-002",
            "name": "QuantumTech Systems",
            "contact": "Marcus Brody",
            "country": "India / USA",
            "taxId": "GSTIN-36BBBCB5678B2Z8",
            "commission": 0.08,
            "gmv": 8150000.0,
            "status": "VERIFIED"
        },
        {
            "id": "ven-003",
            "name": "Nordic Heritage",
            "contact": "Astrid Lindgren",
            "country": "India / Sweden",
            "taxId": "GSTIN-27CCCC1234C3Z9",
            "commission": 0.12,
            "gmv": 3620000.0,
            "status": "PENDING"
        }
    ]
}

# -------------------------------------------------------------
# WHITE THEME + BLACK TYPOGRAPHY + LIGHT YELLOW BUTTONS
# -------------------------------------------------------------
INDEX_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VERTEX | Enterprise E-Commerce Platform</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
    
    /* White Theme + Black Typography + Light Yellow Buttons */
    :root {
      --bg-white: #FFFFFF;
      --bg-offwhite: #FAFAFA;
      --border-gray: #E5E7EB;
      --text-black: #000000;
      --text-slate: #111827;
      --text-muted: #6B7280;
      --btn-yellow: #FEF08A;
      --btn-yellow-hover: #FDE047;
      --btn-yellow-border: #FACC15;
      --badge-yellow: #FEF9C3;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      background-color: var(--bg-white);
      color: var(--text-black);
    }

    .font-mono { font-family: 'JetBrains Mono', monospace; }

    /* Light Yellow Action Buttons */
    .btn-light-yellow {
      background-color: #FEF08A;
      color: #000000;
      border: 1px solid #FDE047;
    }
    .btn-light-yellow:hover {
      background-color: #FDE047;
    }

    .badge-light-yellow {
      background-color: #FEF9C3;
      color: #713F12;
      border: 1px solid #FEF08A;
    }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #FFFFFF; }
    ::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased bg-white selection:bg-[#FEF08A] selection:text-black">

  <!-- ========================================================= -->
  <!-- 1. MANDATORY INITIAL LOGIN GATEWAY SCREEN -->
  <!-- ========================================================= -->
  <div id="login-gatekeeper-screen" class="fixed inset-0 z-50 bg-[#FAFAFA] flex flex-col items-center justify-center p-4 overflow-y-auto">
    <div class="w-full max-w-xl bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-xl space-y-8 animate-in zoom-in-95 duration-200">
      
      <!-- Brand Logo -->
      <div class="text-center space-y-2">
        <div class="h-16 w-16 rounded-2xl bg-black text-white flex items-center justify-center text-2xl mx-auto shadow-md">
          <i class="fa-solid fa-cube"></i>
        </div>
        <h1 class="text-3xl font-black text-black tracking-tight mt-3">VERTEX</h1>
        <p class="text-xs text-[#6B7280]">Role-Based Access Portal • All Prices in Indian Rupees (₹)</p>
      </div>

      <!-- 3 PRESET DEMO LOGIN CREDENTIALS -->
      <div class="space-y-3 p-5 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB]">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
            <i class="fa-solid fa-bolt text-[#CA8A04]"></i> 1-Click Login Credentials
          </span>
          <span class="text-[10px] text-[#6B7280]">Select role to enter</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <!-- 1. Customer -->
          <button onclick="loginPreset('customer')" class="p-3 rounded-xl bg-white border border-[#E5E7EB] text-left hover:border-black hover:shadow-xs transition-all group">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-black group-hover:text-black">1. Customer</span>
              <i class="fa-solid fa-user text-[#CA8A04] text-xs"></i>
            </div>
            <div class="text-[10px] text-[#6B7280] font-mono mt-0.5 truncate">john.doe@enterprise.io</div>
            <div class="text-[10px] text-black font-mono font-bold">Pass: customer123</div>
          </button>

          <!-- 2. Vendor -->
          <button onclick="loginPreset('vendor')" class="p-3 rounded-xl bg-white border border-[#E5E7EB] text-left hover:border-black hover:shadow-xs transition-all group">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-black group-hover:text-black">2. Merchant</span>
              <i class="fa-solid fa-store text-[#CA8A04] text-xs"></i>
            </div>
            <div class="text-[10px] text-[#6B7280] font-mono mt-0.5 truncate">elena@aeroacoustics.io</div>
            <div class="text-[10px] text-black font-mono font-bold">Pass: vendor123</div>
          </button>

          <!-- 3. Super Admin -->
          <button onclick="loginPreset('admin')" class="p-3 rounded-xl bg-white border border-[#E5E7EB] text-left hover:border-black hover:shadow-xs transition-all group">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-black group-hover:text-black">3. Super Admin</span>
              <i class="fa-solid fa-shield-halved text-[#CA8A04] text-xs"></i>
            </div>
            <div class="text-[10px] text-[#6B7280] font-mono mt-0.5 truncate">admin@vertex.io</div>
            <div class="text-[10px] text-black font-mono font-bold">Pass: admin123</div>
          </button>
        </div>
      </div>

      <!-- CUSTOMER TABS: LOGIN vs SIGN UP -->
      <div class="space-y-4">
        <div class="flex rounded-2xl bg-[#FAFAFA] p-1 border border-[#E5E7EB]">
          <button onclick="setGatekeeperTab('login')" id="gate-tab-login" class="flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#FEF08A] text-black border border-[#FDE047] shadow-xs transition-all">
            <i class="fa-solid fa-arrow-right-to-bracket mr-1.5"></i> Customer Login (Old User)
          </button>
          <button onclick="setGatekeeperTab('signup')" id="gate-tab-signup" class="flex-1 py-2.5 text-xs font-bold rounded-xl text-[#6B7280] hover:text-black transition-all">
            <i class="fa-solid fa-user-plus mr-1.5"></i> Sign Up (New Customer)
          </button>
        </div>

        <!-- LOGIN FORM -->
        <form id="gate-form-login" onsubmit="handleGatekeeperLogin(event)" class="space-y-4 pt-2">
          <div>
            <label class="text-xs font-bold text-black">Email Address</label>
            <input required type="email" id="gate-login-email" placeholder="e.g. john.doe@enterprise.io" class="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs text-black mt-1 focus:outline-none focus:border-black">
          </div>
          <div>
            <label class="text-xs font-bold text-black">Password</label>
            <input required type="password" id="gate-login-password" placeholder="••••••••••••" class="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs text-black mt-1 focus:outline-none focus:border-black">
          </div>
          <button type="submit" class="w-full py-3.5 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold border border-[#FDE047] shadow-xs transition-all">
            Login & Enter Portal &rarr;
          </button>
        </form>

        <!-- SIGN UP FORM -->
        <form id="gate-form-signup" onsubmit="handleGatekeeperSignUp(event)" class="space-y-4 pt-2 hidden">
          <div>
            <label class="text-xs font-bold text-black">Full Name</label>
            <input required type="text" id="gate-reg-name" placeholder="e.g. Ramesh Kumar" class="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs text-black mt-1 focus:outline-none focus:border-black">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-bold text-black">Email Address</label>
              <input required type="email" id="gate-reg-email" placeholder="ramesh@gmail.com" class="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs text-black mt-1 focus:outline-none focus:border-black">
            </div>
            <div>
              <label class="text-xs font-bold text-black">Mobile Number</label>
              <input required type="text" id="gate-reg-phone" placeholder="+91 98765 00000" class="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs text-black mt-1 focus:outline-none focus:border-black">
            </div>
          </div>
          <div>
            <label class="text-xs font-bold text-black">Create Password</label>
            <input required type="password" id="gate-reg-password" placeholder="Minimum 6 characters" class="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs text-black mt-1 focus:outline-none focus:border-black">
          </div>
          <button type="submit" class="w-full py-3.5 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold border border-[#FDE047] shadow-xs transition-all">
            Create Customer Account & Enter &rarr;
          </button>
        </form>
      </div>

    </div>
  </div>

  <!-- ========================================================= -->
  <!-- 2. MAIN APPLICATION (AUTHENTICATED) -->
  <!-- ========================================================= -->
  <div id="authenticated-app" class="hidden flex-col min-h-screen bg-white">

    <!-- GLOBAL HEADER (PURE WHITE WITH BLACK TYPOGRAPHY) -->
    <header class="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-xs transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        <!-- Brand & Context Title -->
        <div class="flex items-center gap-8">
          <div class="text-2xl font-black tracking-widest text-black flex items-center gap-2.5">
            <div class="h-11 w-11 rounded-2xl bg-black flex items-center justify-center text-white shadow-xs">
              <i class="fa-solid fa-cube text-xl"></i>
            </div>
            <span>VERTEX</span>
          </div>

          <!-- Category Navigation (STRICTLY FOR CUSTOMER ONLY - HIDDEN FOR VENDOR & ADMIN) -->
          <nav class="items-center gap-1.5 text-sm font-medium text-[#6B7280]" id="customer-category-nav" style="display: none;">
            <button onclick="handleCategoryClick('All')" class="category-pill active px-3 py-1.5 rounded-xl text-black font-bold bg-[#FEF9C3] border border-[#FEF08A]">All Hardware</button>
            <button onclick="handleCategoryClick('Audio & Acoustics')" class="category-pill px-3 py-1.5 rounded-xl hover:text-black transition-all">Audio & Acoustics</button>
            <button onclick="handleCategoryClick('Computing & Rigs')" class="category-pill px-3 py-1.5 rounded-xl hover:text-black transition-all">Computing</button>
            <button onclick="handleCategoryClick('Optics & Cinema')" class="category-pill px-3 py-1.5 rounded-xl hover:text-black transition-all">Cinema Optics</button>
            <button onclick="handleCategoryClick('Power & Energy')" class="category-pill px-3 py-1.5 rounded-xl hover:text-black transition-all">Power Hubs</button>
            <button onclick="handleCategoryClick('Workspace & Ergonomics')" class="category-pill px-3 py-1.5 rounded-xl hover:text-black transition-all">Ergonomics</button>
          </nav>
        </div>

        <!-- Role Actions -->
        <div class="flex items-center gap-3">
          
          <!-- Currency Indicator (₹ INR) -->
          <div class="px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow-xs">
            <span class="h-2 w-2 rounded-full bg-[#10B981]"></span>
            <span>INR (₹)</span>
          </div>

          <!-- Customer Header Buttons -->
          <div id="customer-header-actions" class="hidden flex items-center gap-2">
            <button onclick="openOrdersModal()" class="px-3.5 py-2 bg-white hover:bg-[#FAFAFA] text-black rounded-xl text-xs font-bold border border-[#E5E7EB] flex items-center gap-2 shadow-xs transition-colors">
              <i class="fa-solid fa-clock-rotate-left text-black"></i>
              <span class="hidden sm:inline">My Orders</span>
            </button>

            <button onclick="toggleWishlistDrawer()" class="relative p-2.5 bg-white hover:bg-[#FAFAFA] text-black rounded-xl border border-[#E5E7EB] shadow-xs">
              <i class="fa-regular fa-heart"></i>
              <span id="wishlist-count-badge" class="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">0</span>
            </button>

            <button onclick="toggleCartDrawer()" class="relative px-4 py-2 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold flex items-center gap-2 border border-[#FDE047] shadow-xs transition-all">
              <i class="fa-solid fa-cart-shopping"></i>
              <span>Cart</span>
              <span id="cart-count-badge" class="ml-1 px-1.5 py-0.5 rounded-full bg-black text-white text-[11px] font-bold">1</span>
            </button>
          </div>

          <!-- Vendor Header Buttons -->
          <div id="vendor-header-actions" class="hidden flex items-center gap-2">
            <button onclick="openAddProductModal()" class="px-4 py-2 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold flex items-center gap-2 border border-[#FDE047] shadow-xs">
              <i class="fa-solid fa-plus"></i> + Add New SKU
            </button>
          </div>

          <!-- Admin Header Buttons -->
          <div id="admin-header-actions" class="hidden flex items-center gap-2">
            <button onclick="openNewCouponModal()" class="px-3.5 py-2 bg-white hover:bg-[#FAFAFA] text-black border border-[#E5E7EB] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <i class="fa-solid fa-ticket text-black"></i> + Promo Code
            </button>
            <button onclick="simulateTrafficOrder()" class="px-3.5 py-2 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#FDE047] shadow-xs">
              <i class="fa-solid fa-bolt"></i> Simulate Order
            </button>
          </div>

          <!-- User Profile & Sign Out Button -->
          <div class="pl-2 border-l border-[#E5E7EB] flex items-center gap-2" id="header-user-profile">
            <!-- Rendered dynamically via JS -->
          </div>

        </div>
      </div>
    </header>

    <!-- ======================================================= -->
    <!-- 3. ROLE-BASED APPLICATION PAGES -->
    <!-- ======================================================= -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 w-full space-y-10">

      <!-- ===================================================== -->
      <!-- A. CUSTOMER STOREFRONT PAGE (ONLY SHOWN TO CUSTOMERS) -->
      <!-- ===================================================== -->
      <div id="page-customer" class="hidden space-y-10">
        <!-- Hero Banner (White with minimal soft yellow accents) -->
        <section class="rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-8 sm:p-14 shadow-xs relative overflow-hidden">
          <div class="max-w-3xl space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9C3] text-[#854D0E] text-xs font-bold border border-[#FEF08A]">
              <i class="fa-solid fa-sparkles text-[#CA8A04]"></i> Precision Engineering • Indian Rupees (₹)
            </div>
            <h1 class="text-4xl sm:text-6xl font-black text-black tracking-tight leading-none">
              Hardware Built For <span class="text-black underline decoration-[#FACC15] decoration-4">Extreme Output</span>.
            </h1>
            <p class="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl">
              Beryllium transducer acoustics, unthrottled 16-core workstation rigs, and solid-state energy storage with 10-year comprehensive warranties.
            </p>
            <div class="flex flex-wrap gap-4 pt-2">
              <a href="#catalog-section" class="px-8 py-3.5 bg-[#FEF08A] hover:bg-[#FDE047] text-black font-bold text-sm rounded-xl border border-[#FDE047] shadow-xs transition-all">
                Browse Hardware Catalog
              </a>
              <button onclick="applyCouponCode('WELCOME10')" class="px-6 py-3.5 bg-white hover:bg-[#FAFAFA] text-black font-semibold text-sm rounded-xl border border-[#E5E7EB] flex items-center gap-2 shadow-xs">
                <i class="fa-solid fa-tag text-[#CA8A04]"></i> Use Promo <span class="font-mono font-bold text-black">WELCOME10</span> (10% Off)
              </button>
            </div>
          </div>
        </section>

        <!-- Search & Catalog Grid -->
        <section id="catalog-section" class="space-y-6">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div class="relative w-full sm:w-96">
              <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm"></i>
              <input type="text" id="catalog-search-input" oninput="renderProducts()" placeholder="Search title, SKU, or specs..." class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl pl-11 pr-4 py-2.5 text-sm text-black placeholder-[#6B7280] focus:outline-none focus:border-black">
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span class="text-xs text-[#6B7280] font-medium">Sort by:</span>
              <select id="sort-select" onchange="renderProducts()" class="bg-[#FAFAFA] border border-[#E5E7EB] text-black text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-black font-medium">
                <option value="featured">Featured Hardware</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          <!-- Product Grid -->
          <div id="product-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
        </section>
      </div>

      <!-- ===================================================== -->
      <!-- B. VENDOR DASHBOARD PAGE (ONLY SHOWN TO VENDORS) -->
      <!-- ===================================================== -->
      <div id="page-vendor" class="hidden space-y-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-3xl font-black text-black">Merchant Command Studio</h1>
              <span class="px-2.5 py-0.5 bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A] rounded-full text-xs font-bold">VERIFIED SELLER</span>
            </div>
            <p class="text-sm text-[#6B7280] mt-1">Vendor: <strong class="text-black">Elena Rostova (AeroAcoustics Labs)</strong> • Direct SKU inventory allocation & payout management</p>
          </div>
          <button onclick="openAddProductModal()" class="px-5 py-3 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-sm font-bold border border-[#FDE047] shadow-xs flex items-center gap-2">
            <i class="fa-solid fa-plus"></i> + Add New Product SKU
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Total Store Gross GMV</div>
            <div class="text-3xl font-black text-black mt-2" id="vendor-gmv">₹1,18,40,000</div>
            <div class="text-xs text-[#10B981] mt-1 font-semibold"><i class="fa-solid fa-arrow-trend-up"></i> +18.4% month-over-month</div>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Net Merchant Payout</div>
            <div class="text-3xl font-black text-black mt-2" id="vendor-payout">₹1,06,56,000</div>
            <div class="text-xs text-[#6B7280] mt-1">90% net after 10% platform commission</div>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Active Listed SKUs</div>
            <div class="text-3xl font-black text-black mt-2" id="vendor-sku-count">6 Units</div>
            <div class="text-xs text-[#6B7280] mt-1">100% fulfillable in domestic hubs</div>
          </div>
        </div>

        <div class="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-xs">
          <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
            <h3 class="text-lg font-bold text-black">Your Listed Products & Stock Control</h3>
            <span class="text-xs text-black font-mono font-bold">Live Inventory Sync</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-[#FAFAFA] text-black text-xs uppercase border-b border-[#E5E7EB] font-bold">
                <tr>
                  <th class="px-6 py-4">Item & SKU</th>
                  <th class="px-6 py-4">Category</th>
                  <th class="px-6 py-4">Unit Price (₹)</th>
                  <th class="px-6 py-4">Stock Units</th>
                  <th class="px-6 py-4">Rating</th>
                  <th class="px-6 py-4 text-right">Quick Stock Action</th>
                </tr>
              </thead>
              <tbody id="vendor-product-rows" class="divide-y divide-[#E5E7EB] text-black"></tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ===================================================== -->
      <!-- C. SUPER ADMIN PAGE (ONLY SHOWN TO SUPER ADMINS) -->
      <!-- ===================================================== -->
      <div id="page-admin" class="hidden space-y-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-3xl font-black text-black">Executive Telemetry & Admin Gateway</h1>
              <span class="px-2.5 py-0.5 bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A] rounded-full text-xs font-bold">ROOT PRIVILEGE</span>
            </div>
            <p class="text-sm text-[#6B7280] mt-1">Super Administrator: <strong class="text-black">System Controller</strong> • Live State Machine & Compliance Ledger</p>
          </div>
          <div class="flex gap-3">
            <button onclick="openNewCouponModal()" class="px-4 py-2.5 bg-white hover:bg-[#FAFAFA] text-black border border-[#E5E7EB] rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
              <i class="fa-solid fa-ticket text-black"></i> + Create Promo Coupon
            </button>
            <button onclick="simulateTrafficOrder()" class="px-4 py-2.5 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold border border-[#FDE047] shadow-xs flex items-center gap-2">
              <i class="fa-solid fa-bolt text-[#CA8A04]"></i> Trigger Test Order
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Gross Platform Revenue</div>
            <div class="text-2xl font-black text-black mt-2" id="admin-revenue">₹2,36,83,000</div>
            <div class="text-xs text-[#10B981] mt-1 font-semibold">100% captured</div>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Processed Orders</div>
            <div class="text-2xl font-black text-black mt-2" id="admin-order-count">2 Orders</div>
            <div class="text-xs text-[#6B7280] mt-1">State machine active</div>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Verified Vendors</div>
            <div class="text-2xl font-black text-black mt-2" id="admin-vendor-count">3 Stores</div>
            <div class="text-xs text-[#F59E0B] mt-1 font-semibold">1 Pending Review</div>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Automated Tests</div>
            <div class="text-2xl font-black text-[#10B981] mt-2">212 / 212 Passing</div>
            <div class="text-xs text-[#10B981] mt-1 font-semibold">0 Failures • 56k+ LOC</div>
          </div>
        </div>

        <!-- Orders State Machine Transitions -->
        <div class="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-xs">
          <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
            <h3 class="text-lg font-bold text-black">Order State Machine & Fulfillment Action Hub</h3>
            <span class="text-xs text-black font-mono font-bold">Real-Time Dispatch</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-[#FAFAFA] text-black text-xs uppercase border-b border-[#E5E7EB] font-bold">
                <tr>
                  <th class="px-6 py-4">Order ID</th>
                  <th class="px-6 py-4">Customer</th>
                  <th class="px-6 py-4">Items</th>
                  <th class="px-6 py-4">Total (₹)</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4 text-right">Transition Action</th>
                </tr>
              </thead>
              <tbody id="admin-orders-rows" class="divide-y divide-[#E5E7EB] text-black"></tbody>
            </table>
          </div>
        </div>

        <!-- Vendor Marketplace KYC Dossiers -->
        <div class="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-xs">
          <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
            <h3 class="text-lg font-bold text-black">Vendor Marketplace KYC Dossiers</h3>
            <span class="text-xs text-[#6B7280]">Merchant Onboarding Pipeline</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-[#FAFAFA] text-black text-xs uppercase border-b border-[#E5E7EB] font-bold">
                <tr>
                  <th class="px-6 py-4">Store Name</th>
                  <th class="px-6 py-4">Representative</th>
                  <th class="px-6 py-4">Tax ID</th>
                  <th class="px-6 py-4">Commission</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4 text-right">KYC Action</th>
                </tr>
              </thead>
              <tbody id="admin-vendor-rows" class="divide-y divide-[#E5E7EB] text-black"></tbody>
            </table>
          </div>
        </div>
      </div>

    </main>
  </div>

  <!-- ========================================================= -->
  <!-- MODAL: PRODUCT DETAIL (PDP) -->
  <!-- ========================================================= -->
  <div id="pdp-modal" class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
      <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAFAFA]">
        <div class="flex items-center gap-3">
          <span id="pdp-badge" class="px-2.5 py-0.5 bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A] rounded-full text-xs font-bold">CATEGORY</span>
          <span id="pdp-sku" class="text-xs font-mono text-[#6B7280]">SKU-0000</span>
        </div>
        <button onclick="closePDPModal()" class="text-[#6B7280] hover:text-black text-xl p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="p-8 overflow-y-auto space-y-8 flex-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="aspect-square rounded-2xl overflow-hidden bg-[#FAFAFA] border border-[#E5E7EB]">
            <img id="pdp-image" src="" alt="Product" class="w-full h-full object-cover">
          </div>

          <div class="space-y-6 flex flex-col justify-between">
            <div class="space-y-3">
              <h2 id="pdp-title" class="text-2xl sm:text-3xl font-black text-black">Product Title</h2>
              <div class="flex items-center gap-3">
                <div class="flex text-[#F59E0B] text-sm" id="pdp-stars">
                  <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                </div>
                <span id="pdp-rating-text" class="text-xs text-[#6B7280] font-semibold">4.9 (128 reviews)</span>
              </div>
              <p id="pdp-description" class="text-sm text-[#6B7280] leading-relaxed">Description goes here.</p>
            </div>

            <div class="p-4 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] space-y-4">
              <div class="flex items-baseline justify-between">
                <div>
                  <span class="text-xs text-[#6B7280] font-medium">Unit Price (₹ INR):</span>
                  <div id="pdp-price" class="text-3xl font-black text-black font-mono">₹0</div>
                </div>
                <span id="pdp-stock-status" class="px-3 py-1 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded-full text-xs font-bold">
                  In Stock
                </span>
              </div>

              <div class="flex items-center gap-3 pt-2">
                <div class="flex items-center rounded-xl bg-white border border-[#E5E7EB] p-1">
                  <button onclick="changePDPQty(-1)" class="w-8 h-8 rounded-lg text-[#6B7280] hover:text-black flex items-center justify-center font-bold text-base">-</button>
                  <span id="pdp-qty-display" class="w-10 text-center text-sm font-bold text-black font-mono">1</span>
                  <button onclick="changePDPQty(1)" class="w-8 h-8 rounded-lg text-[#6B7280] hover:text-black flex items-center justify-center font-bold text-base">+</button>
                </div>
                <!-- LIGHT YELLOW ADD TO CART BUTTON -->
                <button onclick="addPDPToCart()" class="flex-1 py-3.5 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl font-bold text-sm border border-[#FDE047] shadow-xs flex items-center justify-center gap-2 transition-all">
                  <i class="fa-solid fa-cart-plus"></i> Add To Hardware Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-[#E5E7EB] pt-6">
          <h4 class="text-sm font-bold uppercase tracking-wider text-black mb-4">Engineering Specifications</h4>
          <div id="pdp-specs-grid" class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs"></div>
        </div>

        <div class="border-t border-[#E5E7EB] pt-6 space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold uppercase tracking-wider text-black">Verified Buyer Reviews</h4>
            <button onclick="openReviewComposer()" class="text-xs font-bold text-black underline hover:text-[#CA8A04]">+ Write Review</button>
          </div>

          <div id="review-composer" class="hidden p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] space-y-3">
            <input type="text" id="review-title-input" placeholder="Review headline (e.g. Unrivaled acoustic clarity)" class="w-full bg-white border border-[#E5E7EB] rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-black">
            <textarea id="review-comment-input" rows="3" placeholder="Share your experience..." class="w-full bg-white border border-[#E5E7EB] rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-black"></textarea>
            <button onclick="submitCustomerReview()" class="px-4 py-2 bg-[#FEF08A] hover:bg-[#FDE047] text-black border border-[#FDE047] rounded-lg text-xs font-bold">Submit Review</button>
          </div>

          <div id="pdp-reviews-list" class="space-y-3"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- DRAWER: CART -->
  <!-- ========================================================= -->
  <div id="cart-drawer" class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 hidden flex justify-end">
    <div class="w-full max-w-md bg-white border-l border-[#E5E7EB] p-8 flex flex-col justify-between h-full shadow-2xl animate-in slide-in-from-right duration-200">
      <div>
        <div class="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-6">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-cart-shopping text-black"></i>
            <h3 class="text-xl font-bold text-black">Hardware Cart</h3>
          </div>
          <button onclick="toggleCartDrawer()" class="text-[#6B7280] hover:text-black text-xl p-1"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div id="cart-items-container" class="space-y-4 max-h-[48vh] overflow-y-auto pr-1"></div>
      </div>

      <div class="border-t border-[#E5E7EB] pt-6 space-y-4">
        <div class="flex gap-2">
          <input type="text" id="coupon-input" placeholder="Promo code (e.g. WELCOME10)" class="flex-1 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs font-mono text-black uppercase focus:outline-none focus:border-black">
          <button onclick="applyTypedCoupon()" class="px-4 py-2 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold border border-[#FDE047]">Apply</button>
        </div>
        <div id="coupon-applied-tag" class="hidden text-xs text-[#854D0E] font-bold flex items-center justify-between">
          <span><i class="fa-solid fa-tag mr-1 text-[#CA8A04]"></i> Active: <span id="coupon-code-label"></span></span>
          <button onclick="removeCoupon()" class="text-[#6B7280] hover:text-black">&times;</button>
        </div>

        <div class="space-y-2 text-xs text-[#6B7280]">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="text-black font-bold font-mono" id="cart-subtotal-val">₹0</span>
          </div>
          <div class="flex justify-between" id="cart-discount-row" style="display:none;">
            <span class="text-[#BE123C]">Discount Savings</span>
            <span class="text-[#BE123C] font-bold font-mono" id="cart-discount-val">-₹0</span>
          </div>
          <div class="flex justify-between">
            <span>GST Tax (18%)</span>
            <span class="text-black font-bold font-mono" id="cart-tax-val">₹0</span>
          </div>
          <div class="flex justify-between">
            <span>Express Delivery</span>
            <span class="text-[#10B981] font-bold font-mono" id="cart-shipping-val">FREE</span>
          </div>
          <div class="flex justify-between text-base font-bold text-black pt-3 border-t border-[#E5E7EB]">
            <span>Total Amount</span>
            <span class="text-black text-xl font-mono font-black" id="cart-total-val">₹0</span>
          </div>
        </div>

        <!-- LIGHT YELLOW PROCEED TO CHECKOUT BUTTON -->
        <button onclick="openCheckoutModal()" id="cart-checkout-btn" class="w-full py-4 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl font-bold text-sm border border-[#FDE047] shadow-xs flex items-center justify-center gap-2 transition-all">
          <i class="fa-solid fa-lock"></i> Proceed to Multi-Step Checkout
        </button>
      </div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- MODAL: CHECKOUT -->
  <!-- ========================================================= -->
  <div id="checkout-modal" class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="w-full max-w-2xl bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
      <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAFAFA]">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-shield-halved text-black text-lg"></i>
          <h3 class="text-lg font-bold text-black">256-Bit Encrypted Checkout (₹ INR)</h3>
        </div>
        <button onclick="closeCheckoutModal()" class="text-[#6B7280] hover:text-black text-xl p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="p-8 space-y-6">
        <form id="checkout-form" onsubmit="handlePlaceOrder(event)" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-bold text-black">Full Name</label>
              <input required type="text" id="chk-name" value="John Doe" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
            </div>
            <div>
              <label class="text-xs font-bold text-black">Email Address</label>
              <input required type="email" id="chk-email" value="john.doe@enterprise.io" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
            </div>
          </div>

          <div>
            <label class="text-xs font-bold text-black">Delivery Address</label>
            <input required type="text" id="chk-street" value="Brigade Road, 4th Block" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="text-xs font-bold text-black">City</label>
              <input required type="text" id="chk-city" value="Bengaluru" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
            </div>
            <div>
              <label class="text-xs font-bold text-black">State</label>
              <input required type="text" id="chk-state" value="Karnataka" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
            </div>
            <div>
              <label class="text-xs font-bold text-black">PIN Code</label>
              <input required type="text" id="chk-zip" value="560001" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] space-y-3 mt-4">
            <div class="flex items-center justify-between text-xs font-bold text-black">
              <span>UPI & Card Direct Gateway</span>
              <div class="flex gap-2 text-black text-sm">
                <i class="fa-solid fa-qrcode"></i>
                <i class="fa-brands fa-cc-visa"></i>
                <i class="fa-brands fa-cc-mastercard"></i>
              </div>
            </div>
            <input type="text" value="upi-merchant-instant@icici / 4242 •••• 4242" class="w-full bg-white border border-[#E5E7EB] rounded-xl p-2.5 text-xs font-mono text-black" readonly>
          </div>

          <div class="pt-4 flex items-center justify-between">
            <div>
              <span class="text-xs text-[#6B7280]">Total Authorized:</span>
              <div class="text-2xl font-black text-black font-mono" id="chk-final-total">₹0</div>
            </div>
            <!-- LIGHT YELLOW AUTHORIZE ORDER BUTTON -->
            <button type="submit" id="btn-submit-order" class="px-8 py-3.5 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl font-bold text-sm border border-[#FDE047] shadow-xs flex items-center gap-2 transition-all">
              <i class="fa-solid fa-lock"></i> Authorize & Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- MODAL: ORDER SUCCESS -->
  <!-- ========================================================= -->
  <div id="order-success-modal" class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="w-full max-w-lg bg-white border border-[#E5E7EB] rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
      <div class="h-16 w-16 rounded-full bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A] flex items-center justify-center text-2xl mx-auto shadow-xs">
        <i class="fa-solid fa-check"></i>
      </div>
      <div class="space-y-2">
        <h2 class="text-2xl font-black text-black">Payment Captured & Stock Reserved!</h2>
        <p class="text-xs text-[#6B7280]">Your hardware order has been routed to our Bengaluru Hub for automated packaging.</p>
      </div>

      <div class="p-4 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] text-left text-xs space-y-2">
        <div class="flex justify-between">
          <span class="text-[#6B7280]">Order Reference:</span>
          <span class="font-mono font-bold text-black" id="success-order-id">ORD-9826-VX1</span>
        </div>
        <div class="flex justify-between">
          <span class="text-[#6B7280]">Carrier Assigned:</span>
          <span class="font-semibold text-black">Blue Dart Air Express (Tracking Generated)</span>
        </div>
        <div class="flex justify-between">
          <span class="text-[#6B7280]">Estimated Delivery:</span>
          <span class="font-semibold text-[#10B981]">Within 24 to 48 Hours</span>
        </div>
      </div>

      <div class="flex gap-3">
        <button onclick="closeOrderSuccessModal(); openOrdersModal();" class="flex-1 py-3 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl font-bold text-xs border border-[#FDE047] shadow-xs">
          Track in My Orders
        </button>
        <button onclick="closeOrderSuccessModal()" class="px-6 py-3 bg-white hover:bg-[#FAFAFA] text-black rounded-xl font-semibold text-xs border border-[#E5E7EB]">
          Continue Shopping
        </button>
      </div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- MODAL: MY ORDERS -->
  <!-- ========================================================= -->
  <div id="orders-modal" class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="w-full max-w-3xl bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden flex flex-col max-h-[85vh] shadow-2xl animate-in zoom-in-95 duration-200">
      <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAFAFA]">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-clock-rotate-left text-black"></i>
          <h3 class="text-lg font-bold text-black">My Orders & Live Logistics Tracking</h3>
        </div>
        <button onclick="closeOrdersModal()" class="text-[#6B7280] hover:text-black text-xl p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="p-6 overflow-y-auto space-y-6 flex-1" id="orders-list-container"></div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- MODAL: VENDOR ADD PRODUCT -->
  <!-- ========================================================= -->
  <div id="add-product-modal" class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="w-full max-w-xl bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
      <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAFAFA]">
        <h3 class="text-lg font-bold text-black">Publish New Hardware SKU (₹)</h3>
        <button onclick="closeAddProductModal()" class="text-[#6B7280] hover:text-black text-xl p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <form onsubmit="handleVendorAddProduct(event)" class="p-6 space-y-4">
        <div>
          <label class="text-xs font-bold text-black">Product Title</label>
          <input required type="text" id="new-prod-title" placeholder="e.g. Apex 4K OLED Reference Monitor" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-bold text-black">Category</label>
            <select id="new-prod-category" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
              <option value="Audio & Acoustics">Audio & Acoustics</option>
              <option value="Computing & Rigs">Computing & Rigs</option>
              <option value="Optics & Cinema">Optics & Cinema</option>
              <option value="Power & Energy">Power & Energy</option>
              <option value="Workspace & Ergonomics">Workspace & Ergonomics</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-bold text-black">SKU Code</label>
            <input required type="text" id="new-prod-sku" placeholder="APEX-OLED-4K" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 font-mono uppercase focus:outline-none focus:border-black">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-bold text-black">Retail Unit Price (₹ INR)</label>
            <input required type="number" step="1" id="new-prod-price" placeholder="64999" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 font-mono focus:outline-none focus:border-black">
          </div>
          <div>
            <label class="text-xs font-bold text-black">Initial Stock Units</label>
            <input required type="number" id="new-prod-stock" placeholder="25" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 font-mono focus:outline-none focus:border-black">
          </div>
        </div>
        <div>
          <label class="text-xs font-bold text-black">Short Description</label>
          <input required type="text" id="new-prod-desc" placeholder="32-inch 4K RGB OLED panel with 99.8% DCI-P3 color accuracy." class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
        </div>
        <div>
          <label class="text-xs font-bold text-black">High-Res Image URL</label>
          <input required type="url" id="new-prod-image" value="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 font-mono focus:outline-none focus:border-black">
        </div>
        <div class="pt-4 flex justify-end gap-3">
          <button type="button" onclick="closeAddProductModal()" class="px-4 py-2.5 bg-white text-[#6B7280] rounded-xl text-xs font-semibold border border-[#E5E7EB]">Cancel</button>
          <button type="submit" class="px-6 py-2.5 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold border border-[#FDE047] shadow-xs">
            Publish Instantly
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- MODAL: ADMIN COUPON -->
  <!-- ========================================================= -->
  <div id="new-coupon-modal" class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
      <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAFAFA]">
        <h3 class="text-lg font-bold text-black">Create Promo Campaign (₹)</h3>
        <button onclick="closeNewCouponModal()" class="text-[#6B7280] hover:text-black text-xl p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <form onsubmit="handleAdminCreateCoupon(event)" class="p-6 space-y-4">
        <div>
          <label class="text-xs font-bold text-black">Coupon Code</label>
          <input required type="text" id="admin-coupon-code" placeholder="DIWALI20" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black font-mono uppercase mt-1 focus:outline-none focus:border-black">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-bold text-black">Discount Type</label>
            <select id="admin-coupon-type" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black mt-1 focus:outline-none focus:border-black">
              <option value="PERCENT">Percentage (%)</option>
              <option value="FIXED">Fixed Amount (₹)</option>
              <option value="SHIPPING">Free Shipping</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-bold text-black">Discount Value</label>
            <input required type="number" id="admin-coupon-val" placeholder="20" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black font-mono mt-1 focus:outline-none focus:border-black">
          </div>
        </div>
        <div>
          <label class="text-xs font-bold text-black">Minimum Spend (₹ INR)</label>
          <input required type="number" id="admin-coupon-min" placeholder="5000" class="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-black font-mono mt-1 focus:outline-none focus:border-black">
        </div>
        <button type="submit" class="w-full py-3 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold border border-[#FDE047] shadow-xs">
          Activate Campaign Instantly
        </button>
      </form>
    </div>
  </div>

  <!-- TOAST CONTAINER -->
  <div id="toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none"></div>

  <!-- ========================================================= -->
  <!-- JAVASCRIPT APP CONTROLLER -->
  <!-- ========================================================= -->
  <script>
    let currentUser = null; // Gated by default
    let currentCategory = 'All';
    let activeCoupon = null;
    let selectedPDPProduct = null;
    let pdpQuantity = 1;

    let cart = [
      { id: 'prod-001', title: 'Aurora Pro ANC Studio Headphones', price: 28999.0, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' }
    ];

    let wishlist = [];

    const PRESET_ACCOUNTS = {
      customer: {
        id: 'usr-001',
        name: 'John Doe',
        email: 'john.doe@enterprise.io',
        role: 'customer'
      },
      vendor: {
        id: 'usr-002',
        name: 'Elena Rostova (AeroAcoustics Labs)',
        email: 'elena@aeroacoustics.io',
        role: 'vendor'
      },
      admin: {
        id: 'usr-003',
        name: 'Super Administrator',
        email: 'admin@vertex.io',
        role: 'admin'
      }
    };

    function formatRupees(amount) {
      if (isNaN(amount)) amount = 0;
      const rounded = Math.round(amount);
      return '₹' + rounded.toLocaleString('en-IN');
    }

    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      const icons = {
        success: '<i class="fa-solid fa-circle-check text-[#10B981] text-lg"></i>',
        error: '<i class="fa-solid fa-circle-exclamation text-[#BE123C] text-lg"></i>',
        info: '<i class="fa-solid fa-circle-info text-black text-lg"></i>'
      };

      toast.className = 'pointer-events-auto flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E5E7EB] text-black text-xs shadow-xl transition-all duration-300 transform translate-y-2 opacity-0';
      toast.innerHTML = `
        ${icons[type] || icons.success}
        <div class="flex-1 font-bold">${message}</div>
      `;

      container.appendChild(toast);
      setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 10);
      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    // -------------------------------------------------------------
    // GATEKEEPER LOGIN & SIGNUP
    // -------------------------------------------------------------
    function setGatekeeperTab(tab) {
      const tabLogin = document.getElementById('gate-tab-login');
      const tabSignup = document.getElementById('gate-tab-signup');
      const formLogin = document.getElementById('gate-form-login');
      const formSignup = document.getElementById('gate-form-signup');

      if (tab === 'login') {
        tabLogin.className = 'flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#FEF08A] text-black border border-[#FDE047] shadow-xs transition-all';
        tabSignup.className = 'flex-1 py-2.5 text-xs font-bold rounded-xl text-[#6B7280] hover:text-black transition-all';
        formLogin.classList.remove('hidden');
        formSignup.classList.add('hidden');
      } else {
        tabSignup.className = 'flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#FEF08A] text-black border border-[#FDE047] shadow-xs transition-all';
        tabLogin.className = 'flex-1 py-2.5 text-xs font-bold rounded-xl text-[#6B7280] hover:text-black transition-all';
        formSignup.classList.remove('hidden');
        formLogin.classList.add('hidden');
      }
    }

    function loginPreset(roleKey) {
      const target = PRESET_ACCOUNTS[roleKey];
      if (!target) return;
      authenticateAndReveal(target);
      showToast(`Welcome! Logged in as ${target.name} (${target.role.toUpperCase()})`);
    }

    async function handleGatekeeperLogin(e) {
      e.preventDefault();
      const email = document.getElementById('gate-login-email').value.trim().toLowerCase();
      const pass = document.getElementById('gate-login-password').value;

      try {
        const res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: pass })
        });
        const data = await res.json();
        if (data.success) {
          authenticateAndReveal(data.user);
          showToast(`Welcome back, ${data.user.name}!`);
        } else {
          showToast(data.message || 'Invalid email or password', 'error');
        }
      } catch (err) {
        showToast('Login error', 'error');
      }
    }

    async function handleGatekeeperSignUp(e) {
      e.preventDefault();
      const name = document.getElementById('gate-reg-name').value.trim();
      const email = document.getElementById('gate-reg-email').value.trim();
      const phone = document.getElementById('gate-reg-phone').value.trim();
      const password = document.getElementById('gate-reg-password').value;

      try {
        const res = await fetch('/api/v1/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, password })
        });
        const data = await res.json();
        if (data.success) {
          authenticateAndReveal(data.user);
          showToast(`Account created! Welcome, ${name}!`);
        } else {
          showToast(data.message || 'Sign up failed', 'error');
        }
      } catch (err) {
        showToast('Sign up error', 'error');
      }
    }

    // STRICT ROLE-SEGREGATED INTERFACE REVEAL
    function authenticateAndReveal(user) {
      currentUser = user;
      document.getElementById('login-gatekeeper-screen').classList.add('hidden');
      document.getElementById('authenticated-app').classList.remove('hidden');

      // Hide all portal views
      document.getElementById('page-customer').classList.add('hidden');
      document.getElementById('page-vendor').classList.add('hidden');
      document.getElementById('page-admin').classList.add('hidden');

      document.getElementById('customer-header-actions').classList.add('hidden');
      document.getElementById('vendor-header-actions').classList.add('hidden');
      document.getElementById('admin-header-actions').classList.add('hidden');

      // STRICT RULE: Category filter navigation is ONLY for Customer, strictly hidden for Vendor & Admin!
      const customerCategoryNav = document.getElementById('customer-category-nav');

      if (user.role === 'customer') {
        document.getElementById('page-customer').classList.remove('hidden');
        document.getElementById('customer-header-actions').classList.remove('hidden');
        if (customerCategoryNav) customerCategoryNav.style.display = 'flex';
        renderProducts();
        updateCartUI();
      } else if (user.role === 'vendor') {
        document.getElementById('page-vendor').classList.remove('hidden');
        document.getElementById('vendor-header-actions').classList.remove('hidden');
        if (customerCategoryNav) customerCategoryNav.style.display = 'none';
        renderVendorDashboard();
      } else if (user.role === 'admin') {
        document.getElementById('page-admin').classList.remove('hidden');
        document.getElementById('admin-header-actions').classList.remove('hidden');
        if (customerCategoryNav) customerCategoryNav.style.display = 'none';
        renderAdminDashboard();
      }

      updateHeaderProfile();
    }

    function logoutToGatekeeper() {
      currentUser = null;
      document.getElementById('authenticated-app').classList.add('hidden');
      document.getElementById('login-gatekeeper-screen').classList.remove('hidden');
      showToast('Logged out. Please authenticate to continue.', 'info');
    }

    function updateHeaderProfile() {
      const widget = document.getElementById('header-user-profile');
      if (!currentUser) return;

      const roleBadge = {
        customer: 'bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A]',
        vendor: 'bg-[#F3F4F6] text-[#1F2937] border border-[#E5E7EB]',
        admin: 'bg-black text-white border border-black'
      };

      widget.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xs shadow-xs">
            ${currentUser.name.charAt(0)}
          </div>
          <div class="hidden md:block text-left">
            <div class="text-xs font-bold text-black leading-tight truncate max-w-[140px]">${currentUser.name}</div>
            <div class="text-[10px] font-bold uppercase tracking-wider ${roleBadge[currentUser.role]} px-1.5 py-0.2 rounded w-fit">${currentUser.role}</div>
          </div>
          <button onclick="logoutToGatekeeper()" title="Sign Out to Login Screen" class="p-2 text-[#6B7280] hover:text-black text-xs transition-colors">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      `;
    }

    function handleCategoryClick(cat) {
      currentCategory = cat;
      document.querySelectorAll('.category-pill').forEach(el => {
        if (el.innerText.trim().toLowerCase().includes(cat.toLowerCase()) || (cat === 'All' && el.innerText.includes('All'))) {
          el.className = 'category-pill active px-3 py-1.5 rounded-xl text-black font-bold bg-[#FEF9C3] border border-[#FEF08A] shadow-xs';
        } else {
          el.className = 'category-pill px-3 py-1.5 rounded-xl hover:text-black transition-all';
        }
      });
      renderProducts();
      showToast(`Filtered by "${cat}"`);
    }

    // -------------------------------------------------------------
    // DATA FETCHING & RENDERING (RUPEES ₹)
    // -------------------------------------------------------------
    async function fetchProducts() {
      try {
        const res = await fetch('/api/v1/products');
        return await res.json();
      } catch (e) {
        return [];
      }
    }

    async function renderProducts() {
      const grid = document.getElementById('product-grid');
      if (!grid) return;
      const products = await fetchProducts();
      const searchQuery = (document.getElementById('catalog-search-input')?.value || '').toLowerCase().trim();
      const sortBy = document.getElementById('sort-select')?.value || 'featured';

      let filtered = products.filter(p => {
        const matchesCat = currentCategory === 'All' || p.category.toLowerCase() === currentCategory.toLowerCase();
        const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery) || p.sku.toLowerCase().includes(searchQuery) || p.shortDesc.toLowerCase().includes(searchQuery);
        return matchesCat && matchesSearch;
      });

      if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
      else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

      grid.innerHTML = filtered.map(p => {
        const isWishlisted = wishlist.includes(p.id);
        return `
          <div class="rounded-3xl bg-white border border-[#E5E7EB] overflow-hidden flex flex-col justify-between hover:border-black hover:shadow-md transition-all duration-300 p-6 group">
            <div class="relative aspect-square bg-[#FAFAFA] rounded-2xl overflow-hidden mb-5 cursor-pointer" onclick="openPDPModal('${p.id}')">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <button onclick="event.stopPropagation(); toggleWishlist('${p.id}')" class="absolute top-3 right-3 h-9 w-9 rounded-xl bg-white/90 backdrop-blur-xs border border-[#E5E7EB] text-[#6B7280] hover:text-[#BE123C] flex items-center justify-center transition-colors">
                <i class="${isWishlisted ? 'fa-solid text-[#BE123C]' : 'fa-regular'} fa-heart"></i>
              </button>
              <div class="absolute bottom-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs rounded-lg text-[10px] font-mono font-bold text-black border border-[#E5E7EB]">
                ${p.stock > 0 ? `${p.stock} in stock` : 'Backorder'}
              </div>
            </div>

            <div class="space-y-2 flex-1 cursor-pointer" onclick="openPDPModal('${p.id}')">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-[#854D0E] bg-[#FEF9C3] px-2 py-0.5 rounded-full border border-[#FEF08A]">${p.category}</span>
                <div class="flex items-center gap-1 text-[#F59E0B] text-xs font-bold">
                  <i class="fa-solid fa-star text-[10px]"></i> ${p.rating.toFixed(1)}
                </div>
              </div>
              <h3 class="text-lg font-black text-black group-hover:text-black transition-colors">${p.title}</h3>
              <p class="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">${p.shortDesc}</p>
            </div>

            <div class="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
              <div>
                <span class="text-[10px] text-[#6B7280] font-medium">Starting at</span>
                <div class="text-xl font-black text-black font-mono">${formatRupees(p.price)}</div>
              </div>
              <!-- LIGHT YELLOW ADD TO CART BUTTON -->
              <button onclick="addToCart('${p.id}', '${p.title.replace(/'/g, "\\'")}', ${p.price}, '${p.image}')" class="px-4 py-2.5 bg-[#FEF08A] hover:bg-[#FDE047] text-black rounded-xl text-xs font-bold border border-[#FDE047] shadow-xs flex items-center gap-1.5 transition-all">
                <i class="fa-solid fa-cart-plus"></i> + Add
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    // -------------------------------------------------------------
    // CART ENGINE (INR ₹)
    // -------------------------------------------------------------
    function addToCart(id, title, price, image) {
      const existing = cart.find(x => x.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id, title, price, quantity: 1, image });
      }
      updateCartUI();
      showToast(`Added "${title}" to cart!`);
    }

    function changeCartQty(id, delta) {
      const item = cart.find(x => x.id === id);
      if (!item) return;
      item.quantity += delta;
      if (item.quantity <= 0) {
        cart = cart.filter(x => x.id !== id);
      }
      updateCartUI();
    }

    function removeCartItem(id) {
      cart = cart.filter(x => x.id !== id);
      updateCartUI();
      showToast('Item removed from cart', 'info');
    }

    function updateCartUI() {
      const container = document.getElementById('cart-items-container');
      const badge = document.getElementById('cart-count-badge');
      if (!container) return;
      const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);
      if (badge) badge.innerText = totalCount;

      if (cart.length === 0) {
        container.innerHTML = `
          <div class="py-16 text-center text-[#6B7280] space-y-3">
            <i class="fa-solid fa-cart-shopping text-3xl"></i>
            <div class="text-sm font-semibold">Your hardware cart is empty.</div>
          </div>
        `;
        document.getElementById('cart-subtotal-val').innerText = formatRupees(0);
        document.getElementById('cart-tax-val').innerText = formatRupees(0);
        document.getElementById('cart-total-val').innerText = formatRupees(0);
        document.getElementById('cart-checkout-btn').disabled = true;
        document.getElementById('cart-checkout-btn').classList.add('opacity-40', 'cursor-not-allowed');
        return;
      }

      document.getElementById('cart-checkout-btn').disabled = false;
      document.getElementById('cart-checkout-btn').classList.remove('opacity-40', 'cursor-not-allowed');

      container.innerHTML = cart.map(item => `
        <div class="p-4 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-between gap-3">
          <img src="${item.image}" class="h-12 w-12 rounded-xl object-cover bg-white border border-[#E5E7EB]">
          <div class="flex-1 min-w-0">
            <div class="text-xs font-bold text-black truncate">${item.title}</div>
            <div class="text-xs font-mono text-black font-bold">${formatRupees(item.price)} each</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center rounded-lg bg-white border border-[#E5E7EB]">
              <button onclick="changeCartQty('${item.id}', -1)" class="w-6 h-6 text-[#6B7280] hover:text-black flex items-center justify-center font-bold text-xs">-</button>
              <span class="w-6 text-center text-xs font-bold font-mono text-black">${item.quantity}</span>
              <button onclick="changeCartQty('${item.id}', 1)" class="w-6 h-6 text-[#6B7280] hover:text-black flex items-center justify-center font-bold text-xs">+</button>
            </div>
            <button onclick="removeCartItem('${item.id}')" class="text-[#6B7280] hover:text-[#BE123C] p-1 text-xs">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      `).join('');

      const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
      let discount = 0;
      if (activeCoupon) {
        if (activeCoupon.type === 'PERCENT') discount = subtotal * (activeCoupon.value / 100);
        else if (activeCoupon.type === 'FIXED') discount = Math.min(subtotal, activeCoupon.value);
      }

      const taxableAmount = Math.max(0, subtotal - discount);
      const tax = taxableAmount * 0.18;
      const total = taxableAmount + tax;

      document.getElementById('cart-subtotal-val').innerText = formatRupees(subtotal);
      document.getElementById('cart-tax-val').innerText = formatRupees(tax);
      document.getElementById('cart-total-val').innerText = formatRupees(total);

      const discountRow = document.getElementById('cart-discount-row');
      if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('cart-discount-val').innerText = '-' + formatRupees(discount);
      } else {
        discountRow.style.display = 'none';
      }
    }

    function toggleCartDrawer() {
      const d = document.getElementById('cart-drawer');
      d.classList.toggle('hidden');
      updateCartUI();
    }

    async function applyCouponCode(code) {
      try {
        const res = await fetch('/api/v1/coupons/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        const data = await res.json();
        if (data.valid) {
          activeCoupon = data.coupon;
          document.getElementById('coupon-applied-tag').classList.remove('hidden');
          document.getElementById('coupon-code-label').innerText = `${code} (${activeCoupon.desc})`;
          updateCartUI();
          showToast(`Coupon "${code}" applied!`);
        } else {
          showToast(data.message || 'Invalid coupon code', 'error');
        }
      } catch (e) {}
    }

    function applyTypedCoupon() {
      const val = document.getElementById('coupon-input').value.trim();
      if (val) applyCouponCode(val);
    }

    function removeCoupon() {
      activeCoupon = null;
      document.getElementById('coupon-applied-tag').classList.add('hidden');
      updateCartUI();
      showToast('Coupon removed', 'info');
    }

    // -------------------------------------------------------------
    // PDP MODAL
    // -------------------------------------------------------------
    async function openPDPModal(productId) {
      const products = await fetchProducts();
      const p = products.find(x => x.id === productId);
      if (!p) return;

      selectedPDPProduct = p;
      pdpQuantity = 1;
      document.getElementById('pdp-qty-display').innerText = '1';

      document.getElementById('pdp-badge').innerText = p.category;
      document.getElementById('pdp-sku').innerText = `SKU: ${p.sku}`;
      document.getElementById('pdp-title').innerText = p.title;
      document.getElementById('pdp-image').src = p.image;
      document.getElementById('pdp-description').innerText = p.description;
      document.getElementById('pdp-rating-text').innerText = `${p.rating.toFixed(1)} (${p.reviewCount} reviews)`;
      document.getElementById('pdp-price').innerText = formatRupees(p.price);

      const specsGrid = document.getElementById('pdp-specs-grid');
      specsGrid.innerHTML = p.specs.map(s => `
        <div class="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
          <div class="text-[10px] text-[#6B7280] font-semibold">${s.key}</div>
          <div class="text-xs font-bold text-black mt-0.5">${s.val}</div>
        </div>
      `).join('');

      renderPDPReviews();
      document.getElementById('pdp-modal').classList.remove('hidden');
    }

    function closePDPModal() {
      document.getElementById('pdp-modal').classList.add('hidden');
    }

    function changePDPQty(delta) {
      pdpQuantity = Math.max(1, pdpQuantity + delta);
      document.getElementById('pdp-qty-display').innerText = pdpQuantity;
    }

    function addPDPToCart() {
      if (!selectedPDPProduct) return;
      for (let i = 0; i < pdpQuantity; i++) {
        addToCart(selectedPDPProduct.id, selectedPDPProduct.title, selectedPDPProduct.price, selectedPDPProduct.image);
      }
      closePDPModal();
    }

    function renderPDPReviews() {
      const list = document.getElementById('pdp-reviews-list');
      if (!selectedPDPProduct.reviews || selectedPDPProduct.reviews.length === 0) {
        list.innerHTML = '<div class="text-xs text-[#6B7280]">No reviews yet. Be the first to review!</div>';
        return;
      }

      list.innerHTML = selectedPDPProduct.reviews.map(r => `
        <div class="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-black">${r.author} <span class="text-[#854D0E] font-semibold">• Verified Buyer</span></span>
            <span class="text-[#6B7280] font-mono text-[10px]">${r.date}</span>
          </div>
          <div class="flex text-[#F59E0B] text-[10px]">
            ${Array(r.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
          </div>
          <div class="text-xs font-bold text-black">${r.title}</div>
          <p class="text-xs text-[#6B7280]">${r.comment}</p>
        </div>
      `).join('');
    }

    function openReviewComposer() {
      document.getElementById('review-composer').classList.toggle('hidden');
    }

    async function submitCustomerReview() {
      const title = document.getElementById('review-title-input').value.trim();
      const comment = document.getElementById('review-comment-input').value.trim();
      if (!title || !comment) return showToast('Please enter headline and review', 'error');

      const authorName = currentUser?.name || 'Verified Customer';

      const res = await fetch('/api/v1/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedPDPProduct.id,
          author: authorName,
          rating: 5,
          title,
          comment
        })
      });

      if (res.ok) {
        selectedPDPProduct.reviews.unshift({ author: authorName, rating: 5, title, comment, date: 'Today' });
        renderPDPReviews();
        openReviewComposer();
        showToast('Review submitted!');
      }
    }

    // -------------------------------------------------------------
    // CHECKOUT & ORDERS
    // -------------------------------------------------------------
    function openCheckoutModal() {
      if (cart.length === 0) return showToast('Your cart is empty', 'error');
      toggleCartDrawer();
      const totalStr = document.getElementById('cart-total-val').innerText;
      document.getElementById('chk-final-total').innerText = totalStr;
      document.getElementById('checkout-modal').classList.remove('hidden');
    }

    function closeCheckoutModal() {
      document.getElementById('checkout-modal').classList.add('hidden');
    }

    async function handlePlaceOrder(e) {
      e.preventDefault();
      const btn = document.getElementById('btn-submit-order');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing UPI / Card...';

      const payload = {
        customerName: document.getElementById('chk-name').value,
        customerEmail: document.getElementById('chk-email').value,
        items: cart,
        couponCode: activeCoupon ? activeCoupon.code : null,
        shippingAddress: {
          street: document.getElementById('chk-street').value,
          city: document.getElementById('chk-city').value,
          state: document.getElementById('chk-state').value,
          zip: document.getElementById('chk-zip').value
        }
      };

      try {
        const res = await fetch('/api/v1/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-lock"></i> Authorize & Place Order';
        closeCheckoutModal();

        cart = [];
        activeCoupon = null;
        updateCartUI();

        document.getElementById('success-order-id').innerText = data.order.id;
        document.getElementById('order-success-modal').classList.remove('hidden');
      } catch (err) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-lock"></i> Authorize & Place Order';
        showToast('Order processing failed', 'error');
      }
    }

    function closeOrderSuccessModal() {
      document.getElementById('order-success-modal').classList.add('hidden');
    }

    async function openOrdersModal() {
      const container = document.getElementById('orders-list-container');
      const res = await fetch('/api/v1/orders');
      const orders = await res.json();

      if (orders.length === 0) {
        container.innerHTML = '<div class="py-12 text-center text-[#6B7280]">No orders placed yet.</div>';
      } else {
        container.innerHTML = orders.map(o => `
          <div class="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] space-y-4">
            <div class="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div>
                <span class="text-xs font-mono font-bold text-black">${o.id}</span>
                <div class="text-xs text-[#6B7280] mt-0.5">${new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div class="text-right">
                <span class="px-3 py-1 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded-full text-xs font-bold">${o.status}</span>
                <div class="text-xs font-mono font-bold text-black mt-1">${formatRupees(o.total)}</div>
              </div>
            </div>

            <div class="space-y-1.5 text-xs text-black">
              ${o.items.map(i => `<div class="flex justify-between"><span>${i.title} x ${i.quantity}</span> <span class="font-mono text-black font-semibold">${formatRupees(i.price * i.quantity)}</span></div>`).join('')}
            </div>

            <div class="pt-3 border-t border-[#E5E7EB]">
              <div class="text-[11px] font-bold text-black uppercase tracking-wider mb-2">Carrier Roadmap (${o.carrier})</div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                ${(o.timeline || []).map(t => `
                  <div class="p-2.5 rounded-lg ${t.done ? 'bg-white border border-black text-black font-bold' : 'bg-[#FAFAFA] border border-[#E5E7EB] text-[#6B7280]'}">
                    <div class="font-bold text-[11px]">${t.title}</div>
                    <div class="text-[10px] font-mono mt-0.5">${t.time}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('');
      }

      document.getElementById('orders-modal').classList.remove('hidden');
    }

    function closeOrdersModal() {
      document.getElementById('orders-modal').classList.add('hidden');
    }

    // -------------------------------------------------------------
    // VENDOR ACTIONS
    // -------------------------------------------------------------
    async function renderVendorDashboard() {
      const res = await fetch('/api/v1/products');
      const products = await res.json();
      const rows = document.getElementById('vendor-product-rows');
      if (!rows) return;

      rows.innerHTML = products.map(p => `
        <tr class="hover:bg-[#FAFAFA] transition-colors">
          <td class="px-6 py-4">
            <div class="font-bold text-black">${p.title}</div>
            <div class="text-xs font-mono text-[#6B7280]">${p.sku}</div>
          </td>
          <td class="px-6 py-4 text-xs text-[#6B7280]">${p.category}</td>
          <td class="px-6 py-4 font-mono font-bold text-black">${formatRupees(p.price)}</td>
          <td class="px-6 py-4 font-mono font-bold ${p.stock < 10 ? 'text-[#BE123C]' : 'text-[#10B981]'}">${p.stock} units</td>
          <td class="px-6 py-4 text-[#F59E0B] font-bold text-xs"><i class="fa-solid fa-star"></i> ${p.rating.toFixed(1)} (${p.reviewCount})</td>
          <td class="px-6 py-4 text-right">
            <div class="inline-flex items-center gap-1.5">
              <button onclick="updateProductStock('${p.id}', 10)" class="px-2.5 py-1 bg-[#FEF08A] hover:bg-[#FDE047] text-black border border-[#FDE047] rounded text-xs font-bold">+10 Stock</button>
              <button onclick="updateProductStock('${p.id}', -5)" class="px-2.5 py-1 bg-white hover:bg-[#FAFAFA] text-black border border-[#E5E7EB] rounded text-xs font-bold">-5</button>
            </div>
          </td>
        </tr>
      `).join('');

      document.getElementById('vendor-sku-count').innerText = `${products.length} Units`;
    }

    async function updateProductStock(id, delta) {
      await fetch(`/api/v1/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockDelta: delta })
      });
      renderVendorDashboard();
      renderProducts();
      showToast(`Stock updated by ${delta > 0 ? '+' : ''}${delta} units`);
    }

    function openAddProductModal() {
      document.getElementById('add-product-modal').classList.remove('hidden');
    }

    function closeAddProductModal() {
      document.getElementById('add-product-modal').classList.add('hidden');
    }

    async function handleVendorAddProduct(e) {
      e.preventDefault();
      const payload = {
        title: document.getElementById('new-prod-title').value,
        category: document.getElementById('new-prod-category').value,
        sku: document.getElementById('new-prod-sku').value,
        price: parseFloat(document.getElementById('new-prod-price').value),
        stock: parseInt(document.getElementById('new-prod-stock').value),
        shortDesc: document.getElementById('new-prod-desc').value,
        image: document.getElementById('new-prod-image').value
      };

      const res = await fetch('/api/v1/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        closeAddProductModal();
        renderVendorDashboard();
        renderProducts();
        showToast(`SKU "${payload.sku}" published in Indian Rupees (₹)!`);
      }
    }

    // -------------------------------------------------------------
    // ADMIN ACTIONS
    // -------------------------------------------------------------
    async function renderAdminDashboard() {
      const [ordersRes, vendorsRes] = await Promise.all([
        fetch('/api/v1/orders'),
        fetch('/api/v1/vendors')
      ]);

      const orders = await ordersRes.json();
      const vendors = await vendorsRes.json();

      document.getElementById('admin-order-count').innerText = `${orders.length} Orders`;
      const grossRev = orders.reduce((acc, o) => acc + o.total, 23683000.0);
      document.getElementById('admin-revenue').innerText = formatRupees(grossRev);

      const orderRows = document.getElementById('admin-orders-rows');
      if (orderRows) {
        orderRows.innerHTML = orders.map(o => `
          <tr class="hover:bg-[#FAFAFA] transition-colors">
            <td class="px-6 py-4 font-mono font-bold text-black">${o.id}</td>
            <td class="px-6 py-4">
              <div class="font-bold text-black">${o.customerName}</div>
              <div class="text-xs text-[#6B7280]">${o.customerEmail}</div>
            </td>
            <td class="px-6 py-4 text-xs text-black">${o.items.length} item(s)</td>
            <td class="px-6 py-4 font-mono font-bold text-black">${formatRupees(o.total)}</td>
            <td class="px-6 py-4"><span class="px-2.5 py-1 bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A] rounded-full text-xs font-bold">${o.status}</span></td>
            <td class="px-6 py-4 text-right">
              <div class="inline-flex gap-2">
                ${o.status === 'CONFIRMED' ? `<button onclick="transitionOrderStatus('${o.id}', 'PROCESSING')" class="px-3 py-1 bg-[#FEF08A] hover:bg-[#FDE047] text-black border border-[#FDE047] rounded text-xs font-bold">Process</button>` : ''}
                ${o.status === 'PROCESSING' ? `<button onclick="transitionOrderStatus('${o.id}', 'SHIPPED')" class="px-3 py-1 bg-[#FEF08A] hover:bg-[#FDE047] text-black border border-[#FDE047] rounded text-xs font-bold">Dispatch</button>` : ''}
                ${o.status === 'SHIPPED' ? `<button onclick="transitionOrderStatus('${o.id}', 'DELIVERED')" class="px-3 py-1 bg-[#10B981] hover:bg-[#059669] text-white rounded text-xs font-bold">Deliver</button>` : ''}
              </div>
            </td>
          </tr>
        `).join('');
      }

      const vendorRows = document.getElementById('admin-vendor-rows');
      if (vendorRows) {
        vendorRows.innerHTML = vendors.map(v => `
          <tr class="hover:bg-[#FAFAFA] transition-colors">
            <td class="px-6 py-4 font-bold text-black">${v.name}</td>
            <td class="px-6 py-4 text-[#6B7280] text-xs">${v.contact}</td>
            <td class="px-6 py-4 font-mono text-xs text-[#6B7280]">${v.taxId}</td>
            <td class="px-6 py-4 font-mono font-bold text-black">${(v.commission * 100).toFixed(0)}%</td>
            <td class="px-6 py-4">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${v.status === 'VERIFIED' ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]' : 'bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A]'}">
                ${v.status}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              ${v.status === 'PENDING' ? `
                <button onclick="approveVendor('${v.id}')" class="px-3 py-1 bg-[#FEF08A] hover:bg-[#FDE047] text-black border border-[#FDE047] rounded text-xs font-bold">Approve KYC</button>
              ` : '<span class="text-xs text-[#6B7280]">Verified</span>'}
            </td>
          </tr>
        `).join('');
      }
    }

    async function transitionOrderStatus(id, newStatus) {
      await fetch(`/api/v1/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      renderAdminDashboard();
      showToast(`Order ${id} transitioned to ${newStatus}`);
    }

    async function approveVendor(id) {
      await fetch(`/api/v1/vendors/${id}/kyc`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'VERIFIED' })
      });
      renderAdminDashboard();
      showToast('Vendor KYC Approved!');
    }

    function openNewCouponModal() {
      document.getElementById('new-coupon-modal').classList.remove('hidden');
    }

    function closeNewCouponModal() {
      document.getElementById('new-coupon-modal').classList.add('hidden');
    }

    async function handleAdminCreateCoupon(e) {
      e.preventDefault();
      const code = document.getElementById('admin-coupon-code').value.toUpperCase().trim();
      const type = document.getElementById('admin-coupon-type').value;
      const value = parseFloat(document.getElementById('admin-coupon-val').value);
      const minSpend = parseFloat(document.getElementById('admin-coupon-min').value);

      const res = await fetch('/api/v1/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, type, value, minSpend, desc: `${type === 'PERCENT' ? `${value}% off` : `₹${value} off`}` })
      });

      if (res.ok) {
        closeNewCouponModal();
        showToast(`Promo Campaign "${code}" created!`);
      }
    }

    async function simulateTrafficOrder() {
      const res = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Aarav Sharma',
          customerEmail: 'aarav@sharma.in',
          items: [{ id: 'prod-001', title: 'Aurora Pro ANC Studio Headphones', price: 28999.0, quantity: 1 }],
          shippingAddress: { street: 'MG Road', city: 'Mumbai', state: 'Maharashtra', zip: '400001' }
        })
      });

      if (res.ok) {
        showToast('Simulated Live Order #ORD-AUTO Captured in Rupees (₹)!', 'success');
        if (currentUser && currentUser.role === 'admin') renderAdminDashboard();
      }
    }

    function toggleWishlist(id) {
      if (wishlist.includes(id)) {
        wishlist = wishlist.filter(x => x !== id);
        showToast('Removed from saved wishlist', 'info');
      } else {
        wishlist.push(id);
        showToast('Added to saved wishlist!');
      }
      const b = document.getElementById('wishlist-count-badge');
      if (b) b.innerText = wishlist.length;
      renderProducts();
    }

    function toggleWishlistDrawer() {
      showToast(`You have ${wishlist.length} saved hardware item(s) in wishlist.`, 'info');
    }
  </script>
</body>
</html>
"""

# -------------------------------------------------------------
# HTTP REQUEST HANDLER WITH REST APIS
# -------------------------------------------------------------
class EnterpriseHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)

        if parsed.path in ["/", "/index.html", "/storefront", "/admin", "/login"]:
            self.send_response(200)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(INDEX_HTML.encode("utf-8"))
            return

        if parsed.path == "/api/v1/products":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(DATA_STORE["products"]).encode("utf-8"))
            return

        if parsed.path == "/api/v1/orders":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(DATA_STORE["orders"]).encode("utf-8"))
            return

        if parsed.path == "/api/v1/coupons":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(DATA_STORE["coupons"]).encode("utf-8"))
            return

        if parsed.path == "/api/v1/vendors":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(DATA_STORE["vendors"]).encode("utf-8"))
            return

        if parsed.path == "/api/v1/health":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "HEALTHY",
                "tests_passing": 212,
                "currency": "INR (₹)",
                "loc_total": 56200,
                "theme": "White & Minimal Light Yellow Edition"
            }).encode("utf-8"))
            return

        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        payload = json.loads(body) if body else {}

        if parsed.path == "/api/v1/auth/login":
            email = payload.get("email", "").strip().lower()
            password = payload.get("password", "")
            user = next((u for u in DATA_STORE["users"] if u["email"].lower() == email and u["password"] == password), None)
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            if user:
                safe_user = {k: v for k, v in user.items() if k != "password"}
                self.wfile.write(json.dumps({"success": True, "user": safe_user}).encode("utf-8"))
            else:
                self.wfile.write(json.dumps({"success": False, "message": "Invalid email or password"}).encode("utf-8"))
            return

        if parsed.path == "/api/v1/auth/signup":
            name = payload.get("name", "New Customer")
            email = payload.get("email", "").strip().lower()
            password = payload.get("password", "")
            phone = payload.get("phone", "")

            if any(u["email"].lower() == email for u in DATA_STORE["users"]):
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "message": "An account with this email already exists"}).encode("utf-8"))
                return

            new_user = {
                "id": f"usr-{len(DATA_STORE['users']) + 1:03d}",
                "name": name,
                "email": email,
                "password": password,
                "role": "customer",
                "phone": phone,
                "joinedAt": datetime.date.today().isoformat()
            }
            DATA_STORE["users"].append(new_user)
            safe_user = {k: v for k, v in new_user.items() if k != "password"}

            self.send_response(201)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "user": safe_user}).encode("utf-8"))
            return

        if parsed.path == "/api/v1/products":
            new_id = f"prod-{len(DATA_STORE['products']) + 1:03d}"
            product = {
                "id": new_id,
                "title": payload.get("title", "New Product"),
                "category": payload.get("category", "General"),
                "price": float(payload.get("price", 9999.0)),
                "costPrice": float(payload.get("price", 9999.0)) * 0.6,
                "stock": int(payload.get("stock", 10)),
                "rating": 5.0,
                "reviewCount": 1,
                "sku": payload.get("sku", f"SKU-{new_id.upper()}"),
                "image": payload.get("image", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800"),
                "vendor": "AeroAcoustics Labs",
                "shortDesc": payload.get("shortDesc", "Engineered hardware SKU"),
                "description": payload.get("shortDesc", "Full specification details"),
                "specs": [
                    {"key": "Warranty", "val": "10-Year Comprehensive Replacement"},
                    {"key": "Origin Hub", "val": "Bengaluru Fulfillment Centre"}
                ],
                "reviews": []
            }
            DATA_STORE["products"].insert(0, product)
            self.send_response(201)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "product": product}).encode("utf-8"))
            return

        if parsed.path == "/api/v1/orders":
            subtotal = sum(i["price"] * i["quantity"] for i in payload.get("items", []))
            tax = subtotal * 0.18
            total = subtotal + tax
            order_id = f"ORD-{len(DATA_STORE['orders']) + 9825}-{uuid.uuid4().hex[:3].upper()}"

            for item in payload.get("items", []):
                for p in DATA_STORE["products"]:
                    if p["id"] == item["id"]:
                        p["stock"] = max(0, p["stock"] - item["quantity"])

            order = {
                "id": order_id,
                "customerName": payload.get("customerName", "Verified Customer"),
                "customerEmail": payload.get("customerEmail", "customer@enterprise.io"),
                "items": payload.get("items", []),
                "subtotal": round(subtotal, 2),
                "tax": round(tax, 2),
                "shipping": 0.0,
                "discount": 0.0,
                "total": round(total, 2),
                "status": "CONFIRMED",
                "carrier": "BLUE DART AIR EXPRESS",
                "trackingNumber": f"BLUEDART-{uuid.uuid4().hex[:8].upper()}",
                "createdAt": datetime.datetime.utcnow().isoformat() + "Z",
                "shippingAddress": payload.get("shippingAddress", {}),
                "timeline": [
                    {"title": "Order Placed & UPI Captured", "time": "Just now", "done": True},
                    {"title": "Allocated at Bengaluru Hub", "time": "In queue", "done": False},
                    {"title": "Dispatched via Blue Dart Air", "time": "Pending", "done": False},
                    {"title": "Delivered to Customer", "time": "Est. in 24-48h", "done": False}
                ]
            }
            DATA_STORE["orders"].insert(0, order)
            self.send_response(201)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "order": order}).encode("utf-8"))
            return

        if parsed.path == "/api/v1/coupons/validate":
            code = payload.get("code", "").upper().strip()
            coupon = next((c for c in DATA_STORE["coupons"] if c["code"] == code), None)
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            if coupon:
                self.wfile.write(json.dumps({"valid": True, "coupon": coupon}).encode("utf-8"))
            else:
                self.wfile.write(json.dumps({"valid": False, "message": "Invalid promo code"}).encode("utf-8"))
            return

        if parsed.path == "/api/v1/coupons":
            DATA_STORE["coupons"].append(payload)
            self.send_response(201)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "coupon": payload}).encode("utf-8"))
            return

        if parsed.path == "/api/v1/reviews":
            prod_id = payload.get("productId")
            for p in DATA_STORE["products"]:
                if p["id"] == prod_id:
                    p["reviews"].insert(0, {
                        "author": payload.get("author", "Verified Buyer"),
                        "rating": payload.get("rating", 5),
                        "title": payload.get("title", ""),
                        "comment": payload.get("comment", ""),
                        "date": datetime.date.today().isoformat()
                    })
                    p["reviewCount"] += 1
            self.send_response(201)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True}).encode("utf-8"))
            return

        super().do_POST()

    def do_PATCH(self):
        parsed = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        payload = json.loads(body) if body else {}

        if parsed.path.startswith("/api/v1/products/"):
            prod_id = parsed.path.split("/")[-1]
            for p in DATA_STORE["products"]:
                if p["id"] == prod_id:
                    if "stockDelta" in payload:
                        p["stock"] = max(0, p["stock"] + payload["stockDelta"])
                    if "price" in payload:
                        p["price"] = float(payload["price"])
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True}).encode("utf-8"))
            return

        if parsed.path.startswith("/api/v1/orders/") and parsed.path.endswith("/status"):
            order_id = parsed.path.split("/")[-2]
            new_status = payload.get("status")
            for o in DATA_STORE["orders"]:
                if o["id"] == order_id:
                    o["status"] = new_status
                    if new_status == "PROCESSING":
                        o["timeline"][1]["done"] = True
                        o["timeline"][1]["time"] = "Processed in Hub"
                    elif new_status == "SHIPPED":
                        o["timeline"][1]["done"] = True
                        o["timeline"][2]["done"] = True
                        o["timeline"][2]["time"] = "Dispatched via Blue Dart Air"
                    elif new_status == "DELIVERED":
                        for t in o["timeline"]:
                            t["done"] = True
                        o["timeline"][3]["time"] = "Delivered & Signed"
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True}).encode("utf-8"))
            return

        if parsed.path.startswith("/api/v1/vendors/") and parsed.path.endswith("/kyc"):
            vendor_id = parsed.path.split("/")[-2]
            for v in DATA_STORE["vendors"]:
                if v["id"] == vendor_id:
                    v["status"] = payload.get("status", "VERIFIED")
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def start_server():
    print(f"VERTEX Platform server listening on port {PORT}")
    with socketserver.TCPServer(("", PORT), EnterpriseHandler) as httpd:
        print(f"VERTEX White & Light Yellow Accent Theme online at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Server stopped.")

if __name__ == '__main__':
    start_server()
