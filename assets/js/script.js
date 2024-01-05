//------------------Pseudo Code-----------------------

// !Using day.js add the current day(format: Day, Day of Month, Month) at the top under "A simple calendar app for scheduling your work day"
// !Use id - currentDay

//Present time blocks for standard business hours (9AM - 5PM) when the user scrolls down - need a function to render a table format (3 columns, 9 Rows) using the div.container

//Within the same function, need to colour code each time block based on past, present, and future when the time block is viewed - using the classes past, present and future.
//Past - Grey colour, Present - Red colour, Future - Green colour
//Need to check the time constantly to see if the colour blocks need to change.

//Allow a user to enter an event when they click a time block

//Save the event in local storage when the save button is clicked in that time block - event listener 

//Persist events between refreshes of a page - need to load events from local storage

$(document).ready(function () {

// Selector to display today's date
const currentDateEl = $("#currentDay");
// declare object to store calendar events


// initialize calendar
function initCalendar() {
    const today = dayjs(); // set today's date
    currentDateEl.text(today.format('dddd, D MMMM YYYY'));
};

// When the page loads:
initCalendar(); // set the current date


});