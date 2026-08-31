import React, { useState } from 'react';
import { Star, ThumbsUp, ShieldCheck, MessageSquare } from 'lucide-react';
import { ReviewItemDto } from '@enterprise/types';

export interface CustomerReviewSectionProps {
  productId: string;
  reviews: ReviewItemDto[];
  ratingAverage: number;
  totalReviewCount: number;
}

export function CustomerReviewSection({ productId, reviews, ratingAverage, totalReviewCount }: CustomerReviewSectionProps) {
  const [reviewList, setReviewList] = useState(reviews);

  return (
    <div className="space-y-8 pt-12 border-t border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Verified Customer Reviews</h2>
          <p className="text-xs text-slate-400 mt-1">Real reviews from confirmed hardware buyers</p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white">{ratingAverage.toFixed(1)}</span>
          <span className="text-xs text-slate-500">out of 5.0 ({totalReviewCount} reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviewList.map(rev => (
          <div key={rev.id} className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="font-bold text-slate-100 text-sm">{rev.authorName}</div>
                {rev.isVerified && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-mono">{new Date(rev.createdAt).toLocaleDateString()}</div>
            </div>

            <div className="flex text-amber-400 text-xs">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            <h4 className="text-sm font-bold text-slate-200">{rev.title}</h4>
            <p className="text-xs leading-relaxed text-slate-400">{rev.comment}</p>

            <div className="pt-3 border-t border-slate-800/60 flex items-center gap-2 text-xs text-slate-500">
              <button className="flex items-center gap-1 hover:text-slate-300">
                <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
