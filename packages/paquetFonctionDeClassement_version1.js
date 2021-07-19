const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



const afficherCrit = (i)=>{
    
  fs.readFile('criteres.json', (err, critdata)=>{
      if(err) throw err;
      var crit = JSON.parse(critdata);
      
      return crit[i];  
  });

    
   
   
}


const addcrit = (req, res)=>{
    
  fs.readFile('criteres.json', (err, critdata)=>{
      if(err) throw err;
      var crit = JSON.parse(critdata);
       
     
      
      
      let val; 
      val = req.body.valeur;
      let t =[];
      let z;
      
      for (let index = 0; index < val; index++) {
        let y="option"+(index+1);
        let v="val"+(index+1);
        z = req.body[y];
        w = req.body[v];
        t[index]= 
        {
          attribut : z,
          valeur : w
        };
        
      }
     
     let critobj = {
       def : req.body.def,
       cri : req.body.name,
       tab : t
       

     }
    console.log(critobj);
    crit.push(critobj);
    const newdata = JSON.stringify(crit);
    fs.writeFile('criteres.json', newdata, (err)=>{
        if(err) throw err;
        console.log('successfully wrote file');
    });
  });

    
    res.redirect("/ajoutercrit"); 
   
}
///////////////////////////////////////////////


//affichage de tableau de criteres 
/*const showcrit = ()=>{
    
  fs.readFile('crit2.json', (err, critdata)=>{
      if(err) throw err;
      var crit = JSON.parse(critdata);
      
      
    
    let newarray = crit.filter(obj => {
      console.log(obj.cri);
      document.getElementById("t").innerHTML=`<p>hello world please love me</p>`
      
    });
    
  });
}*/



//remove critere
const removecrit = (req, res)=>{
    
  fs.readFile('crit2.json', (err, critdata)=>{
      if(err) throw err;
      var crit = JSON.parse(critdata);
      
      let critobj = {
       cri : req.body.cri
    }
    /*let result = crit.filter(obj => {
      return obj.cri === critobj.cri;
    });*/
    let newarray = crit.filter(obj => {
      //console.log(obj.cri);
      return obj.cri !== critobj.cri;
      
    });
   
      
      console.log(newarray);
      const newdata = JSON.stringify(newarray);
      fs.writeFile('crit2.json', newdata, (err)=>{
        if(err) throw err;
        console.log('successfully wrote file');
    });
    
    res.redirect('/remove');
    
  });
}




module.exports = {
  addcrit,
  removecrit,
  afficherCrit,
}