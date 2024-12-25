let clubs = [];

fetch('clubs_data.json')
    .then(response => response.json())
    .then(data => {
        clubs = data;
        renderClubs(clubs);
        lucide.createIcons();
    })
    .catch(error => console.error('Error loading the club data:', error));

function renderClubs(clubsToRender) {
    const clubList = document.getElementById('clubList');
    clubList.innerHTML = '';

    clubsToRender.forEach(club => {
        const clubCard = document.createElement('div');
        clubCard.className = 'bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300';
        clubCard.innerHTML = `
            <h2 class="text-xl font-semibold text-blue-600 mb-3">${club['Club Name']}</h2>
            <p class="text-gray-600 mb-2"><strong>Advisor(s): </strong>${club['Advisor(s)']}</p>
            <p class="flex items-center text-gray-600 mb-2">
                <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-gray-500">
                    <i data-lucide="mail"></i>
                </span>
                <a href="mailto:${club['Contact']}" class="text-blue-600 hover:underline">${club['Contact']}</a>
            </p>
            <p class="flex items-center text-gray-600 mb-2">
                <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-gray-500">
                    <i data-lucide="map-pin"></i>
                </span>
                ${club['Room(s)']}
            </p>
            <p class="flex items-center text-gray-600 mb-2">
                <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-gray-500">
                    <i data-lucide="calendar"></i>
                </span>
                ${club['Meeting Day(s)']}
            </p>
            <p class="flex items-center text-gray-600">
                <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-gray-500">
                    <i data-lucide="clock"></i>
                </span>
                ${club['Frequency']}
            </p>
        `;
        clubList.appendChild(clubCard);
    });
    lucide.createIcons();
}

function filterSortClubs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const meetingDay = document.getElementById('meetingDayFilter').value;
    const frequency = document.getElementById('frequencyFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    let filteredClubs = clubs.filter(club =>
        club['Club Name'].toLowerCase().includes(searchTerm) &&
        (meetingDay === 'All' || club['Meeting Day(s)'].toLowerCase().includes(meetingDay.toLowerCase())) &&
        (frequency === 'All' || club['Frequency'].toLowerCase().includes(frequency.toLowerCase()))
    );

    filteredClubs.sort((a, b) => {
        if (sortBy === 'name') {
            return a['Club Name'].localeCompare(b['Club Name']);
        } else if (sortBy === 'advisor') {
            return a['Advisor(s)'].localeCompare(b['Advisor(s)']);
        } else if (sortBy === 'frequency') {
            return a['Frequency'].localeCompare(b['Frequency']);
        }
        return 0;
    });

    renderClubs(filteredClubs);
}

document.getElementById('searchInput').addEventListener('input', filterSortClubs);
document.getElementById('meetingDayFilter').addEventListener('change', filterSortClubs);
document.getElementById('frequencyFilter').addEventListener('change', filterSortClubs);
document.getElementById('sortBy').addEventListener('change', filterSortClubs);

