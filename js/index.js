//Banner de inicio
window.addEventListener('scroll', function() {
  const parallax = document.querySelector('.parallax-image');
  let scrollPosition = window.pageYOffset;
  parallax.style.transform = 'translateZ(-1px) scale(1.5) translateY(' + scrollPosition * 0.5 + 'px)';
});

document.addEventListener('DOMContentLoaded', function() {
  //preguntas frecuentes
  var faqPanels = document.querySelectorAll('.faq-panel-header');
  faqPanels.forEach(function(panel) {
      panel.addEventListener('click', function() {
          this.parentNode.classList.toggle('open');
      });
  });

  //difuminado de secciones
  var seccion1 = document.querySelector('.seccion-1');
  var seccion2 = document.querySelector('.seccion-2');
  function isInViewport(element) {
      var rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }
  function mostrarSeccion() {
      if (isInViewport(seccion1)) {
          seccion1.classList.add('aparecer');
      }
      if (isInViewport(seccion2)) {
          seccion2.classList.add('aparecer');
      }
  }
  window.addEventListener('scroll', mostrarSeccion);
  mostrarSeccion();

  // Llamada a Api de Dólar
  fetch("https://dolarapi.com/v1/dolares")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(dolar => {
        const dolarElement = document.createElement('div');
        dolarElement.classList.add('dolar-item');
        const dolarTipo = document.createElement('h3');
        dolarTipo.textContent = `Dolar ${dolar.nombre} :`;
        const dolarPrecio = document.createElement('p');
        dolarPrecio.textContent = `Compra: $${dolar.compra} - Venta: $${dolar.venta}`;
        dolarElement.appendChild(dolarTipo);
        dolarElement.appendChild(dolarPrecio);
        document.getElementById('dolar-container').appendChild(dolarElement);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    const errorElement = document.createElement('div');
    errorElement.textContent = 'No se pudo cargar el valor del Dolar.';
    document.getElementById('dolar-container').appendChild(errorElement);
  });

  //Fecha actual
  var today = new Date();
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var formattedDate = today.toLocaleDateString('es-ES', options);
  document.getElementById('current-date').textContent = formattedDate;
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
