const LoadingScreen = () => {
  return (
    <div className="fixed left-0 top-0 z-[999] h-screen w-screen">
      <div className="pointer-events-none fixed left-0 top-0 z-[999] h-screen w-screen"></div>
      <div className="fixed left-0 top-0 z-[99] h-full w-full bg-slate-400 opacity-30"></div>
      <div className="fixed z-[999] m-auto flex h-screen w-screen flex-col items-center justify-center rounded-full">
        <div className="relative m-auto flex aspect-square w-[100px] items-center justify-center">
          <div className="animate-capsul-left relative z-[99] h-8 w-[40px] rounded-l-full rounded-r-none border-2 border-primGreen bg-white"></div>
          <div className="absolute top-8 m-auto flex h-16 flex-row gap-10">
            <div className="w-14">
              <div className="animate-drugBall-left absolute left-0 top-0 h-2 w-2 rounded-full bg-white ring-2 ring-primGreen"></div>
            </div>
            <div className="w-14">
              <div className="animate-drugBall-right absolute right-0 top-0 h-2 w-2 rounded-full bg-white ring-2 ring-primBlue"></div>
            </div>
          </div>
          <div className="animate-capsul-right relative h-8 w-[40px] rounded-l-none rounded-r-full bg-primBlue"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
