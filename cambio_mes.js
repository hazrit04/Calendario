"use strict";

document.addEventListener("DOMContentLoaded", function() {
    var currentMonth = 10;
    var currentYear = 2023;

    var prevMonthLeftButton = document.getElementById("prev-month-left");
    var nextMonthLeftButton = document.getElementById("next-month-left");
    var prevMonthRightButton = document.getElementById("prev-month-right");
    var nextMonthRightButton = document.getElementById("next-month-right");

    prevMonthLeftButton.addEventListener("click", function() {
        changeMonth(-1);
    });

    nextMonthLeftButton.addEventListener("click", function() {
        changeMonth(1);
    })

    prevMonthRightButton.addEventListener("click", function() {
        changeMonth(-1);
    })

    nextMonthRightButton.addEventListener("click", function() {
        changeMonth(1);
    })

    function changeMonth(delta) {
        currentMonth += delta;

        if(currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }

        document.getElementById("current-month-left").innerText = getMonthName(currentMonth) + " " + currentYear;
        document.getElementById("current-month-right").innerText = getMonthName(currentMonth)+ " " + currentYear;

        updateCalendar(currentYear, currentMonth);
        updateMiniCalendar(currentYear, currentMonth);
    }

    function getMonthName(month) {
        var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return monthNames[month];
    }

    function updateCalendar(year, month) {
        // Obtener número de días del mes
        function getNumDays(year, month) {
            return new Date(year, month + 1, 0).getDate();
        }
    
        // Crear nueva tabla
        var calendarTable = document.getElementById("calendar").querySelector("table");
        var newTable = document.createElement('table');
        newTable.setAttribute('class', calendarTable.getAttribute('class'));
    
        // Cabecera estática con días de la semana
        var headerRow = newTable.createTHead().insertRow(); // Usamos createTHead para crear la sección de la cabecera de la tabla
        var daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        for (var i = 0; i < 7; i++) {
            var cell = document.createElement('th');
            cell.innerHTML = daysOfWeek[i];
            headerRow.appendChild(cell);
        }
    
        // Calcular número de filas
        var numDays = getNumDays(year, month);
        var firstDay = new Date(year, month, 1);
        var offset = firstDay.getDay(); // Calcular el desplazamiento desde el primer día de la semana (domingo)
        var numRows = Math.ceil((numDays + offset) / 7);
    
        // Generar filas
        for (var i = 0; i < numRows; i++) {
            var row = newTable.insertRow();
            for (var j = 0; j < 7; j++) {
                var cell = row.insertCell();
                var dayOfMonth = i * 7 + j + 1 - offset;
        
                if (dayOfMonth > 0 && dayOfMonth <= numDays) {
                    // Asigna el día del mes como contenido de la celda
                    cell.innerHTML = dayOfMonth;
        
                    // Agregar clases adicionales según sea necesario
                    var currentDate = new Date(year, month, dayOfMonth);
                    if (currentDate.getMonth() !== month) {
                        cell.classList.add("other-month");
                    }
        
                    // Ejemplo: Agregar clase para días con eventos
                    /* if (eventsForDay(year, month, dayOfMonth).length > 0) {
                        cell.classList.add("has-events");
                    } */
        
                    // Asigna un identificador (id) basado en el día del mes
                    var monthGood = month +1;
                    cell.id = "day" + dayOfMonth + "-" + monthGood;
                    cell.classList.add("calendar-cell")
        
                    // Ejemplo: Agregar evento de clic en la celda
                    cell.addEventListener("click", function (event) {
                        var clickedDay = event.target.innerHTML;
                        var currentDate = new Date(year, month, clickedDay);
        
                        openModal();
        
                        document.getElementById("event-date").valueAsDate = currentDate;
                    });
                }
            }
        }
    
        // Reemplazar la tabla antigua con la nueva
        calendarTable.parentNode.replaceChild(newTable, calendarTable);
    }

    function updateMiniCalendar(year, month) {
        // Obtener número de días del mes
        function getNumDays(year, month) {
            return new Date(year, month + 1, 0).getDate();
        }
    
        // Crear nueva tabla
        var miniCalendarTable = document.getElementById("mini-calendar").querySelector("table");
        var newTable = document.createElement('table');
        newTable.setAttribute('class', miniCalendarTable.getAttribute('class'));
    
        // Cabecera estática con días de la semana
        var headerRow = newTable.createTHead().insertRow();
        var daysOfWeek = ["D", "L", "M", "X", "J", "V", "S"];
        for (var i = 0; i < 7; i++) {
            var cell = document.createElement('th');
            cell.innerHTML = daysOfWeek[i];
            headerRow.appendChild(cell);
        }
    
        // Calcular número de filas
        var numDays = getNumDays(year, month);
        var firstDay = new Date(year, month, 1);
        var offset = firstDay.getDay(); // Calcular el desplazamiento desde el primer día de la semana (domingo)
        var numRows = Math.ceil((numDays + offset) / 7);
    
        // Generar filas
        for (var i = 0; i < numRows; i++) {
            var row = newTable.insertRow();
            for (var j = 0; j < 7; j++) {
                var cell = row.insertCell();
                var dayOfMonth = i * 7 + j + 1 - offset;
    
                if (dayOfMonth > 0 && dayOfMonth <= numDays) {
                    cell.innerHTML = dayOfMonth;
    
                    // Agregar clases adicionales según sea necesario
                    var currentDate = new Date(year, month, dayOfMonth);
                    if (currentDate.getMonth() !== month) {
                        cell.classList.add("other-month");
                    }
    
                    // Ejemplo: Agregar clase para días con eventos
                    if (eventsForDay(year, month, dayOfMonth).length > 0) {
                        cell.classList.add("has-events");
                    }
    
                    // Ejemplo: Agregar evento de clic en la celda
                    cell.addEventListener("click", function (event) {
                        var clickedDay = event.target.innerHTML;
                        var currentDate = new Date(year, month, clickedDay);
    
                        openModal();
    
                        document.getElementById("event-date").valueAsDate = currentDate;
                    });
                }
            }
        }
    
        // Reemplazar la tabla existente con la nueva
        var miniCalendarDiv = document.getElementById("mini-calendar");
        miniCalendarDiv.replaceChild(newTable, miniCalendarTable);
    }

    var eventosPorFecha = {
        "2023-11-01": ["Evento 1", "Evento 2"],
        "2023-11-15": ["Evento 3"]
    };

    function eventsForDay(year, month, day) {
        var formattedDate = year + "-" + (month + 1).toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0');

        if(eventosPorFecha[formattedDate]) {
            return eventosPorFecha[formattedDate];
        }else {
            return [];
        }
    }

});