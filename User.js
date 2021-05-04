//define a class User

export default class User {
    constructor(username, email, password, phone, task, enable){
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.task = task;
        this.enable = false;
    }
    connect(username, email, password){}
    disconnect();


}

export default class Admin extends User {
    desactiver_cmpt(username){
        //recherche dans le fichier Json contenant tout les utilisateurs
        //change false to true
    }
    creer_cmpt(){
        //creer des objets de type valideur ou editeur
    }
}

export default class Valideur extends User {
    //methodes propres au valideur
}

export default class editeur extends User {
//methodes propres a l'editeur
}