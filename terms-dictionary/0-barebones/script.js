// Function to fetch JSON and initialize the dictionary
async function loadDictionary() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/mz3r0/front-end/refs/heads/main/terms-dictionary/ephraimduncan-awesome-developer-dictionary.json');
    const dictionaryData = await response.json();
    const terms = processJsonData(dictionaryData);
    
    // Populate the full list initially
    populateDictionary(terms);

    // Add event listener for search field
    const searchField = document.getElementById('searchField');
    searchField.addEventListener('input', function () {
      const searchText = searchField.value.toLowerCase();
      const filteredTerms = filterTerms(terms, searchText);
      populateDictionary(filteredTerms, searchText);
    });
  } catch (error) {
    console.error('Error loading dictionary:', error);
  }
}

// Function to process the JSON data into a flat array of terms
function processJsonData(dictionaryData) {
  let allTerms = [];
  for (let section of dictionaryData.sections) {
    for (let pair of section.content) {
      allTerms.push({ term: pair[0], definition: pair[1] });
    }
  }
  return allTerms;
}

// Function to populate the dictionary container
function populateDictionary(terms, searchText = '') {
  const container = document.getElementById('dictionaryContainer');
  container.innerHTML = ''; // Clear previous contents

  terms.forEach(({ term, definition }) => {
    const termDiv = document.createElement('div');
    termDiv.className = 'term';

    // Highlight matching text
    let highlightedTerm = term;
    if (searchText) {
      const regex = new RegExp(`(${searchText})`, 'gi'); // Case-insensitive match
      highlightedTerm = term.replace(regex, '<b>$1</b>'); // Wrap the match in <b>
    }

    termDiv.innerHTML = `<strong>${highlightedTerm}</strong>: ${definition}`;
    container.appendChild(termDiv);
  });
}

// Function to filter terms based on search input
function filterTerms(terms, searchText) {
  if (!searchText) {
    return terms; // If no search text, return all terms
  }
  return terms.filter(({ term }) => term.toLowerCase().includes(searchText));
}

// Load dictionary on page load
window.onload = loadDictionary;
