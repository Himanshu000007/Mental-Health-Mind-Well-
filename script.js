// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        document.getElementById('mobile-menu').classList.add('hidden');
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Assessment functionality
const questions = [
    // Mood & Emotions
    { id: 1, category: "Mood & Emotions", text: "Over the past two weeks, how often have you felt down, depressed, or hopeless?" },
    { id: 2, category: "Mood & Emotions", text: "How often do you feel satisfied with your life?" },
    { id: 3, category: "Mood & Emotions", text: "How frequently do you experience sudden mood swings?" },
    
    // Anxiety
    { id: 4, category: "Anxiety", text: "How often do you feel nervous, anxious, or on edge?" },
    { id: 5, category: "Anxiety", text: "How often do you have trouble relaxing?" },
    { id: 6, category: "Anxiety", text: "How often do you worry too much about different things?" },
    
    // Stress
    { id: 7, category: "Stress", text: "In the past month, how often have you felt that you were unable to control the important things in your life?" },
    { id: 8, category: "Stress", text: "How often do you feel overwhelmed by your responsibilities?" },
    { id: 9, category: "Stress", text: "How well do you feel you are coping with current challenges in your life?" },
    
    // Energy & Sleep
    { id: 10, category: "Energy & Sleep", text: "How would you rate your energy levels throughout the day?" },
    { id: 11, category: "Energy & Sleep", text: "How satisfied are you with your sleep quality?" },
    { id: 12, category: "Energy & Sleep", text: "How often do you have trouble falling or staying asleep?" },
    
    // Social Wellbeing
    { id: 13, category: "Social Wellbeing", text: "How satisfied are you with your personal relationships?" },
    { id: 14, category: "Social Wellbeing", text: "How connected do you feel to others around you?" },
    { id: 15, category: "Social Wellbeing", text: "How often do you feel lonely or isolated?" }
];

const personalizedResources = {
    mood: [
        {
            title: "Mood Enhancement Strategies",
            description: "Evidence-based techniques to improve mood and emotional regulation.",
            icon: "fas fa-smile"
        },
        {
            title: "Depression Support Resources",
            description: "Information and support options for managing depression symptoms.",
            icon: "fas fa-hand-holding-heart"
        }
    ],
    anxiety: [
        {
            title: "Anxiety Management Techniques",
            description: "Practical strategies to reduce anxiety and manage worry.",
            icon: "fas fa-cloud-sun"
        },
        {
            title: "Guided Relaxation Programs",
            description: "Audio guides and exercises for relaxation and stress reduction.",
            icon: "fas fa-headphones"
        }
    ],
    stress: [
        {
            title: "Stress Reduction Toolkit",
            description: "Practical tools and techniques for managing daily stress.",
            icon: "fas fa-toolbox"
        },
        {
            title: "Work-Life Balance Guide",
            description: "Strategies for creating better balance and reducing burnout.",
            icon: "fas fa-balance-scale"
        }
    ],
    energy: [
        {
            title: "Sleep Improvement Program",
            description: "Evidence-based techniques to improve sleep quality and duration.",
            icon: "fas fa-moon"
        },
        {
            title: "Energy Management Strategies",
            description: "Methods to optimize energy levels throughout the day.",
            icon: "fas fa-bolt"
        }
    ],
    social: [
        {
            title: "Social Connection Building",
            description: "Practical ways to strengthen relationships and build community.",
            icon: "fas fa-users"
        },
        {
            title: "Loneliness Coping Strategies",
            description: "Approaches to manage feelings of isolation and build meaningful connections.",
            icon: "fas fa-hands-helping"
        }
    ]
};

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);

