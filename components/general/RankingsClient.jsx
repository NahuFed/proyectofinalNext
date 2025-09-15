"use client";
import { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMoviesWithRatings } from "@/store/slices/moviesSlice";
import { MovieCard } from "@/components/general/MovieCard";
import { Star, MessageSquareText, Flame, MoveLeft } from "lucide-react";
import Link from "next/link";

function safeNumber(n, fallback = 0) {
  return typeof n === "number" && Number.isFinite(n) ? n : fallback;
}

const TABS = [
  { key: "rated", label: "Mejor calificadas", icon: Star },
  { key: "reviewed", label: "Más reseñadas", icon: MessageSquareText },
  { key: "popular", label: "Más populares", icon: Flame },
];

function RankingsClient({ movies = [] }) {
  const [tab, setTab] = useState("rated");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesWithRatings());
  }, [dispatch]);

  const bestRated = useMemo(() => {
    return [...movies].sort(
      (a, b) => safeNumber(b.averageScore) - safeNumber(a.averageScore)
    );
  }, [movies]);

  const mostReviewed = useMemo(() => {
    return [...movies].sort(
      (a, b) => safeNumber(b.reviewsCount) - safeNumber(a.reviewsCount)
    );
  }, [movies]);

  const mostPopular = useMemo(() => {
    return [...movies].sort((a, b) => {
      const aScore = safeNumber(a.reviewsCount) * safeNumber(a.averageScore);
      const bScore = safeNumber(b.reviewsCount) * safeNumber(b.averageScore);
      return bScore - aScore;
    });
  }, [movies]);

  const lists = {
    rated: bestRated,
    reviewed: mostReviewed,
    popular: mostPopular,
  };

  const ActiveIcon = TABS.find((t) => t.key === tab)?.icon ?? Star;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4">
            <MoveLeft className="inline h-6 w-6 text-gray-300 mr-2"/>
            <Link href={"/movies"}  ><strong className="text-gray-300 text-2xl">Volver</strong></Link>
        </div>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-fuchsia-800">
          <ActiveIcon className="h-6 w-6" />
          Rankings
        </h1>

        <nav
          className="inline-flex items-center gap-2 rounded-full bg-muted/40 p-1"
          role="tablist"
          aria-label="Cambiar ranking"
        >
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-fuchsia-700 text-white shadow-sm"
                    : "text-foreground/80 hover:bg-foreground/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-600",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </nav>
      </header>

      {(!lists[tab] || lists[tab].length === 0) && (
        <div className="rounded-xl border border-border p-8 text-center">
          <p className="text-base text-foreground/70">
            No hay películas para mostrar en este ranking todavía.
          </p>
        </div>
      )}

      <ol
        className="
          grid grid-cols-1 gap-5
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {lists[tab]?.map((movie, idx) => (
          <li key={movie.id ?? `${tab}-${idx}`} className="relative">
            <span
              className="
                absolute -left-2 -top-2 z-10
                inline-flex h-9 min-w-9 items-center justify-center
                rounded-full bg-fuchsia-700 px-2 text-sm font-bold text-white shadow
              "
              aria-label={`Posición ${idx + 1}`}
              title={`#${idx + 1}`}
            >
              #{idx + 1}
            </span>

            <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 shadow-sm transition hover:shadow-md">
              <MovieCard movie={movie} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
export default RankingsClient;
