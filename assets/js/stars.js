(function(){
  const c = document.getElementById('bg');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w, h, dpr, stars;

  function resize(){
    dpr = Math.max(1, window.devicePixelRatio || 1);
    w = c.width = Math.floor(innerWidth * dpr);
    h = c.height = Math.floor(innerHeight * dpr);
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    spawn();
  }

  function spawn(){
    const count = Math.floor((innerWidth * innerHeight) / 12000); // density
    stars = new Array(count).fill(0).map(()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      z: Math.random()*1 + 0.2,
      vx: (Math.random()-0.5)*0.08,
      vy: (Math.random()-0.5)*0.08
    }));
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    ctx.globalAlpha = 0.9;
    for(const s of stars){
      s.x += s.vx * s.z;
      s.y += s.vy * s.z;
      if(s.x < 0) s.x = w; if(s.x > w) s.x = 0;
      if(s.y < 0) s.y = h; if(s.y > h) s.y = 0;

      const r = (0.6 + s.z*0.8) * (Math.min(w,h)/1200);
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  resize();
  step();
})();
