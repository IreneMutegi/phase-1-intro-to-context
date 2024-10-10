// Create a single employee record
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Create multiple employee records from an array of arrays
function createEmployeeRecords(arrays) {
  return arrays.map(arr => createEmployeeRecord(arr));
}

// Create a time-in event for a specific date and time
function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, time] = dateStamp.split(' ');
  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(time),
    date: date
  };
  
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

// Create a time-out event for a specific date and time
function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, time] = dateStamp.split(' ');
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(time),
    date: date
  };

  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

// Calculate the number of hours worked on a given date
function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

// Calculate wages earned on a given date
function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

// Calculate total wages earned by an employee for all dates worked
function allWagesFor(employeeRecord) {
  const eligibleDates = employeeRecord.timeInEvents.map(event => event.date);
  const totalWages = eligibleDates.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date);
  }, 0);
  
  return totalWages;
}

// Calculate the total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}
