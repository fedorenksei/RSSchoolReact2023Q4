export const Loader = () => {
  return (
    <div className="flex gap-3" data-testid="loader">
      <div className="w-2 h-2 bg-indigo-600 animate-ping"></div>
      <div className="w-2 h-2 bg-indigo-600 animate-ping animation-delay-75"></div>
      <div className="w-2 h-2 bg-indigo-600 animate-ping animation-delay-100"></div>
    </div>
  );
};
