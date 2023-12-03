"use strict";

// Funciones para abrir modal 
    
      
      function openModal() {
        document.getElementById("event-modal").style.display = "block";
      }
    
    
      function closeModal() {
        document.getElementById("event-modal").style.display = "none";
      }
      // Agregar event listener al documento
      document.addEventListener("click", function(event) {
        // Detectar si el elemento clickeado es el modal
        if (event.target == modal) {
          return;
        }
        // Si no es el modal, cerrarlo
        closeModal();
      });
      const closeBtn = document.getElementById("close-modal");
      closeBtn.addEventListener("click", closeModal);
    

    // Redirigir semana/mes 
    
      function redirectToPage() {
        var selectElement = document.getElementById("month-select");
        var selectedValue = selectElement.value;
        if (selectedValue === "Mes") {
          window.location.href = "calendar_month.html";
        } else if (selectedValue === "Semana") {
          window.location.href = "calendar_week.html";
        }
      }
    

    // Cambiar mes Left Panel 
    
      let currentMonth = 10;
      let currentYear = 2023; 

      const monthElement = document.getElementById("current-month-left");

      function changeMonth(direction) {
        currentMonth += direction;
        if(currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        if(currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }

        updateDisplay();
      }
      function updateDisplay() {
        monthElement.innerHTML = getMonthName(currentMonth) + " " + currentYear;
      }
      function getMonthName(month) {
        // array con los nombres de los meses
        let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        return monthNames[month];
      }
      document.getElementById("prev-month-left").onclick = () => {
        changeMonth(-1);
      };

      document.getElementById("next-month-left").onclick = () => {
        changeMonth(1);  
      };

      // Celdas click modal 
      const cells = document.querySelectorAll('.calendar-cell');

      cells.forEach(cell => {
        cell.addEventListener('click', openModal);
      });
      

    
    