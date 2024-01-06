//------------------Pseudo Code-----------------------

// !Using day.js add the current day(format: Day, Day of Month, Month) at the top under "A simple calendar app for scheduling your work day"
// !Use id - currentDay

//!Present time blocks for standard business hours (9AM - 5PM) when the user scrolls down - need a function to render a table format (3 columns, 9 Rows) using the div.container

//!Within the same function, need to colour code each time block based on past, present, and future when the time block is viewed - using the classes past, present and future.
//!Past - Grey colour, Present - Red colour, Future - Green colour
//!Need to check the time constantly to see if the colour blocks need to change.

//!Allow a user to enter an event when they click a time block

//!Save the event in local storage when the save button is clicked in that time block - event listener 

//!Persist events between refreshes of a page - need to load events from local storage

$(document).ready(function () {

    // Selector to display today's date
    const currentDateEl = $("#currentDay");
    // declare object to store calendar events
    let calEvents = {};

    // render the calendar on the page
    function renderCalendar(today, calEvents) {
        let rowHr = dayjs(today).hour(9); // start building rows at 9 AM
        const calendar = $("div.container"); // select the calendar div
        calendar.empty(); // clear previously rendered time blocks from the calendar div
        // loop to make rows for hours 9 to 5
        for (let i = 1; i < 10; i++) {

            const row = $("<div>").addClass("row"); // start building the row for each hour block

            // set colors for time blocks for past, present and future
            let classOfHour = "";
            if (today.isBefore(rowHr, "hour")) {
                classOfHour = "future"
            } else if (today.isAfter(rowHr, "hour")) {
                classOfHour = "past"
            } else {
                classOfHour = "present"
            };

            calendar.append(row);
            // add hour column to row
            row.append($("<div>").addClass("col-2 hour").text(rowHr.format("h A")));
            // add event description column to row
            let timeBlock = rowHr.format("h A"); // keys for data in calEvents object to populate textarea
            row.append($("<textarea>").addClass(`col-8 ${classOfHour}`).text(calEvents[timeBlock]));
            // add save button column to row
            row.append($("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").attr("aria-label", "Save").attr("id", rowHr.format("h A")));

            // increment hour before creating next row
            rowHr = rowHr.add(1, "hour");

            // set calendar render time
            hourRendered = dayjs();
        };
    };

    // initialize calendar
    function initCalendar() {
        const today = dayjs(); // set today's date using dayjs
        currentDateEl.text(today.format('dddd, D MMMM YYYY'));
        renderCalendar(today, calEvents); //calls renderCalendar function
    };

    // loads events from local storage
    function loadCal() {
        const storedCal = JSON.parse(localStorage.getItem("calEvents"));
        if (storedCal) { //if there is stored data then put it in the calEvents
            calEvents = storedCal;
        };
    };

    // When the page loads:
    loadCal(); // load calendar events from local storage
    initCalendar(); // set the current date
    hourTracker(); // start tracking the hour block

    // checks current time every minute to see if color blocks for past present future need to change
    function hourTracker() {
        const checkHourInterval = setInterval(function () {
            if (dayjs().isAfter(hourRendered, "minute")) {
                initCalendar(); // if it's the next hour, re-render the calendar to change the colors
            }
        }, 60000); //60000 = 60 seconds
    };

    // store calendar events in local storage
    function storeCal() {
        localStorage.setItem("calEvents", JSON.stringify(calEvents));
    };

    // Save button click handler - save calendar event 
    $(document).on("click", "button.saveBtn", function (event) {
        let calDesc = event.currentTarget.parentElement.children[1].value; // store contents of that row's textarea
        calEvents[event.currentTarget.id] = calDesc; // add calendar event text to the calEvents object with the time as the key
        storeCal(); // store the calEvents in local storage
    });

});