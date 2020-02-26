// to made amails array
let emails = JSON.parse(localStorage.getItem('emails'));

if ( !emails ) {
    emails = [];
}

// to send mail in emails, localStorage
function sendEmail() {
    let from = localStorage.getItem('loginNameforFromEmail');
    // login yapilan E-Mail    

    //let from = document.getElementById('loginName').value;

    let to = document.getElementById('to').value;

    let cc = $('#cc').val(); // bu jquery ile yazım sekli. yukaridaki ile ayni seyi yapiyor

    let subject = $('#subject').val(); // bu jquery ile yazım sekli

    let message = $('#text').val(); // bu jquery ile yazım sekli

    let email = {from, to, cc, subject, message};
    // maillerin tutuldugu object array. asagida amail leri emails in icine atiyoruz

    emails.push(email);

    console.log(emails);

    localStorage.setItem('emails',JSON.stringify(emails));  // json daki kısım text oldu
   
    // console.log({to, cc, subject, message});

   
    //maili gonderince form içeriğini nasil silebilirim
    //document.getElementById("to").reset(); ile olabilir mi?
}


// to inbox and compose change
function switchScreen(reqScreen) {
    if (reqScreen == "inbox") {
        inboxLink.classList.add("active"); 
        // bu kisa yazma sekli.direk id yazip digerlerini yaziyoruz. id si inboxLink olan elementin class ina active ekle demek. yani görünür olur
        
        composeLink.classList.remove("active"); 
        // bu kisa yazma sekli.direk id yazip digerlerini yaziyoruz. id si composeLink olan elementin class'indan active i kaldir demek

        inbox.hidden = false;
        compose.hidden = true;
        // reqScreen = "compose"

        getEmails(); // son yazdigimiz bilgilerin gelmesi icin bunu burda cagirdim

    }  else if (reqScreen == "compose") {
        document.getElementById("inboxLink").classList.remove("active");

        document.getElementById("composeLink").classList.add("active");

        inbox.hidden = true;
        compose.hidden = false;

        // compose daki üstteki sender kismi
        var sender = localStorage.getItem('loginNameforFromEmail');
        document.getElementById("senderMail").innerHTML = `<b>Sender :</b> ${sender}`;

        // to inputuna focus olmasi icin
        document.getElementById("to").focus();

        // reqScreen = "inbox"
    }
    
}

// to show E-Mail. This function in function getEmails() in append
let showEmails = (index) => {
    //console.log(id);

    document.getElementById("toFrom").innerHTML = '<b>:</b> ' + emails[index].from;

    document.getElementById("toInfo").innerHTML = '<b>:</b> ' + emails[index].to;

    document.getElementById("ccInfo").innerHTML = '<b>:</b> ' + emails[index].cc;

    document.getElementById("subjectInfo").innerHTML = '<b>:</b> ' + emails[index].subject;

    document.getElementById("messageInfo").innerHTML = '<b>:</b> ' + emails[index].message;

    // bu kodlarla inbox'ın icindeki degerleri tiklayinca from,to,cc,subject,message degerlerini veriyor

}
// alacagimiz degerlerin uniq olmasi icin burada index degerlerini alacak fonksiyon yazdik
// func biryerde kullanıyorsak func onceden hazır olmalı


function getEmails() {
    
    mailList.innerHTML = ""; // func calismadan once icini sildik. yani icini bosalttik. yoksa son yazdigimiz degerleri tekrar yazar
    // $("#mailList").html(); // bu yukaridakinin JQUERY koduyla yazilisi. ikisi de ayni isi yapiyor

    let mailBox = JSON.parse(localStorage.getItem("emails")); 
    // getItem ve setItem lerde " " kullanmamiz lazim. yoksa variable olarak algilar
    // emails " " tirnak icinde olmasi lazim yoksa bunu variable olarak algilar

    // mailBox.map( val => console.log(val) ); // map içine arrow func yazdik


    // to append button in inBox
    if (mailBox) {
        mailBox.map( (val, i) => { // i index numarasini belirtiyor

            if (val.to == localStorage.getItem('loginNameforFromEmail') && val.cc == localStorage.getItem('loginNameforFromEmail')) {
                $("#mailList").append(`<button type="button" onclick="showEmails(${i})" class="mt-2 list-group-item list-group-item-action list-group-item-danger" data-toggle="modal" data-target="#exampleModalLong">${val.subject} <span>to & cc</span>
                </button>`);

                // bu fonksiyon button olusturuyor. mail in subject kısmını alip butona yaziyor. tiklayinca index numarasini alan bir fonksiyon daha ekledik
                // `` yani backtik icine variable yazarken ${ } yazip icine yazmamiz gerekiyor 
                
            } else if (val.to == localStorage.getItem('loginNameforFromEmail')) {
                $("#mailList").append(`<button type="button" onclick="showEmails(${i})" class="mt-2 list-group-item list-group-item-action list-group-item-primary" data-toggle="modal" data-target="#exampleModalLong">${val.subject} <span>to</span> 
                </button> `);

            } else if (val.cc == localStorage.getItem('loginNameforFromEmail')) {
                $("#mailList").append(`<button type="button" onclick="showEmails(${i})" class="mt-2 list-group-item list-group-item-action list-group-item-secondary" data-toggle="modal" data-target="#exampleModalLong">${val.subject} <span>cc</span> 
                </button> `);
            } 
        });
    }
}

getEmails();