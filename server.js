const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const userfcts = require('./packages/paquetUtilisateur_version1');
const fctsDemandeur = require('./packages/paquetReception_version3');
const fonctionDeClassement = require('./packages/paquetClassement');



const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.set('view engine', 'ejs');
app.use(express.static("public"));




//gestion des comptes
app.get('/gestiondescomptes', (req, res)=>{
  res.render('gestiondescomptes');
})


//ajouter un nouveau utilisateur
app.get('/ajouterutilisateur', (req,res)=>{
    res.render('ajouterutilisateur');
     });
   app.post('/ajouterutilisateur', urlencodedParser, userfcts.adduser);



// desactiver un compte utilisateur
app.get('/desactiverutilisateur', (req,res)=>{
    res.render('desactiverutilisateur');
    });
   app.post('/desactiverutilisateur', urlencodedParser, userfcts.desactiveruser);



// introduire un nouveau demandeur
app.get('/introduiredemandeur', (req,res)=>{
  res.render('introduiredemandeur');
  });
 app.post('/introduiredemandeur', urlencodedParser, fctsDemandeur.ajouterdemandeur);





//fiche de renseignements
app.get('/ficherenseignements', (req,res)=>{
  res.render('ficherenseignements');
})

//mon profile 
app.get('/monprofile', (req,res)=>{
  res.render('monprofile');
})

//aide
app.get('/aide', (req,res)=>{
  res.render('aide');
})

//home
app.get('/home', (req,res)=>{
  res.render('home');
})

//introduire accuse
app.get('/introduireaccuse', (req,res)=>{
  res.render('introduireaccuse');
})

//liste des accuses
app.get('/listeaccuses', (req,res)=>{
  res.render('listeaccuses');
})

//consulter classement 
/*
app.get('/consulterclassement', (req,res)=>{
  res.render('consulterclassement');
})*/

//introduire recours
app.get('/iontroduirerecours', (req,res)=>{
  res.render('introduirerecours');
})

//consulter historique
app.get('/consulterhistorique', (req,res)=>{
  res.render('consulterhistorique');
})

//gerer compte
app.get('/gerercompte', (req,res)=>{
  res.render('gerercompte');
})

//accueil 
app.get('/accueil', (req,res)=>{
  res.render('accueil');
})

app.get('/', (req,res)=>{
  res.redirect('/accueil');
})

