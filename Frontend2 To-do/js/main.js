// Zorgen ervoor dat je een taak kunt toevoegen met enter en de titel kunt veranderen.
addEventsToInput();
changeTitleToInput();

function addEventsToInput() {
    var taskInput = document.getElementsByClassName("toDo__input"); // We halen alle invoervelden op
    for (var i = 0; i < taskInput.length; i++) {
        // Als je in een van die velden op een toets drukt...
        taskInput[i].onkeyup = function (event) {
            newTask(event); // En als het enter is, voeg een nieuwe taak toe


        }
    }

}

// Functie om de titel (h2) van een lijstje te veranderen
function changeTitleToInput() {
    var headers = document.getElementsByClassName("toDo__header"); // Alle (headers) van de lijstjes
    for (var i = 0; i < headers.length; i++) {
        headers[i].onclick = function (event) {
            var oldTitle = this.children[0].innerText; // Pak de huidige titel (het h2 element)
            this.children[0].remove();  // Verwijder die oude titel
            var newInput = document.createElement("input");// Maak een invoerveld aan
            newInput.classList = "toDo__headerInput"; // Geef het de juiste opmaak
            newInput.value = oldTitle; // Zet de oude titel in dat invoerveld
            this.appendChild(newInput); // Voeg het invoerveld toe ipv de oude titel
            newInput.focus();// Zet je cursor meteen in het nieuwe veld

             // Als je in het invoerveld op enter drukt...
            newInput.onkeyup = function(event){
                if(event.key === "Enter"){
                    var newTitle = event.target.value; // Pak de nieuwe titel uit het invoerveld
                    var newHeading = document.createElement("h2") // Maak een nieuw h2 element
                    event.target.parentElement.appendChild(newHeading); // Voeg dat nieuwe h2 element toe
                    newHeading.innerText = newTitle; // Zet de nieuwe titel erin
                    newHeading.classList = "toDo__heading"; // Geef het h2 element de juiste opmaak
                    this.remove();  // Verwijder het invoerveld

            }
        };
    }
}
}


// Functie om een nieuwe taak toe te voegen
function newTask(event) {
    if (event.key === "Enter") {  // Alleen als je op enter drukt
        var tasks = event.target.parentElement.parentElement.children[1].children[0] // Haal de takenlijst erbij
        var newTask = document.createElement("li"); // Maak een nieuwe taak (li element)
        newTask.innerText = event.target.value; // Zet de ingevoerde tekst als taak
        newTask.classList = "toDo__task"; // Geef het de juiste opmaak
        newTask.dataset.running = "false" // Zeg dat de taak niet aan het 'lopen' is (voor de timer)
        tasks.appendChild(newTask); // Voeg de nieuwe taak toe aan de lijst
        event.target.value = ""; // Leeg het invoerveld na toevoegen
        newTask.onclick = function (event) {
            setOrClearTimer(event); // Koppel de timer functie aan de nieuwe taak


        }

    }
}


// Pak alle taken uit de to-do lijst
var tasks = document.getElementsByClassName("toDo__task");
var timer = null;  // Timer om de taak later naar 'Done' te verplaatsen

// Doorloop elke taak en koppel er een klikgebeurtenis aan
for (var i = 0; i < tasks.length; i++) {
    tasks[i].onclick = function (event) {
        setOrClearTimer(event); // Elke keer als je op een taak klikt, start of stop de timer
    }
}

// Functie om een taak na een paar seconden naar de 'Done'-lijst te verplaatsen
function toDone(event) {
    timer = setTimeout(function () {
        event.target.remove(); // Verwijder de taak uit de originele lijst
        var doneTask = document.createElement("li"); // Maak een nieuw 'li'-element voor de 'Done'-lijst
        doneTask.classList = "toDo__task toDo__task--done"; // Geef de taak de juiste opmaak (met een streep erdoor)
        doneTask.innerText = event.target.innerText;  // Zet de tekst van de taak in het nieuwe element
        document.getElementById("js--done").appendChild(doneTask);  // Voeg de taak toe aan de 'Done'-lijst
    }, 2000) // Wacht 2 seconden voordat de taak wordt verplaatst

}


// Functie om de timer te starten of te stoppen wanneer je op een taak klikt
function setOrClearTimer(event) { 
    if (event.target.dataset.running === "false") { // Als de taak nog niet 'aan' staat (geen timer)
        event.target.classList.toggle("toDo__task--done"); // Zet een streep door de taak
        event.target.dataset.running = "true"; // Zet de taak aan (voor de timer)
        toDone(event); // Start de functie die de taak naar 'Done' verplaatst


    }
    else if (event.target.dataset.running === "true") { // Als de taak al 'aan' staat (er is een timer)
        event.target.classList.toggle("toDo__task--done"); // Haal de streep weg (toggle)
        clearTimeout(timer);  // Stop de timer als je nog een keer klikt
        event.target.dataset.running = "false"; // Zet de taak weer uit

    }
}

// Koppel een klikfunctionaliteit aan de Floating Action Button (FAB)
var fab = document.getElementById("js--fab");
fab.onclick = function () {
    makeNewCard(); // Wanneer je op de FAB klikt, maak een nieuwe to-do kaart aan
}

function makeNewCard() {
    /* make the card */
    var newToDo = document.createElement("article")  // Maak een nieuw 'kaartje'

    newToDo.classList = "toDo"; // Geef het de juiste opmaak

    /* make the Header*/
    var newHeader = document.createElement("header")  // Maak de kop (header) van het kaartje
    newHeader.classList = "toDo__header";

    /*Make the Heading*/
    var newHeading = document.createElement("h2") // Maak de titel van het kaartje
    newHeading.classList = "toDo__heading";
    newHeading.innerText = "Default"; // Geef de kaart een standaard titel

    /*Make the seciton*/
    var newSection = document.createElement("section") // Maak het 'body' gedeelte voor de taken
    newSection.classList = "toDo__body";

    /*Make the UL*/
    var newList = document.createElement("ul")  // Maak de lege lijst voor taken
    newList.classList = "toDo__tasks";

    /*Make the footer*/
    var newFooter = document.createElement("footer") // Maak de voet (footer) met het invoerveld
    newFooter.classList = "toDo__footer";

    /*Make the Input*/
    var newInput = document.createElement("Input") // Maak het invoerveld
    newInput.classList = "toDo__input";
    newInput.type = "text";
    newInput.placeholder = "Enter a task";
    newInput.id = "js--input";


    newFooter.appendChild(newInput);  // Voeg het invoerveld toe aan de footer
    newSection.appendChild(newList); // Voeg de lege takenlijst toe aan het body gedeelte
    newHeader.appendChild(newHeading); // Voeg de titel toe aan de header
    newToDo.appendChild(newHeader);  // Voeg de header toe aan het kaartje
    newToDo.appendChild(newSection); // Voeg het body gedeelte toe aan het kaartje
    newToDo.appendChild(newFooter); // Voeg de footer toe aan het kaartje

    document.getElementsByTagName("body")[0].appendChild(newToDo);
    addEventsToInput(); // Zorg dat het invoerveld werkt met enter
    changeTitleToInput(); // Zorg dat de titel van het kaartje veranderd kan worden


}



