// ======================================
// DATABASE SIMULADO
// ======================================

const db = {

culturas:[

{
nome:"Soja",
producao:"170 milhões de toneladas",
descricao:"Principal commodity agrícola brasileira."
},

{
nome:"Milho",
producao:"130 milhões de toneladas",
descricao:"Base da alimentação animal."
},

{
nome:"Café",
producao:"65 milhões de sacas",
descricao:"Liderança mundial."
},

{
nome:"Trigo",
producao:"12 milhões de toneladas",
descricao:"Expansão produtiva."
}

],

noticias:[

{
id:1,
titulo:"Exportações agrícolas batem novo recorde",
categoria:"Mercado",
likes:0
},

{
id:2,
titulo:"IA aumenta produtividade em fazendas",
categoria:"Tecnologia",
likes:0
},

{
id:3,
titulo:"Novos drones revolucionam pulverização",
categoria:"Tecnologia",
likes:0
},

{
id:4,
titulo:"Mercado de soja apresenta alta",
categoria:"Mercado",
likes:0
}

]

};

// ======================================
// PRODUÇÃO AGRÍCOLA
// ======================================

const culturasContainer =
document.getElementById("culturasContainer");

db.culturas.forEach(cultura=>{

culturasContainer.innerHTML += `
<div class="card reveal">
<h3>${cultura.nome}</h3>
<p>${cultura.descricao}</p>
<strong>${cultura.producao}</strong>
</div>
`;

});

// ======================================
// NOTÍCIAS
// ======================================

const newsContainer =
document.getElementById("newsContainer");

function loadNews(){

newsContainer.innerHTML="";

db.noticias.forEach(news=>{

newsContainer.innerHTML += `
<div class="card">

<h3>${news.titulo}</h3>

<p>
Categoria:
${news.categoria}
</p>

<button onclick="likeNews(${news.id})">
👍 ${news.likes}
</button>

</div>
`;

});

}

loadNews();

function likeNews(id){

const item =
db.noticias.find(n=>n.id===id);

item.likes++;

loadNews();

saveData();
}

// ======================================
// LOCAL STORAGE
// ======================================

function saveData(){

localStorage.setItem(
"agroDB",
JSON.stringify(db)
);

}

// ======================================
// DARK MODE
// ======================================

document
.getElementById("themeBtn")
.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

// ======================================
// SCROLL REVEAL
// ======================================

const reveals =
document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

reveals.forEach(item=>{

const top =
item.getBoundingClientRect().top;

if(top < window.innerHeight - 100){

item.classList.add("active");

}

});

});

// ======================================
// FORMULÁRIO
// ======================================

document
.getElementById("contactForm")
.addEventListener("submit",(e)=>{

e.preventDefault();

alert(
"Mensagem enviada com sucesso!"
);

});

// ======================================
// PARTÍCULAS NATURAIS
// ======================================

const particles =
document.querySelector(".particles");

for(let i=0;i<50;i++){

const leaf =
document.createElement("span");

leaf.classList.add("leaf");

leaf.style.left =
Math.random()*100+"%";

leaf.style.animationDuration =
5 + Math.random()*10 + "s";

particles.appendChild(leaf);

}