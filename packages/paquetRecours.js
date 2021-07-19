const fs = require('fs');


//une fonction qui permet d'introduire un nouveau recours
const introduirerecours = (req, res)=>{
    fs.readFile('./datafiles/recours.json', (err, recoursdata)=>{  //lire le fichier et stocker son contenu dans la variable recoursdata
        if(err) throw err;     //en cas d'erreur d'ouverture de fichier
        var recours = JSON.parse(recoursdata);     //analyse la chaîne de caractères JSON (recoursdata) et          
                                                       //construit la valeur JavaScript ou l'objet décrit par cette chaîne (recours)
        let recoursobj = {  //creer un objet qui contiendra les informations de recours introduit dans le formulaire 
         matricule : req.body.matriculeinput,
         NumDossier : req.body.numerodudossier,
         NomPrenom : req.body.nomprenominput,
         DateReception: req.body.datereceptioninput,
         Heureactuelledossier: req.body.Heureactuelledossierinput,
         NumDossierRecours : req.body.NumDossierRecours,
         AccuseReception : req.body.AccuseReceptioninput,
         RecoursValid: false

         
      };
      recours.push(recoursobj); //ajouter cet objet a la variable recours
      const newdata = JSON.stringify(recours);  //pour convertir une valeur JavaScript en chaîne JSON
      fs.writeFile('./datafiles/recours.json', newdata, (err)=>{  //reecrire la variable 'recours' dans le fichier des recours
          if(err) throw err;
          console.log('successfully wrote file');
      });
      res.redirect("/introduirerecours"); //redirection vers la page 'introduirerecours'
    
    });
     
  }
