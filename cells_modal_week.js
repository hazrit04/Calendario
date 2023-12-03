"use strict";

// Abrir modal en click celdas
document.addEventListener('DOMContentLoaded', function () {
    // celdas de la tabla
    var cells = document.querySelectorAll('td[data-hour][data-day]');

    // controlador clic cada celda
    cells.forEach(function (cell) {
        cell.addEventListener('click', function () {
            // hora y el día 
            var hour = cell.getAttribute('data-hour');

            // el modal con datos predeterminados
            document.getElementById('event-modal').style.display = 'block';
            document.getElementById('event-time').value = hour;
        });
    });

    // controlador cierre de modal
    document.getElementById('close-modal').addEventListener('click', function () {
        document.getElementById('event-modal').style.display = 'none';
    });
});

function openModalWithHour(hour) {
  document.getElementById('event-modal').style.display = 'block';
  document.getElementById('event-time').value = hour.getHours();
}



// Cambio de semana
var weekDatesElement = document.getElementById("week-dates");
      var currentDate = new Date(2023, 10, 26); // Noviembre 20, 2023
      updateWeekDates();
      updateWeek();

    function changeWeek(direction) {
        currentDate.setDate(currentDate.getDate() + (direction * 7));
        updateWeekDates();
        updateWeek();
    }

    function updateWeekDates() {
        var startOfWeek = new Date(currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Obtener el primer día de la semana
        var endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6); // Obtener el último día de la semana

        var startDay = startOfWeek.getDate();
        var startMonth = startOfWeek.toLocaleString('default', { month: 'long' });
        var endDay = endOfWeek.getDate();
        var endMonth = endOfWeek.toLocaleString('default', { month: 'long' });

        var weekDates = startDay + " " + startMonth + " - " + endDay + " " + endMonth + " " + endOfWeek.getFullYear();
        weekDatesElement.textContent = weekDates;
        document.getElementById("domingo").textContent = "Domingo "+ startDay;
        document.getElementById("lunes").textContent = "Lunes";
        document.getElementById("martes").textContent = "Martes";
        document.getElementById("miercoles").textContent = "Miércoles";
        document.getElementById("jueves").textContent = "Jueves";
        document.getElementById("viernes").textContent = "Viernes";
        document.getElementById("sabado").textContent = "Sábado";

        }

        function updateWeekCalendar(year, month) {
          // Crear nueva tabla
          var calendarTable = document.getElementById("calendar").querySelector("table");
          var newTable = document.createElement('table');
          newTable.setAttribute('class', calendarTable.getAttribute('class'));
      
          // Cabecera estática con días de la semana
          var headerRow = newTable.createTHead().insertRow();
          var daysOfWeek = ["Hora", "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
          for (var i = 0; i < 8; i++) {
              var cell = document.createElement('th');
              cell.innerHTML = daysOfWeek[i];
              headerRow.appendChild(cell);
          }
      
          // Obtener la hora actual
          var currentHour = new Date().getHours();
      
          // Generar filas
          for (var hour = 0; hour < 24; hour++) {
              var row = newTable.insertRow();
      
              for (var day = 0; day < 8; day++) {
                  var cell = row.insertCell();
      
                  if (day === 0) {
                      // Columna de horas
                      cell.innerHTML = hour + ":00";
                  } else {
                      // Columnas de días
                      var dayOfMonth = month === undefined ? day : month * 7 + day + 1;
                      var currentDate = new Date(year, 0, dayOfMonth, hour);
      
                      if (currentDate.getHours() === currentHour) {
                          // Marcar la hora actual
                          cell.classList.add("current-hour");
                      }
      
                      // Puedes seguir con la lógica para resaltar días con eventos, etc.
                      // ...
      
                      // Ejemplo: Agregar evento de clic en la celda
                      cell.addEventListener("click", function (event) {
                          var clickedDay = event.target.innerHTML;
                          var clickedHour = event.target.parentNode.firstChild.innerHTML;
                          var clickedDate = new Date(year, 0, clickedDay, clickedHour);
      
                          openModal();
      
                          // Utiliza clickedDate para lo que necesites
                          console.log(clickedDate);
                      });
                  }
              }
          }
      
          // Reemplazar la tabla antigua con la nueva
          calendarTable.parentNode.replaceChild(newTable, calendarTable);
      }

      

        