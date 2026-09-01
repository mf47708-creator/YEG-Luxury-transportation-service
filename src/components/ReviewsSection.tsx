import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2, MessageSquarePlus, X, Send } from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviews';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submittedThanks, setSubmittedThanks] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newContent) return;

    const newRev: ReviewItem = {
      id: 'rev-' + Date.now(),
      author: newAuthor,
      title: newTitle || 'Exceptional Chauffeur Experience',
      content: newContent,
      rating: newRating,
      date: 'Just now',
      role: 'Valued Client',
      location: 'Edmonton, AB',
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setSubmittedThanks(true);
    setTimeout(() => {
      setSubmittedThanks(false);
      setShowReviewModal(false);
      setNewAuthor('');
      setNewTitle('');
      setNewContent('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-24 bg-[#080808] relative border-t border-[#C9A45C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Google Rating Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151515] border border-[#C9A45C]/40 mb-3 shadow-md">
              <Star className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#F5F3EE]">
                5-Star Client Testimonials
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F3EE]">
              Words From Our <span className="text-[#C9A45C]">Distinguished Guests</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-[#151515] p-4 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[#C9A45C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#F5F3EE] mt-1">
                5.0 Star Average Rating
              </span>
              <span className="text-[10px] text-[#A7A7A7]">Based on 140+ Google & VIP Reviews</span>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 border border-[#FFF1C5]/40 shadow-md"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#080808]" />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#151515] border border-white/10 hover:border-[#C9A45C]/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative"
            >
              <Quote className="w-10 h-10 text-white/05 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#A7A7A7] font-medium">
                    {rev.date}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-[#F5F3EE] mb-2">
                  {rev.title}
                </h3>

                <p className="text-[#A7A7A7] text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  “{rev.content}”
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] flex items-center justify-center text-[#080808] font-bold text-sm shadow-md">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F5F3EE] flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[9px] bg-[#C9A45C]/20 text-[#E2C27A] px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5 border border-[#C9A45C]/40">
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#C9A45C]" />
                          <span>Verified Ride</span>
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-[#A7A7A7]">
                      {rev.role} • {rev.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080808]/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#151515] border border-white/15 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-[#A7A7A7] hover:text-[#F5F3EE] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedThanks ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-[#C9A45C] mx-auto mb-4" />
                <h3 className="font-cinzel text-2xl font-bold text-[#F5F3EE] mb-2">
                  Thank You For Your Review
                </h3>
                <p className="text-sm text-[#A7A7A7]">
                  Your feedback helps us maintain the royal standard of executive chauffeur transportation in Edmonton.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview}>
                <span className="text-xs uppercase font-bold text-[#C9A45C] tracking-wider block mb-1">
                  Air Time Chauffeur Feedback
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F5F3EE] mb-4">
                  Share Your Experience
                </h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A7A7] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. David Henderson"
                      className="w-full px-4 py-2.5 bg-[#080808] border border-white/15 rounded-xl text-[#F5F3EE] text-xs focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A7A7] mb-1">
                      Headline / Title
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Best YEG airport ride ever"
                      className="w-full px-4 py-2.5 bg-[#080808] border border-white/15 rounded-xl text-[#F5F3EE] text-xs focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A7A7] mb-1">
                      Star Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'fill-[#C9A45C] text-[#C9A45C]'
                                : 'text-neutral-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A7A7] mb-1">
                      Your Comments
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Describe the vehicle condition, punctuality, and chauffeur professionalism..."
                      className="w-full px-4 py-2.5 bg-[#080808] border border-white/15 rounded-xl text-[#F5F3EE] text-xs focus:outline-none focus:border-[#C9A45C] resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C9A45C]/30 border border-[#FFF1C5]/40"
                >
                  <Send className="w-4 h-4 text-[#080808]" />
                  <span>Submit Client Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

