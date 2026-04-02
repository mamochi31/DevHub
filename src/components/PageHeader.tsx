type PageHeaderProps = {
  title: string;
};

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100">
        {title}
      </h1>
    </header>
  );
}
