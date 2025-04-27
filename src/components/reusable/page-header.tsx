export interface PageHeaderProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children
}) => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground mt-1'>{subtitle}</p>
      </div>
      <div className='flex items-center gap-3'>{children}</div>
    </div>
  );
};
