export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[960px] mx-auto py-8 px-5 sm:px-4">
      {children}
    </div>
  );
}
