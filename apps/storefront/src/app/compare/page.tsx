import React from 'react';
import { Check, X, Shield, ArrowRight } from 'lucide-react';

export default function ComparePage() {
  const models = [
    { title: 'Aurora Pro ANC', category: 'Audio', price: '$349.99', driver: '40mm Beryllium', battery: '40 Hours', anc: '45dB Hybrid', weight: '260g', warranty: '10 Years' },
    { title: 'Aurora Studio Reference', category: 'Audio', price: '$499.00', driver: '50mm Planar Magnetic', battery: '50 Hours', anc: '50dB AI Adaptive', weight: '280g', warranty: '12 Years' },
    { title: 'Aurora Stage In-Ear', category: 'Audio', price: '$279.00', driver: 'Dual Balanced Armature', battery: '12 Hours (36h case)', anc: 'Passive 32dB', weight: '45g', warranty: '5 Years' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-white mb-2">Hardware Specification Matrix</h1>
      <p className="text-sm text-slate-400 mb-12">Side-by-side engineering comparison across audio transducers and thermal metrics.</p>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-300">
            <tr>
              <th className="px-6 py-4">Technical Spec</th>
              {models.map((m, i) => (
                <th key={i} className="px-6 py-4 font-bold text-white text-base">
                  <div>{m.title}</div>
                  <div className="text-blue-400 font-extrabold text-lg mt-1">{m.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            <tr>
              <td className="px-6 py-4 font-semibold text-slate-400">Transducer Architecture</td>
              {models.map((m, i) => <td key={i} className="px-6 py-4">{m.driver}</td>)}
            </tr>
            <tr>
              <td className="px-6 py-4 font-semibold text-slate-400">Continuous Battery Life</td>
              {models.map((m, i) => <td key={i} className="px-6 py-4 font-bold text-slate-100">{m.battery}</td>)}
            </tr>
            <tr>
              <td className="px-6 py-4 font-semibold text-slate-400">Active Noise Attenuation</td>
              {models.map((m, i) => <td key={i} className="px-6 py-4 text-emerald-400 font-semibold">{m.anc}</td>)}
            </tr>
            <tr>
              <td className="px-6 py-4 font-semibold text-slate-400">Chassis Weight</td>
              {models.map((m, i) => <td key={i} className="px-6 py-4 font-mono">{m.weight}</td>)}
            </tr>
            <tr>
              <td className="px-6 py-4 font-semibold text-slate-400">Manufacturer Warranty</td>
              {models.map((m, i) => <td key={i} className="px-6 py-4 text-blue-400 font-bold">{m.warranty}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
