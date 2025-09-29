// RadioLand Station Finder - JavaScript

// API Configuration
const API_BASE_URL = 'http://52.151.197.43/';
const PHILLY_LAT = '39.87279';
const PHILLY_LON = '-74.6647';

// Main search function - STUDENTS WILL COMPLETE THIS
function searchStation() {
    const callsign = document.getElementById('callsignInput').value.trim().toUpperCase();

    // Validate input
    if (!callsign) {
        showError('Please enter a call sign (e.g., WMMR, KYW, WXPN)');
        return;
    }

    if (callsign.length < 3 || callsign.length > 6) {
        showError('Call signs are typically 3-6 characters (e.g., KYW, WMMR)');
        return;
    }

    // Show loading state
    showLoading();
    hideError();
    hideResults();

    // TODO: STUDENTS COMPLETE THIS SECTION
    // 1. Build the API URL using the constants above and the callsign variable
    // 2. Make a fetch request to the RadioLand API
    // 3. Handle the response and call showResults()
    // 4. Handle errors and call showError()

    // HINT: The full URL should look like:
    // http://52.151.197.43/?lat=39.87279&lon=-74.6647&search_freq=none&callsign=WMMR&request_type=4&pi_code=none&sig_strength=null&startMiles=none&miles=null&format=none&rxHeight=10&measurementUnit=meters

    // FOR TESTING: Uncomment this line to see what a successful response looks like
    // showError('API integration not yet implemented. Complete the fetch request in searchStation() function.');
}

// Handle Enter key in search input
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        searchStation();
    }
}

// Display loading state
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Display error messages
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    document.getElementById('error').classList.add('hidden');
}

// Display search results - PROVIDED FOR STUDENTS
function showResults(stationData) {
    const resultsDiv = document.getElementById('results');

    // Check if we got valid data
    if (!stationData.data || stationData.data.length === 0) {
        showError('No station found with that call sign. Try WMMR, KYW, WXPN, WDAS, or WXTU.');
        return;
    }

    const station = stationData.data[0]; // Get the first result

    // Build the HTML for displaying station information
    resultsDiv.innerHTML = `
        <div class="station-card">
            <div class="station-header">
                <div class="frequency-badge">${station.frequency} ${station.service_code || 'FM'}</div>
                <div class="callsign">${station.callsign}</div>
            </div>

            ${station.slogan ? `<div class="slogan">"${station.slogan}"</div>` : ''}

            <div class="station-details">
                <div class="detail-item">
                    <div class="detail-label">Format</div>
                    <div class="detail-value">${station.format || 'Not specified'}</div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">Location</div>
                    <div class="detail-value">${station.city}, ${station.sp}</div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">Owner</div>
                    <div class="detail-value">${station.owner}</div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">Market</div>
                    <div class="detail-value">${station.market}</div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">Distance</div>
                    <div class="detail-value">${station.distance.toFixed(1)} miles</div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">Signal Strength</div>
                    <div class="detail-value">${station.field_strength.toFixed(1)} dBuV/m</div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">Power (ERP)</div>
                    <div class="detail-value">${station.erp} kW</div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">Class</div>
                    <div class="detail-value">Class ${station.class || 'Unknown'}</div>
                </div>

                ${displaySportsTeams(station)}
                ${displayHDChannels(station)}
            </div>
        </div>
    `;

    resultsDiv.classList.remove('hidden');
}

function hideResults() {
    document.getElementById('results').classList.add('hidden');
}

// Helper function to display sports team affiliations
function displaySportsTeams(station) {
    const teams = [];

    if (station.mlb) teams.push(`⚾ ${station.mlb}`);
    if (station.nfl) teams.push(`🏈 ${station.nfl}`);
    if (station.nba) teams.push(`🏀 ${station.nba}`);
    if (station.nhl) teams.push(`🏒 ${station.nhl}`);

    if (teams.length === 0) {
        return '';
    }

    return `
        <div class="detail-item" style="grid-column: 1 / -1;">
            <div class="detail-label">Sports Teams</div>
            <div class="sports-teams">
                ${teams.map(team => `<span class="sports-team">${team}</span>`).join('')}
            </div>
        </div>
    `;
}

// Helper function to display HD radio channels
function displayHDChannels(station) {
    const hdChannels = [];

    if (station.hd2_format) {
        hdChannels.push(`HD2: ${station.hd2_format}${station.hd2_slogan ? ` (${station.hd2_slogan})` : ''}`);
    }
    if (station.hd3_format) {
        hdChannels.push(`HD3: ${station.hd3_format}${station.hd3_slogan ? ` (${station.hd3_slogan})` : ''}`);
    }
    if (station.hd4_format) {
        hdChannels.push(`HD4: ${station.hd4_format}${station.hd4_slogan ? ` (${station.hd4_slogan})` : ''}`);
    }

    if (hdChannels.length === 0) {
        return '';
    }

    return `
        <div class="detail-item" style="grid-column: 1 / -1;">
            <div class="detail-label">HD Radio Channels</div>
            <div class="detail-value">
                ${hdChannels.map(channel => `<div style="margin: 5px 0;">${channel}</div>`).join('')}
            </div>
        </div>
    `;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('📻 RadioLand Station Finder loaded');
    console.log('🎯 Your task: Complete the searchStation() function to make API calls');
    console.log('📖 Check the lab instructions for the exact fetch() code to add');

    // Focus on the input field
    document.getElementById('callsignInput').focus();
});