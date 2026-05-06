// Cursor glow
const cg=document.getElementById('cursor-glow');
document.addEventListener('mousemove',e=>{cg.style.left=e.clientX+'px';cg.style.top=e.clientY+'px'});
document.addEventListener('mouseleave',()=>cg.style.opacity='0');
document.addEventListener('mouseenter',()=>cg.style.opacity='1');

// Scroll reveal
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),e.target.dataset.d||0);ro.unobserve(e.target)}});
},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.dataset.d=(i%6)*70;ro.observe(el)});

// Skill bars
const so=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.skill-fill').forEach(b=>{const w=b.dataset.width+'%';b.style.width='0';requestAnimationFrame(()=>setTimeout(()=>b.style.width=w,120))});so.unobserve(e.target)}});
},{threshold:.2});
document.querySelectorAll('#card-skills').forEach(el=>so.observe(el));

// Stat counters
function countUp(el,t,s){let c=0;const st=t/50;const tm=setInterval(()=>{c+=st;if(c>=t){c=t;clearInterval(tm)}el.textContent=Math.floor(c)+s},16)}
const sro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.stat-num').forEach(n=>{const r=n.textContent;const m=r.match(/(\d+\.?\d*)(.*)/);if(m)countUp(n,parseFloat(m[1]),m[2])});sro.unobserve(e.target)}});
},{threshold:.4});
document.querySelectorAll('.stats-grid').forEach(el=>sro.observe(el));

// Card tilt
document.querySelectorAll('.card').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateZ(4px)`});
  c.addEventListener('mouseleave',()=>c.style.transform='');
});
