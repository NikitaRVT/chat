const ATJAUNOT = 50000;


/*
Ielādē tērzēšanas datus no servera
Uzstāda laiku pēc kāda atkārtoti izsaukt šo pašu funkciju
*/
async function readChat() {
    const atbilde = await fetch('/chat/read');
    const datuObjekts = await atbilde.json();
    showChat(datuObjekts);
    await new Promise(resolve => setTimeout(resolve, ATJAUNOT));
    await readChat();
}


function showChat(dati) {
    var newRow = "<br/>";
    var chat = "";
    var chatDiv = document.getElementById("chat");
    for (var row of dati["chat"]) {
        chat = chat + row + newRow;
    }
    chatDiv.innerHTML = chat;
}


/*
Publicē tērzēšanas ziņas datus uz serveri
*/
async function sendMes() {
    // Nolasa ievades lauka saturu
    let zinjasElements = document.getElementById("zinja");
    let zinja = zinjasElements.value;
    // izdzēš ievades lauku
    zinjasElements.value = "";

    const atbilde = await fetch('/chat/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "chat": zinja })
    });
    const datuObjekts = await atbilde.json();

    // parāda jauno chata saturu
    raadiChatuVienkarsi(datuObjekts);
}


// Ērtības funkcionalitāte
// Atrod ievades lauku
var ievadesLauks = document.getElementById("zinja");
// Gaida signālu no klaviatūras, ka ir nospiests Enter taustiņš
ievadesLauks.addEventListener("keyup", function(event) {
  // Numur 13 ir "Enter" taustiņš
  if (event.keyCode === 13) {
    sendMes();
  }
});
