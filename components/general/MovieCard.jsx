"use client";
import Link from "next/link";
import { Star, Clock, MessageSquareText } from "lucide-react";

export function MovieCard({ movie: m }) {
  const rating =
    typeof m.averageScore === "number" && m.averageScore > 0
      ? m.averageScore.toFixed(1)
      : null;

  const shownGenres = Array.isArray(m.genre) ? m.genre.slice(0, 2) : [];
  const remaining = Array.isArray(m.genre) ? m.genre.length - shownGenres.length : 0;
  const runtimeText = typeof m.runtime === "number" ? `${m.runtime} min` : null;
  const reviewsCount = Array.isArray(m.reviews) ? m.reviews.length : null;

  return (
    <Link
      href={`/movies/${m.id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 rounded-xl"
      aria-label={`Ver detalles de ${m.title}`}
    >
      <article className="bg-card/40 border border-border/60 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-black/20 transition-all duration-300 group-hover:scale-[1.01]">
        <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
          <img
            src={m.image}
            alt={m.title}
            className="h-full w-full object-cover transform group-hover:scale-[1.03] transition-transform duration-300"
            loading="lazy"
          />
          {rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur px-2 py-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{rating}</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold leading-tight line-clamp-1 group-hover:text-fuchsia-600">
            {m.title}
          </h3>
          <p className="mt-1 text-sm text-white/70">
            {m.year}{m.director ? <span> • {m.director}</span> : null}
          </p>

          {shownGenres.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {shownGenres.map((g) => (
                <span key={g} className="inline-block rounded-md border border-border/70 bg-muted/30 px-2 py-1 text-xs">
                  {g}
                </span>
              ))}
              {remaining > 0 && (
                <span className="inline-block rounded-md border border-border/70 bg-muted/30 px-2 py-1 text-xs">+{remaining}</span>
              )}
            </div>
          )}

          {(runtimeText || reviewsCount !== null) && (
            <div className="mt-4 flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-1">
                {runtimeText && (<><Clock className="w-4 h-4" /><span>{runtimeText}</span></>)}
              </div>
              <div className="flex items-center gap-1">
                {reviewsCount !== null && (<><MessageSquareText className="w-4 h-4" /><span>{reviewsCount} reseña{reviewsCount === 1 ? "" : "s"}</span></>)}
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}