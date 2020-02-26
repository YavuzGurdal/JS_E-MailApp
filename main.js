
var username, password;

let kullaniciAdi;
let kullaniciSifre;

// ------------------------------------------- LOGIN PART -----------------------------------------------
// to show the login modal
function showModal() {
    document.getElementById('modalId').style.display = 'block';
    document.getElementById("loginName").focus();
}

// to hide the login modal
function hideModal(x) {
    document.getElementById('modalId' + x).style.display = 'none';
}

// to get the values of inputs'
function getValueLogin (event) {
    console.log(event);

    if (event.name === 'username') {
        username = event.value.toLowerCase();

    } else if ( event.name === 'password') {
        password = event.value.toLowerCase();
    }
}

// to submit loginForm and for login
function submitFormLogin () {

    let sifreBox = JSON.parse(localStorage.getItem("sifreler"));

    // aradigimiz deger localStorage de varsa index numarasini donuyor. yoksa -1 donuyor
    let loginNameMail = sifreBox.findIndex(yvz => yvz.kullaniciAdi === document.getElementById("loginName").value);

    let loginNameAndPassword = sifreBox.findIndex(yvz => yvz.kullaniciAdi === document.getElementById("loginName").value 
    && yvz.kullaniciSifre === document.getElementById("loginPassword").value);

    // console.log(loginNameAndPassword);

    if (loginNameMail === -1) {
        alert("Mail adresiniz kayıtlı değil. Lütfen SignUP yapınız...")
    
    } else if ( loginNameAndPassword !== -1) {
   
        // kullanici adini(E-mail) localStorage'a gonderiyoruz. key:loginNameforFromEmail value:fromName nin degerleri oluyor
        // bu islem inbox da sadece login yapilan E-Mail adresine gelen E-Mailleri gosteriyor
        let fromName = document.getElementById("loginName").value;
        localStorage.setItem('loginNameforFromEmail',fromName);
            
        // console.log(document.location);    
        document.location.href = "homePage.html"; 
    } else {
        alert("Mail adresiniz ile Şifreniz uyumlu değil şifrenizi kontrol edip tekrar deneyiniz...");
        document.location.reload(true);
    }
        
    //************** yukariyi ve localstorage'e gondermeyi 7 saatte yaptim ***************// 
    //************** I made this section in 7 hours ***************// 
}


// ------------------------------------------- SIGN UP PART -----------------------------------------------

var usernameSignUp, passwordSignUp, passwordRepeatSignUp;


function signUpInLogin() {
    document.getElementById('modalId').style.display = 'none';
    document.getElementById('modalId2').style.display = 'block';

    document.getElementById("userNameSignUp").focus();
}

// to get the values of inputs' in Sigh Up part
function getValueSignUp (event) {

    if (event.name === 'username') {
        usernameSignUp = event.value.toLowerCase();

    } else if (event.name === 'password') {
        passwordSignUp = event.value.toLowerCase();

    } else {
        passwordRepeatSignUp = event.value.toLowerCase();
    } 
}


let sifreler = JSON.parse(localStorage.getItem('sifreler'));
// eger sifreler array'i yoksa sifrelerin tutulacagı bir array olusturuyoruz
if ( !sifreler ) {
    sifreler = [];
    localStorage.setItem('sifreler',JSON.stringify(sifreler));
    // bunu localstorage'e gondermemiz lazım yoksa hicbir kayit yokken problem cıkıyor. cunku localstorage de bisey bulamıyor
}


// to submit the form in Sign Up
function signUp () {


    let sifreBox = JSON.parse(localStorage.getItem("sifreler"));

    let nameSignUp = sifreBox.findIndex(x => x.kullaniciAdi == document.getElementById("userNameSignUp").value)

    console.log(nameSignUp);

    console.log( usernameSignUp, passwordSignUp, passwordRepeatSignUp );

    if ( nameSignUp !== -1 ) {

        alert("HATA - Bu Mail ile kayit yapilmistir. Baska bir Mail ile tekrar deneyiniz...");
        return;

    } else if ( passwordSignUp !== passwordRepeatSignUp ) {

        alert("HATA - Password'ler birbiri ile uyumlu degil...!");
        return;

    } else { 
        sendSifreler();
        document.location.reload(true);
        // alert("Basarili bir sekilde hesap olusturulmustur ...");       
    }    
} 

// to submit SignUp values (this function in function signUp())
function sendSifreler() {
    kullaniciAdi = usernameSignUp;
    kullaniciSifre = passwordRepeatSignUp;

    let sifre = {kullaniciAdi, kullaniciSifre};
    // kullanici adi ve sifrelerin tutuldugu object array.

    sifreler.push(sifre);

    // console.log(sifreler);

    localStorage.setItem('sifreler',JSON.stringify(sifreler));  // json daki kısım text oldu

    // console.log(sifreler);

    document.location.reload(true);
    alert("Basarili bir sekilde hesap olusturulmustur ...");
}


// when the user clicks anywhere outside of the modal, close the modal
window.onclick = function (event) {
    this.console.log(event);

    var modal = document.getElementById('modalId');
    var modal2 = document.getElementById('modalId2');

    if (event.target == modal) {
        modal.style.display = 'none';

    } else if (event.target == modal2) {
        modal2.style.display = 'none'
    }
}