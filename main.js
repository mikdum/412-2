
let peliStarted = false;
let nopparotated = false;

let timer;
let timestarted;
let timeduration = 1 * 1000;
let rotateY = 0,
    rotateX = 0;
let goalrotateY = 0,
    goalrotateX = 0;

let rotateY_const = 0,
    rotateX_const = 0;

var results;
var pelimäärää;
let currentresult = 0;
let activeplayerid = 0;

window.onload = function () {

    document.getElementById('btn_aloita').addEventListener("click", btn_aloita);

}

function btn_heittää(pelijäid) {
    activeplayerid = pelijäid;
    let btn_heittää = document.querySelector('#pelijä' + pelijäid + ' #btn_heittää');
    btn_heittää.disabled = true;



    if (nopparotated) {
        clearInterval(timer);

    }

    if (rotateX > 360) {
        rotateX -= 360;

    }
    if (rotateY > 360) {
        rotateY -= 360;
    }

    nopparotated = true;
    timestarted = Date.now();
    currentresult = Math.floor(Math.random() * 6 + 1);
    switch (currentresult) {
        case 1: {
            goalrotateY = 360;
            goalrotateX = 360;
            break;
        }
        case 2: {
            goalrotateY = 270;
            goalrotateX = 360;
            break;
        }
        case 3: {
            goalrotateY = 360;
            goalrotateX = 270;
            break;
        }
        case 4: {
            goalrotateY = 90;
            goalrotateX = 360;
            break;
        }
        case 5: {
            goalrotateY = 360;
            goalrotateX = 90;
            break;
        }
        case 6: {
            goalrotateY = 180;
            goalrotateX = 360;
            break;
        }
    }
    if ((rotateX + 360) > goalrotateX) {
        goalrotateX += 360;
    }
    if ((rotateY + 360) > goalrotateY) {
        goalrotateY += 360;
    }


    rotateY_const = (goalrotateY - rotateY) / 120;
    rotateX_const = (goalrotateX - rotateX) / 120;

    timer = setInterval(peliisgoing, 20);

}
function btn_rittää(pelijäid) {

    activeplayerid = pelijäid;
    let btn_heittää = document.querySelector('#pelijä' + pelijäid + ' #btn_heittää');
    btn_heittää.disabled = true;
    let btn_rittää = document.querySelector('#pelijä' + pelijäid + ' #btn_rittää');
    btn_rittää.disabled = true;
    let parent = document.querySelector('.pelijät');

    if (pelijäid < parent.childElementCount - 1) {
        pelijäid += 1;
        let btn_heittää = document.querySelector('#pelijä' + pelijäid + ' #btn_heittää');
        btn_heittää.disabled = false;
        let btn_rittää = document.querySelector('#pelijä' + pelijäid + ' #btn_rittää');
        btn_rittää.disabled = false;

    }
    else {
        maxresult =Math.max.apply(null, results);
        console.log()
        let Voittaja = "Voittaja:";
        for (let i = 0; i < parent.childElementCount; i++) {
            if (maxresult == results[i]) {
                Voittaja += " pelijä" + (i + 1);
            }

            let pelijänimi = document.querySelector('#messagewinner');
            pelijänimi.innerHTML = Voittaja;

        }


    }

}
function btn_aloita() {
    let peliajcount = document.getElementById('pelijäcount').value;
    let parent = document.querySelector('.pelijät');
    document.getElementById("btn_heittää").disabled = false;
    document.getElementById("btn_rittää").disabled = false;
    let pelijänimi = document.querySelector('#messagewinner');
    pelijänimi.innerHTML = "";

    while (parent.childElementCount > peliajcount) {
        parent.removeChild(parent.lastElementChild);

    }

    results = [];
    pelimäärää = [];
    for (let i = parent.childElementCount; i < peliajcount; i++) {
        let pelijä = document.querySelector(".pelijä").cloneNode(true);
        pelijä.id = "pelijä" + i;
        document.querySelector(".pelijät").appendChild(pelijä);
        
        let btn_heittää = document.querySelector('#' + pelijä.id + ' #btn_heittää');
        btn_heittää.setAttribute('onclick', 'btn_heittää(' + i + ')');
        btn_heittää.disabled = true;
        let btn_rittää = document.querySelector('#' + pelijä.id + ' #btn_rittää');
        btn_rittää.setAttribute('onclick', 'btn_rittää(' + i + ')');
        btn_rittää.disabled = true;
        
        let pelijänimi = document.querySelector('#' + pelijä.id + ' #pelijänimi');
        pelijänimi.innerHTML = "Pelijä " + (i + 1);
        console.log(pelijänimi);
        
    }
    for (let i = 0; i < peliajcount; i++) {
        results.push(0);
        pelimäärää.push(0);


        let pelimäärääelement = document.querySelector('#pelijä' + i + ' #pelimäärää');
        pelimäärääelement.innerHTML = "pelien määrää: ";
        let pelijänimi = document.querySelector('#pelijä' + i + ' #peliresult');
        pelijänimi.innerHTML = "result: ";

    }
    

}

function peliisgoing() {
    let timePassed = Date.now() - timestarted;



    if (rotateY >= goalrotateY && rotateX >= goalrotateX) {
        pelimäärää[activeplayerid] += 1;
        if (currentresult > 1) {
            results[activeplayerid] += currentresult;

            let btn_heittää = document.querySelector('#pelijä' + activeplayerid + ' #btn_heittää');
            btn_heittää.disabled = false;

        }
        else {
            results[activeplayerid] = 0;
            btn_rittää(activeplayerid);
        }
        let pelimäärääelement = document.querySelector('#pelijä' + activeplayerid + ' #pelimäärää');
        pelimäärääelement.innerHTML = "pelien määrää: " + pelimäärää[activeplayerid];
        let pelijänimi = document.querySelector('#pelijä' + activeplayerid + ' #peliresult');
        pelijänimi.innerHTML = "result: " + results[activeplayerid];


        clearInterval(timer);
        return;
    }

    document.querySelector('.cube').style.transform =
        'rotateY(' + rotateY + 'deg)' +
        'rotateX(' + rotateX + 'deg)';

    rotateX += rotateX_const;
    rotateY += rotateY_const;

}