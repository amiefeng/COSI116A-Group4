// Calendar Visualization with D3 and Year Selection
document.addEventListener('DOMContentLoaded', () => {
    const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June',
        'July', 'August', 'September',
        'October', 'November', 'December'
    ];

    // Years to include in the selection
    const years = ['All Years', ...Array.from({ length: 9 }, (_, i) => 2016 + i)];

    // Select the calendar container in the HTML
    const calendarContainer = d3.select('#calendar');

    // Create a container for the entire calendar section
    const calendarWrapper = d3.select('#calendar').append('div')
        .style('display', 'flex')
        .style('gap', '20px');

    // Create year selection sidebar
    const yearSidebar = calendarWrapper.append('div')
        .attr('class', 'year-selection-sidebar')
        .style('width', '200px')
        .style('background-color', '#f9f9f9')
        .style('border', '1px solid #e0e0e0')
        .style('border-radius', '8px')
        .style('padding', '15px')
        .style('height', 'fit-content');

    // Add "Select Year(s)" heading
    yearSidebar.append('div')
        .style('text-align', 'center')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .style('margin-bottom', '15px')
        .style('color', 'rgb(109, 46, 109)')
        .text('Select Year(s)');

    // Create year selection grid
    const yearGrid = yearSidebar.append('div')
        .style('display', 'grid')
        .style('grid-template-columns', 'repeat(2, 1fr)')
        .style('grid-gap', '10px');

    // Store selected years and months
    let selectedYears = ['All Years'];
    let selectedMonths = [];

    // Function to toggle year selection
    function toggleYearSelection(year) {
        if (year === 'All Years') {
            selectedYears = ['All Years'];
            yearGrid.selectAll('.year-cell')
                .style('background-color', d => d === 'All Years' ? 'rgb(109, 46, 109)' : '#fff')
                .style('color', d => d === 'All Years' ? '#fff' : '#000');
        } else {
            if (selectedYears.includes('All Years')) {
                selectedYears = [];
            }

            if (selectedYears.includes(year)) {
                selectedYears = selectedYears.filter(y => y !== year);
            } else {
                selectedYears.push(year);
            }

            yearGrid.selectAll('.year-cell')
                .style('background-color', d => selectedYears.includes(d) ? 'rgb(109, 46, 109)' : '#fff')
                .style('color', d => selectedYears.includes(d) ? '#fff' : '#000');
        }
        updateCalendar();
    }

    // Create year selection buttons
    yearGrid.selectAll('.year-cell')
        .data(years)
        .enter()
        .append('div')
        .attr('class', 'year-cell')
        .style('border', '1px solid #ccc')
        .style('padding', '10px') 
        .style('text-align', 'center')
        .style('cursor', 'pointer')
        .style('background-color', d => d === 'All Years' ? 'rgb(109, 46, 109)' : '#fff')
        .style('color', d => d === 'All Years' ? '#fff' : '#000')
        .text(d => d)
        .on('click', function(d) {
            toggleYearSelection(d);
        });

    // Create a container for the calendar grid
    const calendarContent = calendarWrapper.append('div')
        .attr('class', 'calendar-content')
        .style('flex-grow', '1')
        .style('position', 'relative'); // For positioning reset button

    // Add reset button
    const resetButton = calendarContent.append('div')
        .attr('class', 'reset-button')
        .style('position', 'absolute')
        .style('bottom', '10px')
        .style('right', '10px')
        .style('background-color', 'rgb(109, 46, 109)')
        .style('color', '#fff')
        .style('padding', '5px 10px')
        .style('border-radius', '5px')
        .style('cursor', 'pointer')
        .style('font-size', '12px')
        .text('Reset')
        .on('click', () => {
            selectedMonths = [];
            calendarContent.selectAll('.month-cell')
                .style('background-color', '#fff')
                .style('color', '#000');
        });

    // Function to update calendar
    function updateCalendar() {
        const currentYear = selectedYears.includes('All Years') ? 'All Years' : selectedYears.join(', ');
        createCalendar(currentYear);
    }

    // Function to toggle month selection
    function toggleMonthSelection(month) {
        if (selectedMonths.includes(month)) {
            selectedMonths = selectedMonths.filter(m => m !== month);
        } else {
            selectedMonths.push(month);
        }

        calendarContent.selectAll('.month-cell')
            .style('background-color', d => selectedMonths.includes(d) ? 'rgb(109, 46, 109)' : '#fff')
            .style('color', d => selectedMonths.includes(d) ? '#fff' : '#000');
    }

    // Function to create the calendar
    function createCalendar(year) {
        // Clear any existing calendar
        calendarContent.selectAll('*').filter(':not(.reset-button)').remove();

        // Create year heading
        calendarContent.append('div')
            .attr('class', 'calendar-year-heading')
            .style('text-align', 'center')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .style('margin-bottom', '20px')
            .style('color', 'rgb(109, 46, 109)')
            .text(`Select Month(s)`);

        // Create a grid for months
        const monthGrid = calendarContent.append('div')
            .attr('class', 'month-grid')
            .style('display', 'grid')
            .style('grid-template-columns', 'repeat(3, 1fr)')
            .style('grid-gap', '10px');

        // Create month cells
        monthGrid.selectAll('.month-cell')
            .data(monthNames)
            .enter()
            .append('div')
            .attr('class', 'month-cell')
            .style('border', '1px solid #ccc')
            .style('padding', '10px')
            .style('text-align', 'center')
            .style('cursor', 'pointer')
            .style('background-color', d => selectedMonths.includes(d) ? 'rgb(109, 46, 109)' : '#fff')
            .style('color', d => selectedMonths.includes(d) ? '#fff' : '#000')
            .text(d => d)
            .on('click', function(d) {
                toggleMonthSelection(d);
            });
    }

    // Initialize calendar with "All Years"
    createCalendar('All Years');
});
