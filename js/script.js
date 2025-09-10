/* 
File: style.css
Student: Aidan Javidpour
Date: 09-09-2025
Description: Code for the Pokémon type chart
*/

// Main function for type chart buttons
(function () {
  const chart = document.getElementById('typeChart');
  const rows = Array.from(chart.querySelectorAll('tbody tr'));
  const checks = Array.from(document.querySelectorAll('#typeFilters input[name="type"]'));
  const selectAllBtn = document.getElementById('selectAllBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');

  function applyFilter() {
    const allowed = new Set(checks.filter(c => c.checked).map(c => c.value));
    let anyVisible = false;

    rows.forEach(row => {
      const t = row.getAttribute('data-type');
      const show = allowed.has(t);
      row.style.display = show ? '' : 'none';
      if (show) anyVisible = true;
    });

    // Placeholder row when nothing is selected
    const tbody = chart.querySelector('tbody');
    let placeholder = document.getElementById('noDataRow');
    if (!anyVisible) {
      if (!placeholder) {
        placeholder = document.createElement('tr');
        placeholder.id = 'noDataRow';
        const td = document.createElement('td');
        td.colSpan = 4;
        td.style.textAlign = 'center';
        td.style.fontStyle = 'italic';
        td.style.opacity = '.8';
        td.textContent = 'No types selected';
        placeholder.appendChild(td);
        tbody.appendChild(placeholder);
      }
    } else if (placeholder) {
      placeholder.remove();
    }
  }

  // Event listeners
  checks.forEach(chk => chk.addEventListener('change', applyFilter));
  selectAllBtn.addEventListener('click', () => {
    checks.forEach(c => c.checked = true);
    applyFilter();
  });
  clearAllBtn.addEventListener('click', () => {
    checks.forEach(c => c.checked = false);
    applyFilter();
  });

  // Initial render
  applyFilter();
})();