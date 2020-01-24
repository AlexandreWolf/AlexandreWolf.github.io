const itensMenu = document.querySelectorAll('.item-menu');
const sections = document.querySelectorAll('.main-section');
const toggleMenu = document.querySelector('.menu-icon');
const menu = document.querySelector('.left-menu');
const iconOpen = document.querySelector('.fa.fa-bars');
const iconClose = document.querySelector('.fa.fa-close');
const content = document.querySelector('.content');

const date = new Date();
const currentYear = date.getFullYear();
document.querySelector('.copy-year').innerHTML = currentYear;

function changeLinkState() {
  let index = sections.length;

  while (--index && window.scrollY + 50 < sections[index].offsetTop) { }

  itensMenu.forEach((link) => link.classList.remove('active'));
  let active = itensMenu[index];

  active.classList.add('active');
}

changeLinkState();
window.addEventListener('scroll', changeLinkState);

const listener = () => {
  //volta botoes do menu ao estado padrão
  iconOpen.style.display = 'flex'
  iconClose.style.display = 'none'

  //exibe ou esconde o menu de acordo com a largura da tela ao redimensionar
  if (window.innerWidth > 720)
    return menu.style.display = 'flex'

  return menu.style.display = 'none'
}
window.addEventListener('resize', listener)

//abre e fecha o menu ao clicar no icone
toggleMenu.addEventListener('click', function () {
  iconOpen.style.display = (menu.style.display === '' || menu.style.display === 'none') ? 'none' : 'flex';
  iconClose.style.display = (menu.style.display === '' || menu.style.display === 'none') ? 'flex' : 'none';
  menu.style.display = (menu.style.display === '' || menu.style.display === 'none') ? 'flex' : 'none';
});

//clique no item do menu
itensMenu.forEach(itemMenu => itemMenu.addEventListener('click', function () {
  //seta menu clicado como ativo
  let lastActive = document.querySelector('.item-menu.active');
  lastActive.className = lastActive.className.replace('active', '');
  this.classList.add('active');

  //volta o icone do menu ao estado padrão e fecha o menu caso esteja no mobile
  iconOpen.style.display = 'flex';
  iconClose.style.display = 'none';
  if (window.innerWidth < 720) menu.style.display = 'none';
}));



/* typing effect */
const TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  let that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  let elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute('data-rotate');
    let period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  let css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

/* scroll to top button */
const btn = document.querySelector('.to-top');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}