//consulter un demandeur
app.get('/consulterdemandeur', (req,res)=>{
  });
  app.post('/consulterdemandeur',urlencodedParser);
  

  //Valider un demandeur
  app.get('/validerdemandeur', (req,res)=>{
  });
  app.post('/validerdemandeur',urlencodedParser,fctsDemandeur.validerdemandeur);


  //classement initial
  app.get('/consulterclassement', (req,res)=>{
    const table = JSON.parse(fs.readFileSync('./datafiles/demandeursValides.json', 'utf8'));
      let y;
      y =`<head>
      <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS for styling and layout-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  
    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  
    <script src="https://kit.fontawesome.com/e25aabb098.js" crossorigin="anonymous"></script>
    <script defer src="theme.js"></script>
  
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap" rel="stylesheet" />
  
    <title>Classement Initiale</title>
     
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
  </head>
  <style>
  * {
    box-sizing: border-box;
  }
  
  #myInput {
    background-image: url('/css/searchicon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    width: 100%;
    font-size: 16px;
    padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
  }
  
  #myTable {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
    font-size: 18px;
  }
  
  #myTable th, #myTable td {
    text-align: left;
    padding: 12px;
  }
  
  #myTable tr {
    border-bottom: 1px solid #ddd;
  }
  
  #myTable tr.header, #myTable tr:hover {
    background-color: #f1f1f1;
  }
  
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #1f2833;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 80px;
  }
  
  .sidenav::-webkit-scrollbar {
    width: 0.25rem;
  }
  
  .sidenav::-webkit-scrollbar-track {
    background: #1e1e24;
  }
  
  .sidenav::-webkit-scrollbar-thumb {
    background: #44e0b3;
  }
  
  .tasklink{
    padding: 1rem 1rem 1rem 1rem;
    text-decoration: none;
    font-size: 1.1rem;
    color: #818181;
    display: block;
    transition: 0.3s;
    text-align: left;
  }
  
  .tasklink:hover {
    color: #1f2833;
    background-color: #7fffd4;
    text-decoration: none;
  }
  
  .butlink{
    padding: 6px 6px 6px 32px;
    text-decoration: none;
    font-size: 1.1rem;
    color: white;
    display: block;
    transition: 0.3s;
    text-align: left;
  }
  
  .butlink:hover {
    color: white;
    text-decoration: none;
  }
  
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }
  
  #main {
    transition: margin-left .5s;
    padding: 0px;
  }
  
  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }
  
  body::-webkit-scrollbar {
    width: 0.25rem;
  }
  
  body::-webkit-scrollbar-track {
    background: #1e1e24;
  }
  
  body::-webkit-scrollbar-thumb {
    background: #44e0b3;
  }
  
  html {
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
  .chip {
    display: inline-block;
    padding: 0 25px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    border-radius: 1rem;
    background-color: #1f2833;
  }
  .about-section {
    padding: 50px;
    text-align: center;
    background-color: #1f2833;
    color: white;
  }
  
  .chip img {
    float: left;
    margin: 0 10px 0 -25px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  .active {
    color: #44e0b3;
    font-size: 36px;
    background-color: #1f2833;
    border-radius: 50%;
  }
  
  .icon {
    color: white;
    font-size: 36px;
    background-color: #1f2833;
    border-radius: 50%;
  }
  .btn {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  </style>
  <script src="https://www.kryogenix.org/code/browser/sorttable/sorttable.js"></script> 
  <body style="background-color: #f1f1f1;">
    <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn butlink" onclick="closeNav()">&times;</a>
    <a class="tasklink" href="introduireaccuse">Introuduire Les Accusés De Receptions</a>
    <a class="tasklink"  href="introduiredemandeur">Introuduire Les Demandeurs</a>
    <a class="tasklink" href="listedemandeurs">Valider Les Demandeurs</a>
    <a class="tasklink" href="consulterclassement">Consulter Le Classement Des Demandeurs</a>
    <a class="tasklink" href="#">Statistique</a>
    <a class="tasklink" href="introduirercours">Introuduire Les Recours</a>
    <a class="tasklink" href="consulterhistorique">Consulter L'Historique</a>  
    <a class="tasklink" href="#">Chaine PV</a>
    <a class="tasklink" href="gestiondescomptes">Gerer Les Comptes</a>
    </div>
    <div id="main">
      <div class="container-fluid bg-white border">
          <div class="row">
              <div class="col"><img class="img-fluid" width="70" height="70" src="log0.png"></div>
              <div class="col"><br><h3 id="navbar_logo" class="text-right">LOGIS</h3></div>
          </div>
          <br>
      </div>
      <br>
      <div class="container-fluid " style="border-radius: 0.5rem; background-color: #f1f1f1;">
        <div class="row">
          <div class="col-sm-1"><span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span></div>
          <div class="col-sm-8">
            <a href="accueil" data-toggle="tooltip" data-placement="left" title="Accueil"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-home icon "></i></button></a>
            <a href="#" data-toggle="tooltip" data-placement="top" title="Mon Profile"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-user icon"></i></button></a>
            <a href="#" data-placement="top" title="Aide"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="far fa-question-circle icon"></i></button></a>
            <a href="#" data-placement="right" title="Deconnexion"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-sign-out-alt icon"></i></button></a>
          </div>
          <div class="col-sm-2">
            <div class="chip " style="float: right; color: white; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);" >
              <img src="person.png" class="rounded-circle" alt="Person" width="96" height="96">
            </div>
          </div> 
        </div>
      </div>
      <div class="container-xl mt-3 bg-white border" style="border-radius: 0.5rem;">
          <br>
          <div class="about-section">
            <h1>Classement Initial</h1>
          </div>
          <br>
          <div class="row">
              <input type="text" id="myInput" onkeyup="myFunction()" placeholder="rechercher par matricule" title="Type in a name" style="width: 60%; margin-left: 7%; background-color: #f1f1f1;">
          </div>
          <table id="myTable" class="sortable">
              <tr class="header">
                <th style="width:3%;">N#</th>
                <th style="width:30%;">Nom et Prénom</th>
                <th style="width:20%;">Matricule</th>
                <th style="width:20%;">Numéro du Dossier</th>
                <th style="width:15%;">Points </th>
                <th style="width:6%;"></th>
                <th style="width:6%;"></th>
              </tr>`;
      let x=0;
      table.forEach(element => {
        x++;
       
        y+=` <tr>
      <td>${x}</td>
      <td>${(element.nomprenom)}</td>
      <td>${element.matricule}</td>
      <td>${element.numdoss}</td>
      <td>${element.score}</td>
      <td></td>
      <td></td>
      </tr>`
      });
      y+=` </table>
      <br>
  </div>
  <br>
  <div class="container-xl mt-3 bg-white border" style="border-radius: 0.5rem;">
      <br>
      <div class="row">
         <div class="col-sm-8 ">
              <div class="col"><a href="#"><strong> Contacter Nous </strong></a></div>
          </div>
          <div class="col"><img class="img-fluid float-right" width="170" height="100" src="800px-ESI_Logo.png"></div> 
      </div>
  </div>
  <br>
  
  <script>
            $(document).ready(function(){
              $('[data-toggle="tooltip"]').tooltip();   
            });
          </script>
          <script>
            function openNav() {
              document.getElementById("mySidenav").style.width = "250px";
              document.getElementById("main").style.marginLeft = "250px";
            }
            
            function closeNav() {
              document.getElementById("mySidenav").style.width = "0";
              document.getElementById("main").style.marginLeft= "0";
            }
            </script>
          <script>
              function myFunction() {
                var input, filter, table, tr, td, i, txtValue;
                input = document.getElementById("myInput");
                filter = input.value.toUpperCase();
                table = document.getElementById("myTable");
                tr = table.getElementsByTagName("tr");
                for (i = 0; i < tr.length; i++) {
                  td = tr[i].getElementsByTagName("td")[2];
                  if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                      tr[i].style.display = "";
                    } else {
                      tr[i].style.display = "none";
                    }
                  }       
                }
              }
          </script>
  
  
  </body>`;
    
    res.send(y);
    });
    app.post('/consulterclassement',urlencodedParser);
  
  

