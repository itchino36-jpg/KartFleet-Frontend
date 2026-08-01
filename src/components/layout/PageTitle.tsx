interface PageTitleProps {
  title: string;
  description?: string;
}

export default function PageTitle({
  title,
  description,
}: PageTitleProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-slate-800">
        {title}
      </h1>

      {description && (
        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}