[ /* 1, 2, 3 in order */ ].map(({ n, Icon, title, text }, idx, arr) => (
  <div key={n} className="relative">
    {/* card... */}

    {/* right arrow (desktop) */}
    {idx < arr.length - 1 && (
      <>
        <div className="hidden md:block absolute top-1/2 -right-8 w-12 h-[2px] bg-slate-200" />
        <div className="hidden md:block absolute top-1/2 -right-8 translate-x-full -translate-y-1/2
                        w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-slate-300" />
      </>
    )}

    {/* down arrow (mobile) */}
    {idx < arr.length - 1 && (
      <div className="md:hidden absolute -bottom-7 left-1/2 -translate-x-1/2">
        <div className="mx-auto w-[2px] h-5 bg-slate-200" />
        <div className="mx-auto w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-slate-300" />
      </div>
    )}
  </div>
))
