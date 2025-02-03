
let peliStarted = false;
let nopparotated = false;

let timer;
let timeduration = 1 * 1000;

var results;
var pelimäärää;
let activeplayerid = 0;
let tuplat=0;


let cubes = [{
    'currentresult': 0,
    'rotateY': 0,
    'rotateX': 0,
    'goalrotateY': 0,
    'goalrotateX': 0,

    'rotateY_const': 0,
    'rotateX_const': 0,
    'goalrotateY': 0,
    'goalrotateX': 0

}];
cubes.push(Object.assign({}, cubes[0]));

window.onload = function () {

    document.getElementById('btn_aloita').addEventListener("click", btn_aloita);

}

function btn_heittää(pelaajaid) {
    activeplayerid = pelaajaid;
    let btn_heittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_heittää');
    btn_heittää.disabled = true;



    if (nopparotated) {
        clearInterval(timer);

    }
    nopparotated = true;

    for (const i in cubes) {
        var cube = cubes[i];
        if (cube.rotateX > 360) {
            cube.rotateX -= 360;

        }
        if (cube.rotateY > 360) {
            cube.rotateY -= 360;
        }

        cube.currentresult = Math.floor(Math.random() * 6 + 1);
        switch (cube.currentresult) {
            case 1: {
                cube.goalrotateY = 360;
                cube.goalrotateX = 360;
                break;
            }
            case 2: {
                cube.goalrotateY = 270;
                cube.goalrotateX = 360;
                break;
            }
            case 3: {
                cube.goalrotateY = 360;
                cube.goalrotateX = 270;
                break;
            }
            case 4: {
                cube.goalrotateY = 90;
                cube.goalrotateX = 360;
                break;
            }
            case 5: {
                cube.goalrotateY = 360;
                cube.goalrotateX = 90;
                break;
            }
            case 6: {
                cube.goalrotateY = 180;
                cube.goalrotateX = 360;
                break;
            }
        }
        if ((cube.rotateX + 360) > cube.goalrotateX) {
            cube.goalrotateX += 360;
        }
        if ((cube.rotateY + 360) > cube.goalrotateY) {
            cube.goalrotateY += 360;
        }


        cube.rotateY_const = (cube.goalrotateY - cube.rotateY) / 120;
        cube.rotateX_const = (cube.goalrotateX - cube.rotateX) / 120;
    }
    timer = setInterval(peliisgoing, 20);

}
function btn_rittää(pelaajaid) {
    tuplat=0;
    activeplayerid = pelaajaid;
    let btn_heittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_heittää');
    btn_heittää.disabled = true;
    let btn_rittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_rittää');
    btn_rittää.disabled = true;
    let parent = document.querySelector('.pelaajat');

    if (pelaajaid < parent.childElementCount - 1) {
        pelaajaid += 1;
        let btn_heittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_heittää');
        btn_heittää.disabled = false;
        let btn_rittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_rittää');
        btn_rittää.disabled = false;

    }
    else {
        maxresult = Math.max.apply(null, results);
        let Voittaja = "Voittaja:";
        for (let i = 0; i < parent.childElementCount; i++) {
            if (maxresult == results[i]) {
                Voittaja += " pelaaja" + (i + 1);
            }

            let pelaajanimi = document.querySelector('#messagewinner');
            pelaajanimi.innerHTML = Voittaja;

        }


    }

}
function btn_aloita() {
    tuplat=0;
    let peliajcount = document.getElementById('pelaajacount').value;
    let parent = document.querySelector('.pelaajat');
    document.getElementById("btn_heittää").disabled = false;
    document.getElementById("btn_rittää").disabled = false;
    let pelaajanimi = document.querySelector('#messagewinner');
    pelaajanimi.innerHTML = "";

    while (parent.childElementCount > peliajcount) {
        parent.removeChild(parent.lastElementChild);

    }

    results = [];
    pelimäärää = [];
    for (let i = parent.childElementCount; i < peliajcount; i++) {
        let pelaaja = document.querySelector(".pelaaja").cloneNode(true);
        pelaaja.id = "pelaaja" + i;
        document.querySelector(".pelaajat").appendChild(pelaaja);

        let btn_heittää = document.querySelector('#' + pelaaja.id + ' #btn_heittää');
        btn_heittää.setAttribute('onclick', 'btn_heittää(' + i + ')');
        btn_heittää.disabled = true;
        let btn_rittää = document.querySelector('#' + pelaaja.id + ' #btn_rittää');
        btn_rittää.setAttribute('onclick', 'btn_rittää(' + i + ')');
        btn_rittää.disabled = true;

        let pelaajanimi = document.querySelector('#' + pelaaja.id + ' #pelaajanimi');
        pelaajanimi.innerHTML = "pelaaja " + (i + 1);

    }
    for (let i = 0; i < peliajcount; i++) {
        results.push(0);
        pelimäärää.push(0);


        let pelimäärääelement = document.querySelector('#pelaaja' + i + ' #pelimäärää');
        pelimäärääelement.innerHTML = "pelien määrää: ";
        let pelaajanimi = document.querySelector('#pelaaja' + i + ' #peliresult');
        pelaajanimi.innerHTML = "result: ";

    }


}

function peliisgoing() {

    let allcubesrotated = true;

    for (const i in cubes) {
        var cube = cubes[i];
        if (cube.rotateY >= cube.goalrotateY && cube.rotateX >= cube.goalrotateX) {
        }
        else {
            allcubesrotated = false;
        }


        document.querySelector('.cube' + i).style.transform =
            'rotateY(' + cube.rotateY + 'deg)' +
            'rotateX(' + cube.rotateX + 'deg)';

        cube.rotateX += cube.rotateX_const;
        cube.rotateY += cube.rotateY_const;


    }
    if (allcubesrotated == true) {

        var localplayerid=activeplayerid;
        var activebtn_disabled=false;
        if (tuplat==3){
            results[localplayerid] = 0;
            btn_rittää(activeplayerid);
            activebtn_disabled=true;

        }
        else if (cubes[0].currentresult == 1 && cubes[1].currentresult == 1) {
            results[localplayerid] += 25;
            tuplat+=1;
            
        }
        else if (cubes[0].currentresult == cubes[1].currentresult) {
            tuplat+=1;
            results[localplayerid] += cubes[1].currentresult * 4;
        }

        else if (cubes[0].currentresult > 1&&cubes[1].currentresult > 1) {
            results[localplayerid] += cubes[0].currentresult+cubes[1].currentresult;
            tuplat=0;
        }
        else {
            results[localplayerid] = 0;
            btn_rittää(activeplayerid);
            activebtn_disabled=true;
        }



        pelimäärää[localplayerid] += 1;
        let btn_heittää = document.querySelector('#pelaaja' + localplayerid + ' #btn_heittää');
        btn_heittää.disabled = activebtn_disabled;

        let pelimäärääelement = document.querySelector('#pelaaja' + localplayerid + ' #pelimäärää');
        pelimäärääelement.innerHTML = "pelien määrää: " + pelimäärää[localplayerid];
        let pelaajanimi = document.querySelector('#pelaaja' + localplayerid + ' #peliresult');
        pelaajanimi.innerHTML = "result: " + results[localplayerid];


        clearInterval(timer);
    }


}