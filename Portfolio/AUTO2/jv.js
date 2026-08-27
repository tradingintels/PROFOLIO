document.querySelectorAll('a[href^="#"]').forEach(link=>{
link.addEventListener('click',e=>{
e.preventDefault();

document.querySelector(
link.getAttribute('href')
).scrollIntoView({
behavior:'smooth'
});
});
});

window.addEventListener('scroll',()=>{

document.querySelectorAll('.card').forEach(card=>{

const top = card.getBoundingClientRect().top;

if(top < window.innerHeight - 100){
card.style.opacity="1";
card.style.transform="translateY(0)";
}

});

});