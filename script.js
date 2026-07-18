// PARTICLES
(function(){
  const canvas=document.getElementById('particles-canvas');
  const ctx=canvas.getContext('2d');
  let W,H,particles=[];
  const colors=['#7C3AED','#EC4899','#F97316','#06B6D4','#A78BFA'];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  function rand(a,b){return Math.random()*(b-a)+a;}
  function Particle(){
    this.x=rand(0,W);this.y=rand(0,H);
    this.r=rand(1,3);this.color=colors[Math.floor(Math.random()*colors.length)];
    this.vx=rand(-0.3,0.3);this.vy=rand(-0.5,-0.1);
    this.alpha=rand(0.2,0.7);this.life=rand(100,300);this.age=0;
  }
  for(let i=0;i<120;i++)particles.push(new Particle());
  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(function(p,i){
      p.x+=p.vx;p.y+=p.vy;p.age++;
      if(p.age>p.life||p.y<-10){particles[i]=new Particle();return;}
      const progress=p.age/p.life;
      const alpha=p.alpha*(progress<0.1?progress/0.1:progress>0.8?(1-progress)/0.2:1);
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.color;ctx.globalAlpha=alpha;ctx.fill();
    });
    // Draw connections
    ctx.globalAlpha=0.03;
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle='#7C3AED';ctx.lineWidth=0.5;ctx.stroke();
        }
      }
    }
    ctx.globalAlpha=1;
    requestAnimationFrame(draw);
  }
  draw();
})();

// SCROLL REVEAL
const revealEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const observer=new IntersectionObserver(function(entries){
  entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');}});
},{threshold:0.12});
revealEls.forEach(function(el){observer.observe(el);});

// NAV
document.getElementById('hamburger').addEventListener('click',function(){
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    const t=document.querySelector(this.getAttribute('href'));
    if(t){e.preventDefault();document.getElementById('navLinks').classList.remove('open');t.scrollIntoView({behavior:'smooth'});}
  });
});

// FORM
function sendMsg(e){
  e.preventDefault();
  const s=document.getElementById('form-success');
  s.style.display='block';e.target.reset();
  setTimeout(function(){s.style.display='none';},5000);
}

// NAV ACTIVE STATE
window.addEventListener('scroll',function(){
  const nav=document.querySelector('nav');
  if(window.scrollY>50)nav.style.background='rgba(10,10,15,0.95)';
  else nav.style.background='rgba(10,10,15,0.85)';
});