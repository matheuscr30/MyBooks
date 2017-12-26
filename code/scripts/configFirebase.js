var config = {
    apiKey: "AIzaSyBEfNolVrTP71DCgEQBMRzB-VFfAIV3BFQ",
    authDomain: "mybooks-c4b5e.firebaseapp.com",
    databaseURL: "https://mybooks-c4b5e.firebaseio.com",
    projectId: "mybooks-c4b5e",
    storageBucket: "mybooks-c4b5e.appspot.com",
    messagingSenderId: "1084787551709"
};
firebase.initializeApp(config);

var globalUserEmail;
var globalUserId;
function getUser(user){
    globalUserEmail = user.email;
    globalUserId = btoa(globalUserEmail);
    console.log(globalUserEmail);
}

function createCard(book){
    var div_1 = document.createElement("DIV")
    div_1.setAttribute("class", "card-wide mdl-card mdl-shadow--2dp card-main");
    div_1.setAttribute("id", "div-"+book.id);

    var div_2 = document.createElement("DIV");
    div_2.setAttribute("class", "mdl-card__title");

    var h2_1 = document.createElement("H2");
    h2_1.setAttribute("class", "mdl-card__title-text")

    var t1 = document.createTextNode(book.titulo);

    var div_3 = document.createElement("DIV");
    div_3.setAttribute("class", "mdl-card__supporting-text");

    var t2 = document.createTextNode(book.descricao);

    var div_4 = document.createElement("DIV");
    div_4.setAttribute("class", "mdl-card__menu");

    var btn_1 = document.createElement("BUTTON");
    btn_1.setAttribute("class", "delete-button mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect");
    btn_1.setAttribute("id", book.id);

    var i_1 = document.createElement("I");
    i_1.setAttribute("class", "material-icons");

    var t3 = document.createTextNode("delete");

    div_1.appendChild(div_2);
    div_2.appendChild(h2_1);
    h2_1.appendChild(t1);
    div_1.appendChild(div_3);
    div_3.appendChild(t2);
    div_1.appendChild(div_4);
    div_4.appendChild(btn_1);
    btn_1.appendChild(i_1);
    i_1.appendChild(t3);
    document.getElementById('main-content').appendChild(div_1);
}

function deleteCard(id){

    var dbReference = firebase.database().ref('books/' + globalUserId + '/' + id);
    dbReference.remove();

    var child = document.getElementById('div-'+id);
    child.parentNode.removeChild(child);
}

function populateCards(){
    var dbReference = firebase.database().ref('books/' + globalUserId + '/');
    dbReference.on('value', function(snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var book = childSnapshot.val();
            console.log(book);
            createCard(book);
        });
        
        $('.delete-button').click(function () {
            var id = this.id;
            deleteCard(id);
        });
    });
}

function deslogarUsuario(){
    firebase.auth().signOut();
    window.location.replace('index.html');
}

function showMessage(messagePass){
    var snackbarContainer = document.querySelector('#toast-error');
    var data = {message: messagePass};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
