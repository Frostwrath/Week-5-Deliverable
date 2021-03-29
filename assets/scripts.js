const currentTime = moment();
const savedAt = currentTime.format("YYYY-MM-DD");
const $container = $(".container");
const events = getEvents();

$("#currentDay").text(currentTime.format("dddd, Do MMMM"));

for (let index = 9; index < 18; index++){
    const hour = index > 12 ? index - 12 : index;
    const meridian = index < 12 ? "AM" : "PM";
    const inputId = hour + meridian;
    const compareTime = moment(currentTime).hour(index);
    const className = getTense(compareTime)

    if (className == "upcoming") {
        backgroundColor = "green";
        }
        if (className == "present") {
        backgroundColor = "gray";
        }
        if (className == "past") {
        backgroundColor = "red";
        }

    $container.append(`
    <div class="row">
      <label for="${inputId}" class="hour col-xl-1 col-md-2 col-3">${hour} ${meridian}</label>
      <textarea id="${inputId}" name="${inputId}" class="description ${className} row col-xl-10 col-md-9 col-8" rows="4" cols="33" style = "background-color:${backgroundColor}">${
      events[inputId] ?? ""
    }</textarea>
    <button type = "button" class="saveBtn col" data-timeblock="${inputId}"><i class="far fasave"></i></button>
    </div>
    `);


    
}

$(".saveBtn").click(function (event){
    const eventTime = event.currentTarget.dataset.timeblock;
    const textareaContent = $(`#${eventTime}`).val();
    events[eventTime] = textareaContent;
    storeEvents(events);
})

function getTense(compareMoment) {
    if (currentTime.isBefore(compareMoment, "hour")) {
        return "upcoming";
    }
    if (currentTime.isAfter(compareMoment, "hour")) {
        return "past";
    }
    if (currentTime.isSame(compareMoment, "hour")) {
        return "present";
    }
}

function storeEvents(obj){
    let serialiseEvents = JSON.stringify(obj);
    window.localStorage.setItem(savedAt, serialiseEvents);
}

function getEvents() {
    const eventsJSON = window.localStorage.getItem(savedAt);
    return eventsJSON === null ? {} : JSON.parse(eventsJSON);
}