// Function to display the current question
function displayQuestion(index) {
    const question = questions[index];
    const questionContainer = document.getElementById('question-container');
    
    // Update question number and category
    document.getElementById('current-question').textContent = index + 1;
    document.getElementById('current-category').textContent = question.category;
    
    // Create question content
    questionContainer.innerHTML = `
        <h4 class="text-xl mb-6">${question.text}</h4>
        <div class="space-y-3">
            <div class="flex items-center">
                <input type="radio" id="option1" name="answer" value="0" ${answers[index] === 0 ? 'checked' : ''} class="mr-3">
                <label for="option1" class="text-gray-700">Never</label>
            </div>
            <div class="flex items-center">
                <input type="radio" id="option2" name="answer" value="1" ${answers[index] === 1 ? 'checked' : ''} class="mr-3">
                <label for="option2" class="text-gray-700">Rarely</label>
            </div>
            <div class="flex items-center">
                <input type="radio" id="option3" name="answer" value="2" ${answers[index] === 2 ? 'checked' : ''} class="mr-3">
                <label for="option3" class="text-gray-700">Sometimes</label>
            </div>
            <div class="flex items-center">
                <input type="radio" id="option4" name="answer" value="3" ${answers[index] === 3 ? 'checked' : ''} class="mr-3">
                <label for="option4" class="text-gray-700">Often</label>
            </div>
            <div class="flex items-center">
                <input type="radio" id="option5" name="answer" value="4" ${answers[index] === 4 ? 'checked' : ''} class="mr-3">
                <label for="option5" class="text-gray-700">Always</label>
            </div>
        </div>
    `;
    
    // Update button states
    document.getElementById('prev-question').disabled = index === 0;
    if (index === questions.length - 1) {
        document.getElementById('next-question').textContent = "See Results";
    } else {
        document.getElementById('next-question').textContent = "Next";
    }

    // Add event listeners to radio buttons
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            answers[currentQuestion] = parseInt(this.value);
        });
    });
}

// Update progress bar
function updateProgressBar() {
    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
}

// Start assessment button
document.getElementById('start-assessment').addEventListener('click', function() {
    document.getElementById('assessment-intro').classList.remove('active-section');
    document.getElementById('assessment-questions').classList.add('active-section');
    displayQuestion(currentQuestion);
    updateProgressBar();
});

// Previous question button
document.getElementById('prev-question').addEventListener('click', function() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion(currentQuestion);
        updateProgressBar();
    }
});

// Next question button
document.getElementById('next-question').addEventListener('click', function() {
    // Save current answer
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        answers[currentQuestion] = parseInt(selectedOption.value);
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion(currentQuestion);
        updateProgressBar();
    } else {
        // Show results
        showResults();
    }
});

// Calculate score for a category (startIndex to endIndex, exclusive)
function calculateCategoryScore(startIndex, endIndex) {
    let score = 0;
    for (let i = startIndex; i < endIndex; i++) {
        // Some questions may need to be reverse-scored based on phrasing
        // For simplicity, we're using raw scores here
        if (answers[i] !== null) {
            score += answers[i];
        }
    }
    return score;
}

// Get friendly category name
function getCategoryName(category) {
    switch(category) {
        case 'mood': return 'Mood & Emotions';
        case 'anxiety': return 'Anxiety';
        case 'stress': return 'Stress';
        case 'energy': return 'Energy & Sleep';
        case 'social': return 'Social Wellbeing';
        default: return category;
    }
}

