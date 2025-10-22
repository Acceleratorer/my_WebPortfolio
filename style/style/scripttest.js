// Parallax background (mouse)
(() => {
  let mouseX=50, mouseY=50, posX=50, posY=50;
  const speed=0.08;
  document.addEventListener('mousemove',e=>{
    mouseX=(e.clientX/window.innerWidth)*100;
    mouseY=(e.clientY/window.innerHeight)*100;
  });
  function update(){
    posX+=(mouseX-posX)*speed;
    posY+=(mouseY-posY)*speed;
    document.body.style.backgroundPosition=`${50+(posX-50)/8}% ${50+(posY-50)/8}%`;
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
})();

// Intersection Observer fade-in
(() => {
  const io=new IntersectionObserver((entries,obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.fade-in,.fade-in-delay').forEach(el=>io.observe(el));
})();

// Click link-card delegation
document.addEventListener('click',e=>{
  const a=e.target.closest('.link-card');
  if(a&&a.tagName.toLowerCase()==='a')return;
  const clickable=e.target.closest('[data-href]');
  if(clickable){
    window.open(clickable.dataset.href,'_blank','noopener');
  }
});

// Advanced button toggle
document.querySelector('.advanced-btn').addEventListener('click',function(){
  const opened=this.getAttribute('aria-expanded')==='true';
  this.setAttribute('aria-expanded',String(!opened));
  document.body.classList.toggle('show-advanced');
});