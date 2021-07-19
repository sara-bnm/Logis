








document.getElementById("resultmatricule").innerHTML=localStorage.getItem("Matricule");
document.getElementById("resultnomprenom").innerHTML=localStorage.getItem("NomPrenom");
document.getElementById("result1").innerHTML=localStorage.getItem("Option1");
document.getElementById("result2").innerHTML=localStorage.getItem("Option2");
document.getElementById("result3").innerHTML=localStorage.getItem("Option3");
document.getElementById("result4").innerHTML=localStorage.getItem("Option4");
document.getElementById("result5").innerHTML=localStorage.getItem("Option5");
document.getElementById("result6").innerHTML=localStorage.getItem("Option6");
document.getElementById("result7").innerHTML=localStorage.getItem("Option7");
document.getElementById("result8").innerHTML=localStorage.getItem("Option8");
document.getElementById("result9").innerHTML=localStorage.getItem("Option9");
document.getElementById("result10").innerHTML=localStorage.getItem("Option10");
document.getElementById("result11").innerHTML=localStorage.getItem("Option11");
document.getElementById("result12").innerHTML=localStorage.getItem("Option12");
document.getElementById("resultdatetime").innerHTML=localStorage.getItem("DateHeure");
document.getElementById("resultmatricule2").innerHTML=localStorage.getItem("Matricule");
document.getElementById("resultnomprenom2").innerHTML=localStorage.getItem("NomPrenom");
document.getElementById("result12").innerHTML=localStorage.getItem("Option1");
document.getElementById("result22").innerHTML=localStorage.getItem("Option2");
document.getElementById("result32").innerHTML=localStorage.getItem("Option3");
document.getElementById("result42").innerHTML=localStorage.getItem("Option4");
document.getElementById("result52").innerHTML=localStorage.getItem("Option5");
document.getElementById("result62").innerHTML=localStorage.getItem("Option6");
document.getElementById("result72").innerHTML=localStorage.getItem("Option7");
document.getElementById("result82").innerHTML=localStorage.getItem("Option8");
document.getElementById("result92").innerHTML=localStorage.getItem("Option9");
document.getElementById("result102").innerHTML=localStorage.getItem("Option10");
document.getElementById("result112").innerHTML=localStorage.getItem("Option11");
document.getElementById("result122").innerHTML=localStorage.getItem("Option12");
document.getElementById("resultdatetime2").innerHTML=localStorage.getItem("DateHeure");


//Create PDf from HTML...
function CreatePDFfromHTML() {
    var HTML_Width = $("#invoice").width();
    var HTML_Height = $("#invoice").height();
    var top_left_margin = 0;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($("#invoice")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) { 
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        pdf.save("Your_PDF_Name.pdf");
        $("#invoice").hide();
    });
}


function printContent(el){
    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById(el).innerHTML;
    document.body.innerHTML = printcontent;
    window.print(); 
    document.body.innerHTML = restorepage;

}