// Show assessment results
function showResults() {
    document.getElementById('assessment-questions').classList.remove('active-section');
    document.getElementById('assessment-results').classList.add('active-section');
    
    // Calculate scores for each category
    const scores = {
        mood: calculateCategoryScore(0, 3),
        anxiety: calculateCategoryScore(3, 6),
        stress: calculateCategoryScore(6, 9),
        energy: calculateCategoryScore(9, 12),
        social: calculateCategoryScore(12, 15)
    };
    
    // Create chart bars
    const resultsChart = document.getElementById('results-chart');
    resultsChart.innerHTML = '';
    
    for (const category in scores) {
        const score = scores[category];
        const percentage = (score / 12) * 100; // Max score per category is 12
        const height = (percentage / 100) * 200; // Max height of 200px
        
        const bar = document.createElement('div');
        bar.className = `relative flex flex-col items-center`;
        bar.innerHTML = `
            <div class="text-xs font-semibold mb-1">${Math.round(percentage)}%</div>
            <div class="bg-teal-600 rounded-t-sm w-12" style="height: ${height}px;"></div>
        `;
        resultsChart.appendChild(bar);
    }
    
    // Create summary
    const summaryContainer = document.getElementById('results-summary');
    summaryContainer.innerHTML = '';
    
    let overallConcern = 'low';
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxPossibleScore = 5 * 12; // 5 categories, max 12 points each
    const overallPercentage = (totalScore / maxPossibleScore) * 100;
    
    if (overallPercentage > 70) {
        overallConcern = 'high';
    } else if (overallPercentage > 40) {
        overallConcern = 'moderate';
    }
    
    const concernAreas = [];
    for (const category in scores) {
        const score = scores[category];
        const percentage = (score / 12) * 100;
        if (percentage > 70) {
            concernAreas.push(getCategoryName(category));
        }
    }
    
    let summaryText = '';
    if (overallConcern === 'low') {
        summaryText = `
            <p class="mb-4">Your responses suggest an overall <span class="font-semibold text-green-600">low level of concern</span> for mental health challenges at this time.</p>
            <p>This is positive news! However, mental health is an ongoing journey. We recommend exploring the resources below to maintain and further improve your wellbeing.</p>
        `;
    } else if (overallConcern === 'moderate') {
        summaryText = `
            <p class="mb-4">Your responses suggest a <span class="font-semibold text-yellow-600">moderate level of concern</span> for mental health challenges.</p>
            <p class="mb-4">Areas that may benefit from attention include: ${concernAreas.length > 0 ? concernAreas.join(', ') : 'various aspects of your mental wellbeing'}.</p>
            <p>Consider exploring the personalized resources below and connecting with a mental health professional for additional support.</p>
        `;
    } else {
        summaryText = `
            <p class="mb-4">Your responses suggest a <span class="font-semibold text-red-600">high level of concern</span> for mental health challenges.</p>
            <p class="mb-4">Areas that may benefit from immediate attention include: ${concernAreas.join(', ')}.</p>
            <p>We strongly recommend connecting with a mental health professional for proper assessment and support. Please explore the crisis resources and personalized recommendations below.</p>
        `;
    }
    
    summaryContainer.innerHTML = summaryText;
}

// View personalized resources button
document.getElementById('view-resources').addEventListener('click', function() {
    // Scroll to resources section
    document.querySelector('#resources').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Show personalized resources section
    const personalizedSection = document.getElementById('personalized-resources');
    personalizedSection.classList.remove('hidden');
    
    // Generate personalized recommendations based on results
    const recommendedContainer = document.getElementById('recommended-resources');
    recommendedContainer.innerHTML = '';
    
    // For demo purposes, show some of each category's resources
    const categories = ['mood', 'anxiety', 'stress', 'energy', 'social'];
    categories.forEach(category => {
        // Choose a random resource from each category
        const resource = personalizedResources[category][Math.floor(Math.random() * personalizedResources[category].length)];
        
        const resourceElement = document.createElement('div');
        resourceElement.className = 'resource-card bg-gray-50 p-6 rounded-lg shadow-md';
        resourceElement.innerHTML = `
            <div class="text-teal-600 mb-4">
                <i class="${resource.icon} text-3xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">${resource.title}</h3>
            <p class="text-gray-600 mb-4">${resource.description}</p>
            <button class="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-300">Learn More</button>
        `;
        
        recommendedContainer.appendChild(resourceElement);
    });
});

// Retake assessment button
document.getElementById('retake-assessment').addEventListener('click', function() {
    // Reset answers and current question
    answers = Array(questions.length).fill(null);
    currentQuestion = 0;
    
    // Show the first question
    document.getElementById('assessment-results').classList.remove('active-section');
    document.getElementById('assessment-questions').classList.add('active-section');
    displayQuestion(currentQuestion);
    updateProgressBar();
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const consent = document.getElementById('consent').checked;
    
    if (!name || !email || !message || !consent) {
        alert('Please fill in all fields and provide consent to proceed.');
        return;
    }
    
    // In a real application, you would send this data to a server
    alert('Thank you for your message! Our team will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Initialize page
window.addEventListener('load', function() {
    // Scroll to top on page load
    window.scrollTo(0, 0);
});