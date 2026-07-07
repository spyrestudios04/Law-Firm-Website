import React from 'react';
import { legalContent } from '../data/content';

const stats = [
  { value: '15+', label: 'Years of Practice' },
  { value: '2,500+', label: 'Cases Handled' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '4', label: 'Courts of Practice' },
];

export default function AttorneyProfile() {
  const { profile, images } = legalContent;

  return (
    <section id="profile">

      {/* ── PART 1 — Hero-style Profile Intro ── */}
      <div className="bg-neutral-50 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

            {/* Image Column */}
            <div className="md:col-span-5 aspect-[3/4] relative p-4">
              <div className="absolute inset-0 bg-legal-gold/20 translate-x-4 translate-y-4 -z-10"></div>
              <img
                src={images.profile}
                alt={profile.name}
                className="w-full h-full object-cover shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Text Column */}
            <div className="md:col-span-7 space-y-6 md:pl-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-legal-gold block">
                Lead Counsel
              </span>

              <h2 className="text-4xl md:text-6xl font-serif font-normal text-black">
                {profile.name}
              </h2>

              <p className="font-sans text-sm text-neutral-600 font-medium uppercase tracking-wider">
                {profile.credentials}
              </p>

              <div className="h-px w-full bg-black/10"></div>

              <ul className="space-y-4 font-sans text-sm uppercase tracking-wider text-neutral-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-legal-gold mr-4 shrink-0"></span>
                  {profile.experience}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-legal-gold mr-4 shrink-0"></span>
                  {profile.barCouncil}
                </li>
              </ul>

              <p className="text-base text-neutral-600 leading-relaxed font-sans pt-2">
                With over 15 years of distinguished legal practice, Adv. Rajesh
                Sharma has established a reputation as one of Nashik&rsquo;s most
                trusted legal practitioners. Having argued complex matters before
                the Bombay High Court and District Sessions Courts, his practice
                is built on a foundation of meticulous case preparation,
                aggressive courtroom advocacy, and an unwavering commitment to
                client interests. From landmark property dispute resolutions to
                successful criminal defense appeals, his track record speaks to a
                deep understanding of both the letter and spirit of Indian law.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── PART 2 — Stats / Credentials Bar ── */}
      <div className="bg-black py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center${
                  i < stats.length - 1
                    ? ' border-r border-white/10'
                    : ''
                }`}
              >
                <span className="block text-4xl md:text-5xl font-serif text-legal-gold">
                  {stat.value}
                </span>
                <span className="block mt-3 text-xs uppercase tracking-widest text-neutral-400 font-sans">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PART 3 — Philosophy Section ── */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">

          {/* Decorative Quote Icon */}
          <svg
            className="mx-auto mb-8 text-legal-gold"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378C7.39 7.656 6.66 9.547 6.397 11.232c.278-.079.587-.117.907-.117 1.727 0 3.13 1.424 3.13 3.178 0 1.755-1.403 3.178-3.13 3.178-1.19 0-2.13-.6-2.721-1.15ZM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-2.534 1.455-3.264 3.346-3.527 5.031.278-.079.587-.117.907-.117 1.727 0 3.13 1.424 3.13 3.178 0 1.755-1.403 3.178-3.13 3.178-1.19 0-2.13-.6-2.72-1.15Z" />
          </svg>

          <h3 className="font-serif text-3xl text-black mb-8">
            Our Legal Philosophy
          </h3>

          <p className="text-lg text-neutral-600 leading-relaxed font-sans mb-6">
            Every legal matter, regardless of its apparent complexity, deserves
            the same rigorous attention to detail. At Advocate R. Sharma &amp;
            Associates, we believe that the foundation of effective legal
            representation lies not merely in knowing the law, but in
            understanding the human circumstances that bring our clients to seek
            justice.
          </p>

          <p className="text-lg text-neutral-600 leading-relaxed font-sans mb-12">
            Our chambers operate on three inviolable principles: absolute
            confidentiality, transparent communication, and relentless pursuit of
            the most favorable outcome. We do not take cases we cannot commit to
            fully&nbsp;&mdash; because when we stand before the court, we stand
            with the full weight of our reputation behind every argument.
          </p>

          {/* Gold Divider */}
          <div className="h-px w-24 bg-legal-gold mx-auto"></div>

        </div>
      </div>

    </section>
  );
}