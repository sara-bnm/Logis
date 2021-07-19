const fs = require('fs');   //pour manipuler les fichiers (lire, ecrire)
const fctsdeclassement = require('./paquetClassement');

//une fonction qui permet d'introduire un nouveau demandeur
const ajouterdemandeur = (req, res)=>{
    fs.readFile('./datafiles/demandeurs.json', (err, demandeurdata)=>{  //lire le fichier et stocker son contenu dans la variable demandeurdata
        if(err) throw err;     //en cas d'erreur d'ouverture de fichier
        var demandeur = JSON.parse(demandeurdata);     //analyse la chaîne de caractères JSON (demandeurdata) et          
                                                       //construit la valeur JavaScript ou l'objet décrit par cette chaîne (user)*/
        let demandeurobj = {  //creer un objet qui contiendra les informations du damandeur introduit dans le formulaire 
          matricule : req.body.matricule,
          NumDossier : req.body.numerodudossier,
          NomPrenomF : req.body.nomprenom,
          NomPrenomA : req.body.nomprenoma,
          DateNaissance : req.body.datedenaissance,
          HommeInput : req.body.homme,
          FemmeInput : req.body.femme,
          CommuneNaissance : req.body.communedenaissance,
          willaya : req.body.willaya,
          adresse : req.body.adresse,
          NumeroTel : req.body.numerodetele,
          CodePostale : req.body.codepostale,
          email : req.body.email,
          PrenomPere : req.body.prenomdupere,
          NbrEnfants : req.body.nombredenfant,
          SituationFamiliale : req.body.situationfamiliale,
          NomMere : req.body.nomdemere,
          PrenomMere : req.body.prenomdemere,
          etablissement : req.body.etablissement,
          DirectionService : req.body.directionservice,
          DateInstallation : req.body.datedinstallation,
          DernierGrade : req.body.derniergrade,
          HorsSecteur : req.body.oui,
          HorsSecteurr : req.body.non,
          prive : req.body.prive,
          etatique : req.body.etatique,
          DateDebut : req.body.datedebut,
          DateFin : req.body.datefin,
          responsabilite : req.body.responsabilite,
         FilsDeMoudjahid : req.body.ouif,
         FilsDeMoudjahidd : req.body.nonf,
         valid: false

         
      };
      demandeur.push(demandeurobj); //ajouter cet objet a la variable demandeur
      const newdata = JSON.stringify(demandeur);  //pour convertir une valeur JavaScript en chaîne JSON
      fs.writeFile('./datafiles/demandeurs.json', newdata, (err)=>{  //reecrire la variable 'demandeur' dans le fichier des utilisateurs
          if(err) throw err;
          console.log('successfully wrote file');
      });
      res.redirect("/introduiredemandeur"); //redirection vers la page 'ajouterdemandeur'
    
    });
     
  }


  //fonction pour valider un demandeur : modifier les informations d'un demandeur en cas de faute de saisie ou bien tout simplement les confirmer 
  const validerdemandeur = (req, res)=>{
    
    fs.readFile('./datafiles/demandeurs.json', (err, demandeurdata)=>{ //lire le fichier et stocker son contenu dans demandeurdata
        if(err) throw err;  //en cas d'erreur d'ouverture de fichier
        var demandeur = JSON.parse(demandeurdata); 
        let demandeurobj = {  //creer un objet qui contiendra les informations saisies dans le formulaire de 'valider demandeur'
          matricule : req.body.matricule,
          NumDossier : req.body.numerodudossier,
          NomPrenomF : req.body.nomprenom,
          NomPrenomA : req.body.nomprenoma,
          DateNaissance : req.body.datedenaissance,
          HommeInput : req.body.homme,
          FemmeInput : req.body.femme,
          CommuneNaissance : req.body.communedenaissance,
          willaya : req.body.willaya,
          adresse : req.body.adresse,
          NumeroTel : req.body.numerodetele,
          CodePostale : req.body.codepostale,
          email : req.body.email,
          PrenomPere : req.body.prenomdupere,
          NbrEnfants : req.body.nombredenfant,
          SituationFamiliale : req.body.situationfamiliale,
          NomMere : req.body.nomdemere,
          PrenomMere : req.body.prenomdemere,
          etablissement : req.body.etablissement,
          DirectionService : req.body.directionservice,
          DateInstallation : req.body.datedinstallation,
          DernierGrade : req.body.derniergrade,
          HorsSecteur : req.body.oui,
          HorsSecteurr : req.body.non,
          prive : req.body.prive,
          etatique : req.body.etatique,
          DateDebut : req.body.datedebut,
          DateFin : req.body.datefin,
          responsabilite : req.body.responsabilite,
         FilsDeMoudjahid : req.body.ouif,
         FilsDeMoudjahidd : req.body.nonf,
         valid: true
      }
    
      let newarray = demandeur.filter(obj => {     //recuperer tous les objets du fichier des demandeurs sauf l'objet qui correspond au matricule saisi
        return obj.matricule !== demandeurobj.matricule;
      });
        newarray.push(demandeurobj);     //on ajoute cet objet a la variable newarray qui contient tous les autres objets des demandeurs
        const newdata = JSON.stringify(newarray);
        fs.writeFile('./datafiles/demandeurs.json', newdata, (err)=>{  //reecrire cet variable dans le fichier des demandeurs
          if(err) throw err;
          console.log('successfully wrote file');
      });
/*
      let pers = {
        nomprenom : req.body.nomprenom,
        matricule : req.body.matricule,
        numdoss : req.body.numerodudossier,
        score : 0
      }*/
      fctsdeclassement.ajouterDemandeurValid(demandeurobj);
     
      res.redirect('/listedemandeurs'); //redirection vers la page 'listedemandeurs'
      
    });
  }



  
  module.exports = {
    ajouterdemandeur,
    validerdemandeur,
  }
  