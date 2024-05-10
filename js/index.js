//Banner de inicio
window.addEventListener('scroll', function() {
  const parallax = document.querySelector('.parallax-image');
  let scrollPosition = window.pageYOffset;
  parallax.style.transform = 'translateZ(-1px) scale(1.5) translateY(' + scrollPosition * 0.5 + 'px)';
});

//preguntas frecuentes
document.addEventListener('DOMContentLoaded', function() {
  var faqPanels = document.querySelectorAll('.faq-panel-header');
  faqPanels.forEach(function(panel) {
      panel.addEventListener('click', function() {
          this.parentNode.classList.toggle('open');
      });
  });
});

//boton volver arriba
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("btnTop").style.display = "block";
  } else {
    document.getElementById("btnTop").style.display = "none";
  }
}


function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// contact form
document.querySelector('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.elements.name.value = '';
  e.target.elements.email.value = '';
  e.target.elements.message.value = '';
});