//liste des demandeurs
app.get('/listedemandeurs', (req,res)=>{
    const table = JSON.parse(fs.readFileSync('./datafiles/demandeurs.json', 'utf8'));
    let y;
    y =`<head>
    <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <!-- Bootstrap CSS for styling and layout-->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  
  <!-- jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <!-- Popper JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

  <!-- Latest compiled JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

  <script src="https://kit.fontawesome.com/e25aabb098.js" crossorigin="anonymous"></script>
  <script defer src="theme.js"></script>

  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap" rel="stylesheet" />

  <title>Validation Des Demandeurs</title>
   
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
</head>
<style>
* {
  box-sizing: border-box;
}

#myInput {
  background-image: url('/css/searchicon.png');
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 100%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}

#myTable {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  font-size: 18px;
}

#myTable th, #myTable td {
  text-align: left;
  padding: 12px;
}

#myTable tr {
  border-bottom: 1px solid #ddd;
}

#myTable tr.header, #myTable tr:hover {
  background-color: #f1f1f1;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #1f2833;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 80px;
}

.sidenav::-webkit-scrollbar {
  width: 0.25rem;
}

.sidenav::-webkit-scrollbar-track {
  background: #1e1e24;
}

.sidenav::-webkit-scrollbar-thumb {
  background: #44e0b3;
}

.tasklink{
  padding: 1rem 1rem 1rem 1rem;
  text-decoration: none;
  font-size: 1.1rem;
  color: #818181;
  display: block;
  transition: 0.3s;
  text-align: left;
}

.tasklink:hover {
  color: #1f2833;
  background-color: #7fffd4;
  text-decoration: none;
}

.butlink{
  padding: 6px 6px 6px 32px;
  text-decoration: none;
  font-size: 1.1rem;
  color: white;
  display: block;
  transition: 0.3s;
  text-align: left;
}

.butlink:hover {
  color: white;
  text-decoration: none;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left .5s;
  padding: 0px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

body::-webkit-scrollbar {
  width: 0.25rem;
}

body::-webkit-scrollbar-track {
  background: #1e1e24;
}

body::-webkit-scrollbar-thumb {
  background: #44e0b3;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}
.chip {
  display: inline-block;
  padding: 0 25px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-radius: 1rem;
  background-color: #1f2833;
}
.about-section {
  padding: 50px;
  text-align: center;
  background-color: #1f2833;
  color: white;
}

.chip img {
  float: left;
  margin: 0 10px 0 -25px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.active {
  color: #44e0b3;
  font-size: 36px;
  background-color: #1f2833;
  border-radius: 50%;
}

.icon {
  color: white;
  font-size: 36px;
  background-color: #1f2833;
  border-radius: 50%;
}
.btn {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
<body style="background-color: #f1f1f1;">
  <div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn butlink" onclick="closeNav()">&times;</a>
  <a class="tasklink" href="introduireaccuse">Introuduire Les Accusés De Receptions</a>
  <a class="tasklink"  href="introduiredemandeur">Introuduire Les Demandeurs</a>
  <a class="tasklink" href="listedemandeurs">Valider Les Demandeurs</a>
  <a class="tasklink" href="consulterclassement">Consulter Le Classement Des Demandeurs</a>
  <a class="tasklink" href="#">Statistique</a>
  <a class="tasklink" href="introduirerecours>Introuduire Les Recours</a>
  <a class="tasklink" href="consulterhistorique">Consulter L'Historique</a>  
  <a class="tasklink" href="#">Chaine PV</a>
  <a class="tasklink" href="gerercompte">Gerer Les Comptes</a>
  </div>
  <div id="main">
    <div class="container-fluid bg-white border">
        <div class="row">
            <div class="col"><img class="img-fluid" width="70" height="70" src="log0.png"></div>
            <div class="col"><br><h3 id="navbar_logo" class="text-right">LOGIS</h3></div>
        </div>
        <br>
    </div>
    <br>
    <div class="container-fluid " style="border-radius: 0.5rem; background-color: #f1f1f1;">
      <div class="row">
        <div class="col-sm-1"><span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span></div>
        <div class="col-sm-8">
          <a href="accueil" data-toggle="tooltip" data-placement="left" title="Accueil"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-home icon "></i></button></a>
          <a href="monprofile" data-toggle="tooltip" data-placement="top" title="Mon Profile"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-user icon"></i></button></a>
          <a href="aide" data-toggle="tooltip" data-placement="top" title="Aide"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="far fa-question-circle icon"></i></button></a>
          <a href="home" data-toggle="tooltip" data-placement="right" title="Deconnexion"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-sign-out-alt icon"></i></button></a>
        </div>
        <div class="col-sm-2">
          <div class="chip " style="float: right; color: white; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);" >
            <img src="person.png" class="rounded-circle" alt="Person" width="96" height="96">Nom  Prénom
          </div>
        </div> 
      </div>
    </div>
    <div class="container-xl mt-3 bg-white border" style="border-radius: 0.5rem;">
        <br>
        <div class="about-section">
          <h1>La Liste des Demandeurs</h1>
        </div>
        <br>
        <div class="row">
            <input type="text" id="myInput" onkeyup="myFunction()" placeholder="rechercher nom et prenom" title="Type in a name" style="width: 60%; margin-left: 7%; background-color: #f1f1f1;">
        </div>
        <table id="myTable">
            <tr class="header">
              <th style="width:3%;">N#</th>
              <th style="width:30%;">Nom et Prénom</th>
              <th style="width:20%;">Matricule</th>
              <th style="width:20%;">Numéro du Dossier</th>
              <th style="width:15%;">Etat de validation </th>
              <th style="width:6%;"></th>
              <th style="width:6%;"></th>
            </tr>`;
    let x=0;
    table.forEach(element => {
      x++;
      let validation;
      if (element.valid) {
        validation = 'Validé';
      } else {
        validation = 'Non-validé';
      }
      y+=` <tr>
      <form action="/listedemandeurs" method="POST">
    
    
    
      <td>${x}</td>
    <td>${(element.NomPrenomF)}</td>
    <td><input type="text" name="matricule" id="matricule" value="${element.matricule}" style="border-width : 0; background-color : transparent;" readonly></td>
    <td>${element.NumDossier}</td>
    <td>${validation}</td>`


    if (!(element.valid)) {
        y+=`
        <td>
        <input type="submit" value="Valider" name="submission" id="submission" class="btn float-right" style="background-color: #44e0b3; border-radius: 0.5rem; height: 50px; color: white;"><a href="" style="color: white; outline: none;">
        </td>`
      }
      else{y+=`<td></td>`}

    y+= `<td>
      <input type="submit" value="Consulter" name="submission" id="submission" class="btn float-right" style="background-color: #44e0b3; border-radius: 0.5rem; height: 50px; color: white;"><a href="" style="color: white; outline: none;">
    </td>
   
   </form>
    </tr>`;
    
    });
    y+=` </table>
    <br>
</div>
<br>
<div class="container-xl mt-3 bg-white border" style="border-radius: 0.5rem;">
    <br>
    <div class="row">
       <div class="col-sm-8 ">
            <div class="col"><a href="#"><strong> Contacter Nous </strong></a></div>
        </div>
        <div class="col"><img class="img-fluid float-right" width="170" height="100" src="800px-ESI_Logo.png"></div> 
    </div>
</div>
<br>

<script>
          $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();   
          });
        </script>
        <script>
          function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
          }
          
          function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
          }
          </script>
        <script>
            function myFunction() {
              var input, filter, table, tr, td, i, txtValue;
              input = document.getElementById("myInput");
              filter = input.value.toUpperCase();
              table = document.getElementById("myTable");
              tr = table.getElementsByTagName("tr");
              for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                  txtValue = td.textContent || td.innerText;
                  if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                  } else {
                    tr[i].style.display = "none";
                  }
                }       
              }
            }
        </script>


</body>`;
    

  res.send(y);
  
});
app.post('/listedemandeurs',urlencodedParser,fonctionDeClassement.ConsulterValider);


