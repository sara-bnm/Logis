
const fs = require('fs');                //pour manipuler les fichiers (lire, ecrire)
const { v4: uuidv4 } = require('uuid');  //pour generer un ID sans duplication
const bcrypt = require('bcrypt');       //pour crypter le mot de passe

//une fonction qui permet d'introduire un nouveau utilisateur dans l'application
const adduser = (req, res)=>{
  let x;
    
  fs.readFile('./datafiles/users.json', (err, userdata)=>{ //lire le fichier et stocker son contenu dans userdata
      if(err) throw err; //en cas d'erreur d'ouverture de fichier
      var user = JSON.parse(userdata); //analyse la chaîne de caractères JSON (userdata) et construit la valeur JavaScript ou l'objet décrit par cette chaîne (user)
      let userobj = {  //creer un objet qui contiendra les informations saisies dans le formulaire (front)
       userid : uuidv4(), //pour generer un ID aleatoirement telle que chaque utilisateur a un ID unique
       nom : req.body.nom,
       prenom : req.body.prenom,
       username : req.body.nomu,
       role : req.body.role,
       email : req.body.email,
       tel : req.body.tel,
       addresse : req.body.adresse,
       password : hash(req.body.mdp),
       actif: true
    };
   if(isusernameuniq(user, userobj) || isemailuniq(user, userobj)){ //si le nom d'utilisateur et l'email n'existent pas dans le fichier des utilisateurs
    user.push(userobj);  //on rajoute l'objet cree en-dessus a la variable user 
    const newdata = JSON.stringify(user);  //convertit une valeur JavaScript en chaîne JSON
    fs.writeFile('./datafiles/users.json', newdata, (err)=>{ //reecrire la variable qui contient le tableau des objets des utilisateurs dans le fichier des utilisateurs
        if(err) throw err; //en cas d'erreur d'ouverture de fichier
        console.log('successfully wrote file');
    });
    res.redirect("/ajouterutilisateur"); //redirection vers la page d'ajout utilisateur
   }
   else {
     if(!isusernameuniq(user, userobj)) {
       x = "nom d utilisateur existe déja, veillez saisir un autre";
       res.render('ajouterutilisateur', {x});
     }
     else {
      if(!isemailuniq(user, userobj)){
        x = "email existe déja, veillez saisir un autre";
        res.render('ajouterutilisateur', {x});
      }
      else{
        x = "nom d utilisateur et email existent déja, veillez saisir des autres"
        res.render('ajouterutilisateur', {x});
      }
     }
    }
    x = "";
    res.render('ajouterutilisateur', {x});

  });
   
}

//fonction pour crypter le mot de passe 
async function hash(originalpassword){
  const saltRounds = 10;
  try{
    const hashedPassword = await bcrypt.hash(originalpassword, saltRounds);
    return hashedPassword;
  } catch(error){
    console.log(error);
  }
}






//fonction pour verifier si le nom d'utilisateur existe deja dans le fichier des utiilisateurs
const isusernameuniq = (usersarray, newuser) => {
  let result = usersarray.filter(obj => {   //rechercher dans le fichier des utilisateurs l'objet utilisateur qui a le meme nom d'utilisateur saisi dans le formulaire
    return obj.username === newuser.username;
  })
  if(typeof result[0] === 'undefined') return true; //si le nom d'utilisateur existe alors on retourne vrai
  else return false;                                //sinon on retourne faux
}





// fonction pour verifier si l'email existe deja dans le fichier des utiilisateurs
const isemailuniq = (usersarray, newuser) => {
  let result = usersarray.filter(obj => {  //rechercher dans le fichier des utilisateurs l'objet utilisateur qui a le meme email saisi dans le formulaire
    return obj.email === newuser.email;
  })
  if(typeof result[0] === 'undefined') return true;  //si l'email existe alors on retourne vrai
  else return false;                                 //sinon on retourne faux

}




//fonction pour desactiver un compte utilisateur
const desactiveruser = (req, res)=>{
    
  fs.readFile('./datafiles/users.json', (err, userdata)=>{ //lire le fichier et stocker son contenu dans userdata
      if(err) throw err;  //en cas d'erreur d'ouverture de fichier
      var user = JSON.parse(userdata); 
      let userobj = {  //creer un objet qui contiendra les informations saisies dans le formulaire de 'desactiver utilisateur'
       nom : req.body.nom, 
       prenom : req.body.prenom,
       username : req.body.nomu,
    }
    let result = user.filter(obj => { //rechercher et recuperer l'objet qui correspond au nom d'utilisateur saisi dans le formulaire 'desactiver utilisateur'
      return obj.username === userobj.username;
    });
    let newarray = user.filter(obj => {     //recuperer tous les objets du fichier des utilisateurs sauf l'objet qui correspond au nom d'utilisateur saisi
      return obj.username !== userobj.username;
    });
    if(typeof result[0] === 'undefined') {console.log('user not existant');
    res.redirect('/desactiverutilisateur');
  }//si le nom d'utilisateur n'existe pas dans le fichier des utilisateurs on affiche ce message

    else {                          //sinon
      result[0].actif = false;      //on change le booleen actif de 'true' a 'false' c'est a dire que l'utilisateur est innactif il ne peut pas faire des taches dans l'application
      newarray.push(result[0]);     //on ajoute cet objet a la variable newarray qui contient tous les autres objets des utilisateurs
      const newdata = JSON.stringify(newarray);
      fs.writeFile('./datafiles/users.json', newdata, (err)=>{  //reecrire cet variable dans le fichier des utilisateurs
        if(err) throw err;
        console.log('successfully wrote file');
    });
    
    res.redirect('/desactiverutilisateur'); //redirection vers la page 'desactiverutil'
    }
  });
}

/*
//fonction pour permettre aux utilisateurs de modifier leur compte
const gerercompte = (req, res, id="69c2ffc8-8ce0-4b22-b1ab-6fbe0ac5d9ef")=>{
  console.log(id);
  fs.readFile('users.json', (err, userdata)=>{
    if(err) throw err;
    var user = JSON.parse(userdata);
    let userobj = {
      nom : req.body.nom,
      prenom : req.body.prenom,
      username : req.body.username,
      email : req.body.email,
      tel : req.body.phonenumber,
      password : req.body.password,
   };
   let result = user.filter(obj => {
    return obj.id === id;
  });
  result[0].nom = userobj.nom;
  result[0].prenom = userobj.prenom;
  result[0].tel = userobj.tel;
  result[0].password = userobj.password;
  if(isusernameuniq(user, userobj) || isemailuniq(user, userobj)){
    result[0].username = userobj.username;
    result[0].email = userobj.email;
  }
  else console.log('username or email existant');
  let newarray = user.filter(obj => {
    return obj.id !== id;
  });
  newarray.push(result[0]);
  const newdata = JSON.stringify(newarray);
      fs.writeFile('users.json', newdata, (err)=>{
        if(err) throw err;
        console.log('successfully wrote file');
    });
res.redirect('gerercompte');
  });
}
*/

module.exports = { //exporter les fonctions du paquet 'Utilisateur' 
  adduser,
  desactiveruser,
}
