interface CatalogHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  totalCreations: number;
  filteredCount: number;
}

export function CatalogHeader({
  badge,
  title,
  subtitle,
  totalCreations,
  filteredCount,
}: CatalogHeaderProps) {
  return (
    <div className="border-b border-noir-800 pb-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-gold-400 font-semibold mb-2 block">
            {badge}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-50 tracking-tight">
            {title}
          </h1>
          {/* <p className="text-sm text-noir-400 mt-2 max-w-xl">
            {subtitle}
          </p> */}
        </div>

        <div className="text-xs text-noir-400 font-sans">
          Showing <span className="text-noir-100 font-medium">{filteredCount}</span> of{' '}
          <span className="text-noir-100 font-medium">{totalCreations}</span> fragrances
        </div>
      </div>

    </div>
  );
}