//liste des utilisateurs
app.get('/listeutilisateurs', (req,res)=>{
  const table = JSON.parse(fs.readFileSync('./datafiles/users.json', 'utf8'));
  let y;
  y =`<head>
  <!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<!-- Bootstrap CSS for styling and layout-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<script src="https://kit.fontawesome.com/e25aabb098.js" crossorigin="anonymous"></script>
<script defer src="theme.js"></script>

<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap" rel="stylesheet" />

<title>Liste des Utilisateurs</title>
 
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
</head>
<style>
* {
box-sizing: border-box;
}

#myInput {
background-image: url('/css/searchicon.png');
background-position: 10px 10px;
background-repeat: no-repeat;
width: 100%;
font-size: 16px;
padding: 12px 20px 12px 40px;
border: 1px solid #ddd;
margin-bottom: 12px;
}

#myTable {
border-collapse: collapse;
width: 100%;
border: 1px solid #ddd;
font-size: 18px;
}

#myTable th, #myTable td {
text-align: left;
padding: 12px;
}

#myTable tr {
border-bottom: 1px solid #ddd;
}

#myTable tr.header, #myTable tr:hover {
background-color: #f1f1f1;
}

.sidenav {
height: 100%;
width: 0;
position: fixed;
z-index: 1;
top: 0;
left: 0;
background-color: #1f2833;
overflow-x: hidden;
transition: 0.5s;
padding-top: 80px;
}

.sidenav::-webkit-scrollbar {
width: 0.25rem;
}

.sidenav::-webkit-scrollbar-track {
background: #1e1e24;
}

.sidenav::-webkit-scrollbar-thumb {
background: #44e0b3;
}

.tasklink{
padding: 1rem 1rem 1rem 1rem;
text-decoration: none;
font-size: 1.1rem;
color: #818181;
display: block;
transition: 0.3s;
text-align: left;
}

.tasklink:hover {
color: #1f2833;
background-color: #7fffd4;
text-decoration: none;
}

.butlink{
padding: 6px 6px 6px 32px;
text-decoration: none;
font-size: 1.1rem;
color: white;
display: block;
transition: 0.3s;
text-align: left;
}

.butlink:hover {
color: white;
text-decoration: none;
}

.sidenav .closebtn {
position: absolute;
top: 0;
right: 25px;
font-size: 36px;
margin-left: 50px;
}

#main {
transition: margin-left .5s;
padding: 0px;
}

@media screen and (max-height: 450px) {
.sidenav {padding-top: 15px;}
.sidenav a {font-size: 18px;}
}

body::-webkit-scrollbar {
width: 0.25rem;
}

body::-webkit-scrollbar-track {
background: #1e1e24;
}

body::-webkit-scrollbar-thumb {
background: #44e0b3;
}

html {
box-sizing: border-box;
}

*, *:before, *:after {
box-sizing: inherit;
}
.chip {
display: inline-block;
padding: 0 25px;
height: 50px;
font-size: 16px;
line-height: 50px;
border-radius: 1rem;
background-color: #1f2833;
}
.about-section {
padding: 50px;
text-align: center;
background-color: #1f2833;
color: white;
}

.chip img {
float: left;
margin: 0 10px 0 -25px;
height: 50px;
width: 50px;
border-radius: 50%;
}
.active {
color: #44e0b3;
font-size: 36px;
background-color: #1f2833;
border-radius: 50%;
}

.icon {
color: white;
font-size: 36px;
background-color: #1f2833;
border-radius: 50%;
}
.btn {
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
<script src="https://www.kryogenix.org/code/browser/sorttable/sorttable.js"></script> 
<body style="background-color: #f1f1f1;">
<div id="mySidenav" class="sidenav">
<a href="javascript:void(0)" class="closebtn butlink" onclick="closeNav()">&times;</a>
<a class="tasklink" href="introduireaccuse">Introuduire Les Accusés De Receptions</a>
<a class="tasklink"  href="introduiredemandeur">Introuduire Les Demandeurs</a>
<a class="tasklink" href="listedemandeurs">Valider Les Demandeurs</a>
<a class="tasklink" href="consulterclassement">Consulter Le Classement Des Demandeurs</a>
<a class="tasklink" href="#">Statistique</a>
<a class="tasklink" href="introduirerecours">Introuduire Les Recours</a>
<a class="tasklink" href="consulterhistorique">Consulter L'Historique</a>  
<a class="tasklink" href="#">Chaine PV</a>
<a class="tasklink" href="gestiondescomptes">Gerer Les Comptes</a>
</div>
<div id="main">
  <div class="container-fluid bg-white border">
      <div class="row">
          <div class="col"><img class="img-fluid" width="70" height="70" src="log0.png"></div>
          <div class="col"><br><h3 id="navbar_logo" class="text-right">LOGIS</h3></div>
      </div>
      <br>
  </div>
  <br>
  <div class="container-fluid " style="border-radius: 0.5rem; background-color: #f1f1f1;">
    <div class="row">
      <div class="col-sm-1"><span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span></div>
      <div class="col-sm-8">
        <a href="accueil" data-toggle="tooltip" data-placement="left" title="Accueil"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-home icon "></i></button></a>
        <a href="consulterprofile" data-toggle="tooltip" data-placement="top" title="Mon Profile"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-user icon"></i></button></a>
        <a href="aide" data-toggle="tooltip" data-placement="top" title="Aide"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="far fa-question-circle icon"></i></button></a>
        <a href="home" data-toggle="tooltip" data-placement="right" title="Deconnexion"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-sign-out-alt icon"></i></button></a>
        <a href="gestiondescomptes" data-toggle="tooltip" data-placement="right" title="Retour"><button type="button" class="btn" style="background-color: #1f2833; border-radius: 50%; width: 60px; height: 60px;"><i class="fas fa-undo-alt icon"></i></button></a>
      </div>
      <div class="col-sm-2">
        <div class="chip " style="float: right; color: white; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);" >
          <img src="person.png" class="rounded-circle" alt="Person" width="96" height="96">Nom  Prénom
        </div>
      </div> 
    </div>
  </div>
  <div class="container-xl mt-3 bg-white border" style="border-radius: 0.5rem;">
      <br>
      <div class="about-section">
        <h1>Liste des utilisateurs</h1>
      </div>
      <br>
      <div class="col-sm-12">
      <div class="row">
    <div class="col-sm-4">
      <a href="ajouterutilisateur" style="color: white; outline: none;"><button type="button" class="btn float-left" style="background-color: #44e0b3; border-radius: 0.5rem; height: 50px; color: white;">Introduire Un Nouveau Utilisateur </button></a>
    </div>
    <div class="col-sm-4">
      <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Rechercher un utilisateur par son nom" title="Type in a name" style="width: 100%; margin-left: 5%; background-color: #f1f1f1;">
    </div>
    <div class="col-sm-4">
      <a href="desactiverutilisateur" style="color: white; outline: none;"><button type="button" class="btn float-right" style="background-color: #44e0b3; border-radius: 0.5rem; height: 50px; color: white;">Desactiver Un Compte D'Utilisateur </button></a>
    </div>
      </div>
    </div>
    <table id="myTable">
        <tr class="header">
          <th style="width:3%;">N#</th>
          <th style="width:15%;">Nom</th>
          <th style="width:15%;">Prénom</th>
          <th style="width:15%;">Role</th>
          <th style="width:20%;">Email</th>
          <th style="width:12%;">Nom d'utilisateur</th>
          <th style="width:20%;">Numéro de Téléphone</th>
          <th></th>
          <th></th>
          
        </tr>` 
        let x=0;
  table.forEach(element => {
    x++;
   
    y+=` <tr>
  <td>${x}</td>
  <td>${(element.nom)}</td>
  <td>${(element.prenom)}</td>
  <td>${element.role}</td>
  <td>${element.email}</td>
  <td>${element.username}</td>
  <td>${element.tel}</td>
  <td></td>
  <td></td>
  </tr>`
  });
  y+=` </table>
  <br>
</div>
<br>
<div class="container-xl mt-3 bg-white border" style="border-radius: 0.5rem;">
  <br>
  <div class="row">
     <div class="col-sm-8 ">
          <div class="col"><a href="#"><strong> Contacter Nous </strong></a></div>
      </div>
      <div class="col"><img class="img-fluid float-right" width="170" height="100" src="800px-ESI_Logo.png"></div> 
  </div>
</div>
<br>

<script>
        $(document).ready(function(){
          $('[data-toggle="tooltip"]').tooltip();   
        });
      </script>
      <script>
        function openNav() {
          document.getElementById("mySidenav").style.width = "250px";
          document.getElementById("main").style.marginLeft = "250px";
        }
        
        function closeNav() {
          document.getElementById("mySidenav").style.width = "0";
          document.getElementById("main").style.marginLeft= "0";
        }
        </script>
      <script>
          function myFunction() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[2];
              if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }       
            }
          }
      </script>


</body>`

  res.send(y);
  });
  app.post('/listeutilisateurs',urlencodedParser);




app.listen(3000);
console.log('listening to port 3000 ....');



