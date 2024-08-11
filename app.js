let AllUsers = null;
let users = [];

let toastText = document.getElementById('toast');

function User(name, email){
    this.name = name;
    this.email = email;
    this.events = []
    this.addEvent = function(event){
        this.events.push(event);  
        Render(this, event)  
    }
    }
function Event(title, dateTime, reminderTime){
this.title = title;
this.dateTime = new Date(dateTime);
this.reminderTime = reminderTime;
}
function create(){
    let name = document.getElementById('exampleInputName').value;
    let email = document.getElementById('exampleInputEmail1').value;
    if(name && email){
        AllUsers = new User(name, email);
        users.push(AllUsers)
        document.getElementById('event').style.display = 'block'
        document.getElementById('login').style.display = 'none'
    }
}
function addEvent(){
    let title = document.getElementById('exampleInputEvent').value;
    let dateTime = document.getElementById('exampleInputDate').value;
    let reminderTime = document.getElementById('exampleInputReminder').value;
    if(title && dateTime &&reminderTime){
        let newEvent = new Event(title, dateTime, reminderTime);
        AllUsers.addEvent(newEvent);
        displayUpcomingEvents();
    }
}
function toast(name, title, reminderTime){
    toastText.style.display = 'block'
    toastText.innerHTML =  `${name}, yourEvent ${title} is in ${reminderTime}`
    setTimeout(() => {
        toastText.style.display = 'none'
    }, 5000)
}
function Render(user, event){
let now = new Date();
let timeUntilEvent = event.dateTime - now;
let reminderTime = timeUntilEvent - (event.reminderTime * 60000);
if(reminderTime > 0){
setTimeout(() => {
    toastText.style.display = 'block'
    toast(user.name,event.title,event.reminderTime)
}, reminderTime)
}
}

function displayUpcomingEvents(){
    let now = new Date();
    let oneHourLeter = new Date(now.getTime() + 60 * 60000);
    let output = document.getElementById('output');
    output.innerHTML = ''
    users.forEach(user => {
        let userSection = document.createElement('div');
        userSection.className = 'user-section';
        userSection.innerHTML = `<h3>Event For <span> ${user.name} </span></h3>`
        user.events.forEach(event => {
            if(event.dateTime > now && event.dateTime <= oneHourLeter){
                let eventDev = document.createElement('div');
                eventDev.className = 'div-sectionEvent';
                eventDev.innerText = `-${event.title} at ${event.dateTime.toLocaleDateString()}`
                userSection.appendChild(eventDev);
            }
        });
        output.appendChild(userSection)
    })
}
setInterval(displayUpcomingEvents , 10000)