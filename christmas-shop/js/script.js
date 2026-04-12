const targetDate = new Date("Jan 1, 2027 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  document.getElementById("days").textContent =
    Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent =
    Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").textContent =
    Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").textContent =
    Math.floor((diff / 1000) % 60);
}, 1000);


  const navTabs = document.querySelectorAll('.tabs a');

  navTabs.forEach(link => {
    link.addEventListener('click', function(event) {
      navTabs.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });


  const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-list a');

function toggleMenu() {
   burgerBtn.classList.toggle('active');
   navMenu.classList.toggle('active');
   body.classList.toggle('lock');
}

burgerBtn.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
   link.addEventListener('click', () => {
       if (navMenu.classList.contains('active')) {
           toggleMenu();
       }
   });
});

window.addEventListener('resize', () => {
   if (window.innerWidth >= 768) {
       burgerBtn.classList.remove('active');
       navMenu.classList.remove('active');
       body.classList.remove('lock');
   }
});


document.addEventListener('DOMContentLoaded', () => {
   const sliderItems = document.querySelectorAll('.lcld-item');
   const prevBtn = document.getElementById('prev-btn');
   const nextBtn = document.getElementById('next-btn');
  
   let currentIndex = 0;

   function updateSlider() {
       const width = window.innerWidth;

       if (width >= 1440) {
   
           sliderItems.forEach(item => {
               item.style.display = 'flex';
               item.classList.remove('tablet-active');
           });
       }
       else if (width >= 768) {
           sliderItems.forEach((item, i) => {
               item.classList.remove('next-text');
              
               if (i === currentIndex) {
                   item.style.display = 'flex';
                   item.classList.add('tablet-active'); 
               }
               else if (i === currentIndex + 1) {
                   item.style.display = 'flex';
                   item.classList.add('next-only'); 
               }
               else {
                   item.style.display = 'none';
               }
           });
       }
       else {
          
           sliderItems.forEach((item, i) => {
               item.style.display = (i === currentIndex) ? 'flex' : 'none';
               item.classList.remove('tablet-active', 'next-only');
           });
       }

      
       prevBtn.disabled = currentIndex === 0;
       nextBtn.disabled = currentIndex === sliderItems.length - 1;
      
       
       prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
       nextBtn.style.opacity = currentIndex === sliderItems.length - 1 ? "0.5" : "1";
   }

   nextBtn.addEventListener('click', () => {
       if (currentIndex < sliderItems.length - 1) {
           currentIndex++;
           updateSlider();
       }
   });

   prevBtn.addEventListener('click', () => {
       if (currentIndex > 0) {
           currentIndex--;
           updateSlider();
       }
   });

   window.addEventListener('resize', updateSlider);
   updateSlider();
});