const fs = require('fs');


//fonction consulter/valider
const ConsulterValider = (req, res)=>{
     
    let x ;
    let y ;
    x = req.body.matricule;
    y= req.body.submission;

   let dem = JSON.parse(fs.readFileSync('./datafiles/demandeurs.json', 'utf8')); 
   let i;
   i = rechercherDemandeur(x,dem);
   console.log(i);
   let g = dem[i];
   
     switch (y) {
         case "Consulter":
            
           res.render('consulterdemandeur',{g});
             break;
        case "Valider":
        res.render('validerdemandeur',{g});      
       
                 break;   
     
         default:
             res.send(`error`);
             break;
     }
}


//fonction rechercher demandeur
function rechercherDemandeur (x,dem) {
    let y;
    y = 99;
   
    for (let index = 0; index < dem.length; index++) {
      if (x == (dem[index].matricule)) {
        y = index; 
        break;
      }
    }
  
    return y;
  }



  
    function pointsSituationFamiliale(personne) {
      let pts =0;
      if ((personne.SituationFamiliale) == "célibataire") {
          let age = new Date().getFullYear();
          age -= parseInt((personne.DateNaissance).substr(0,4));
          console.log(age);
          age = 36;
         if ((25<= age) && (age < 30)) {
             pts = 1;
         }else{
             if ((30<= age) && (age < 25)) {
                 pts = 2;
             }else{pts = 3;}
         }
      }else{
          if ((personne.NbrEnfants) < 5) {
              pts = (personne.NbrEnfants) * 2 + 4;
          } else {
              pts = 14;
          }
          }
      
      return pts;
  }

  function pointsGrade(personne) {
      let a = personne.DernierGrade; 
      let pts =0;
      if ((1<= a) && (a <=4)){
          pts = 1;
      }else{
          if ((5<= a) && (a <=9)) {
              pts = 2;
          }else{
              if ((10<= a) && (a <=11)) {
                  pts = 3;
              }else{
                  if ((12<= a) && (a <=15)) {
                      pts = 4;
                  } else {
                      pts = 5
                  }
              }
          }
      }

      return pts;
  }

  function pointsAncient(personne) {
      let pts =0;
      let a = new Date().getFullYear();
      a -= parseInt((personne.DateInstallation).substr(0,4));
      if (a < 5) {
          pts = a * 3;
      } else {
          pts = 30;
      }
      return pts;
  }

  function pointsConjointMESRS(personne) {
      let pts=0;
      if (personne.conjointMESRS) {
          pts = 2;
      } 
      return pts;
  }
  function pointsGuerre(personne) {
      let pts=0;
      if (personne.FilsDeMoujahid) {
          pts = 6;
      } 
      return pts;
  }

  function pointsTotal(p) {
      let total =0;
      total+= pointsGrade(p);
      total+= pointsSituationFamiliale(p);
      total+= pointsAncient(p);
     // total+= pointsConjointMESRS(p);
     // total+= pointsGuerre(p);

      return total;
  }

    //fonction ajouter demandeur vaild
    function ajouterDemandeurValid (personne) {
    
      fs.readFile('./datafiles/demandeursValides.json', (err, critdata)=>{
          if(err) throw err;
          var dems = JSON.parse(critdata);
          let pers = {
            nomprenom : personne.NomPrenomF,
            matricule : personne.matricule,
            numdoss : personne.NumDossier,
            score : pointsTotal(personne)
          }
         
          
          
        dems.push(pers);
        const newdata = JSON.stringify(dems);
        fs.writeFile('./datafiles/demandeursValides.json', newdata, (err)=>{
            if(err) throw err;
            console.log('successfully wrote file');
        });
      });
     
     
  }

  module.exports={
      ConsulterValider,
      rechercherDemandeur,
      ajouterDemandeurValid,
      pointsTotal,
  }