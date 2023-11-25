var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var video = document.getElementById("Intro");
var go = document.getElementById("go");
var bandeau = document.getElementById("bandeau");
var texte = document.getElementById("p1");
var divbtn = document.getElementById("divbuttons");
var MY_PV = 50;
var HIS_PV = 50;
var nbre_de_potions = 3;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function barPV() {
    document.getElementById("myBar").style.width = (MY_PV + "%");
    document.getElementById("myBar").innerHTML = MY_PV;
    document.getElementById("hisBar").style.width = (HIS_PV + "%");
    document.getElementById("hisBar").innerHTML = HIS_PV;
}

function soins() {
    barPV()
    texte.innerHTML = "Vous récupérez des points de vie. ♥️<br>Il vous reste " + nbre_de_potions + " potion(s) 🧪";
}

function ennemy() {
    bandeau.style.visibility = "hidden";
    dégats_ennemis = randomNumber(5,15);
    MY_PV -= dégats_ennemis;

    if (MY_PV <= 0) {
        MY_PV = 0;
        btn1.style.display = "none";
        btn2.style.display = "none";
        video.src = "videos/lose.mp4";
        texte.innerHTML = "L'ennemi vous a terrassé ! Vous avez perdu ! 🪦";
        barPV();
    } else {
    video.src = "videos/ennemy.mp4";
    texte.innerHTML ="L'ennemi vous a infligé " + dégats_ennemis + " points de dégats. ⚔️ Il vous reste " + MY_PV + " points de vie. ♥️ Il reste " + HIS_PV + " points de vie à l'ennemi. ♥️ ";
    barPV();
}
}

function passe() {
    texte.innerHTML = "Vous passez votre tour...";
}

function display_block() {
    btn1.style.display = "block";
    btn2.style.display = "block";
}

video.addEventListener("ended", (event) => {
    bandeau.style.visibility = "visible";
    btn1.style.visibility = "visible";
    btn2.style.visibility = "visible";
    go.style.visibility = "visible";
})


go.addEventListener("click", (event) => {
    btn1.style.visibility = "hidden";
    btn2.style.visibility = "hidden";
    bandeau.style.visibility = "hidden";
    video.src = "videos/Intro2.mp4"
    go.remove();
    texte.innerHTML = "Souhaitez-vous attaquer ou vous soigner ? ";
    display_block()
    }) 

    
    var i = 0;
    function move() {
      if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 50;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= 100) {
            clearInterval(id);
            i = 0;
          } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
          }
        }
      }
    }


btn1.addEventListener("click", (event) => {
    btn1.style.visibility = "hidden";
    btn2.style.visibility = "hidden";
    bandeau.style.visibility = "hidden";
    video.src = "videos/fight1.mp4";
    let mes_dégats = randomNumber(5,10);
    let dégats_ennemis = randomNumber(5, 15);
    MY_PV -= dégats_ennemis;
    HIS_PV -= mes_dégats;
    if (HIS_PV <= 0) {
        HIS_PV = 0;
        btn1.style.display = "none";
        btn2.style.display = "none";
        video.src = "videos/win.mp4";
        texte.innerHTML = "L'ennemi est vaincu ! Bravo ! Vous avez gagné ! 🏆";
        if (MY_PV <= 0) { 
            MY_PV = 1;
        }
        barPV();
    } else if (MY_PV <= 0) {
        MY_PV = 0;
        btn1.style.display = "none";
        btn2.style.display = "none";
        video.src = "videos/lose.mp4";
        texte.innerHTML = "L'ennemi vous a terrassé ! Vous avez perdu ! 🪦";
        barPV();
    } else {
        texte.innerHTML = "Vous avez infligé "+ mes_dégats +" points de dégats à l'ennemi. ⚔️ L'ennemi vous a infligé " + dégats_ennemis + " points de dégats. ⚔️<br> Il vous reste " + MY_PV +" points de vie.♥️ Il reste " + HIS_PV +" points de vie à l'ennemi. ♥️";
        bandeau.style.visibility = "hidden";
        barPV();
        } 
})

btn2.addEventListener("click", (event) => {
        if (nbre_de_potions == 0) {
            texte.innerHTML ="Vous n'avez plus de potions !";
        } else {
            btn1.style.display = "none";
            btn2.style.display = "none";
            texte.innerHTML ="Vous utilisez une potion 🧪...";
            bandeau.style.visibility = "visible";
            potion = randomNumber(15,50);
            MY_PV += potion;
            if (MY_PV >= 50) {
                MY_PV = 50;
            }
            nbre_de_potions -= 1;
            setTimeout(soins,2000);
            setTimeout(ennemy, 5000);
            setTimeout(passe, 11000);
            setTimeout(ennemy, 13000);
            setTimeout(display_block, 16000);
    }
    })
