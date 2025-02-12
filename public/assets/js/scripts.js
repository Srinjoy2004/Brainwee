// Toggle popup visibility and add blur to main content
function openPopup(type) {
  document.getElementById(type + "-popup").style.display = "block";
  document.querySelector(".main-content").classList.add("blur");
}

function closePopup(type) {
  document.getElementById(type + "-popup").style.display = "none";
  document.querySelector(".main-content").classList.remove("blur");
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Toggle menu display on small screens
function toggleMenu() {
  var navLinks = document.getElementById("nav-links");
  if (navLinks.style.display === "flex" || navLinks.style.display === "block") {
    navLinks.style.display = "none";
  } else {
    // Depending on screen size, display as block (for vertical stacking)
    navLinks.style.display = window.innerWidth <= 768 ? "block" : "flex";
  }
}

// Add animation on scroll
window.addEventListener("scroll", function () {
  const features = document.querySelectorAll(".feature-card");
  features.forEach((feature) => {
    const position = feature.getBoundingClientRect();
    if (position.top < window.innerHeight) {
      feature.style.opacity = "1";
    }
  });
});

// Function to clear the Analyse Patient section
function clearAnalysePatient() {
  // Reset the Analyse Patient form
  var analyseForm = document.getElementById("analyse-form");
  if (analyseForm) {
    analyseForm.reset();
  }
  // Hide the detection result and clear its content
  var detectionResult = document.getElementById("detection-result");
  if (detectionResult) {
    detectionResult.style.display = "none";
    detectionResult.innerHTML = "";
  }
  // Hide the tumour details
  var tumourDetails = document.getElementById("tumour-details");
  if (tumourDetails) {
    tumourDetails.style.display = "none";
  }
}

// Function to show the selected section and update active class for menu items
function showSection(sectionId, element) {
  // Before switching sections, if leaving Analyse Patient, clear its contents.
  if (sectionId !== "analyse-patient") {
    clearAnalysePatient();
  }

  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");

  // Remove active class from all menu items and add to the selected one
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active");
  });
  if (element) {
    element.classList.add("active");
  }

  // If on mobile, hide sidebar after selection
  if (window.innerWidth <= 768) {
    toggleSidebar();
  }

  // Removed automatic analysis run here;
  // Analysis will now only be triggered by the Generate button.
}

// Toggle sidebar for mobile view
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// Placeholder logout function
function logout() {
  alert("Logging out...");
  // Implement your logout functionality here
}

// Handle Add Patient form submission and simulate processing steps
document
  .getElementById("add-patient-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Hide the form and show the progress container
    this.style.display = "none";
    var progressContainer = document.getElementById("progress-container");
    progressContainer.style.display = "block";
    var progressMessage = document.getElementById("progress-message");

    progressMessage.innerText = "Processing...";

    // Simulate processing steps using timeouts
    setTimeout(function () {
      progressMessage.innerText = "Analyzing...";
    }, 2000);

    setTimeout(function () {
      progressMessage.innerText = "Almost Done...";
    }, 4000);

    setTimeout(function () {
      progressMessage.innerText = "Analysis Complete!";
      setTimeout(function () {
        // Reset the form and hide the progress container before transitioning
        var addPatientForm = document.getElementById("add-patient-form");
        addPatientForm.reset();
        addPatientForm.style.display = "block";
        progressContainer.style.display = "none";
        // Automatically switch to the Analyse Patient section by simulating a click
        document.getElementById("menu-analyse").click();
      }, 1000);
    }, 6000);
  });

// Placeholder function for Search Patient
function searchPatient() {
  var query = document.getElementById("search-query").value;
  if (query) {
    alert("Searching for: " + query);
    // Add your search functionality here.
  } else {
    alert("Please enter a patient ID or name.");
  }
}

// Function to simulate brain tumour detection and show analysis details
function runAnalysis() {
  var detectionResult = document.getElementById("detection-result");
  var tumourDetails = document.getElementById("tumour-details");
  // For demonstration, we set tumourDetected to true.
  // In a real application, this would be determined by your AI analysis.
  var tumourDetected = true;
  if (tumourDetected) {
    detectionResult.innerHTML =
      "<p><strong>Brain Tumour Detection:</strong> Yes</p>";
    // Use "grid" to match your CSS grid layout for tumour-details
    tumourDetails.style.display = "grid";
  } else {
    detectionResult.innerHTML =
      "<p><strong>Brain Tumour Detection:</strong> No</p>";
    tumourDetails.style.display = "none";
  }
  // Show the detection result
  detectionResult.style.display = "block";
}

// Handle the Analyse Patient form submission (Generate button click)
document
  .getElementById("analyse-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Run the analysis simulation only when the form is submitted.
    runAnalysis();
  });

// Chat functionality: Send message when the send button is clicked
document.getElementById("send-button").addEventListener("click", function () {
  var messageInput = document.getElementById("chat-input");
  var messageText = messageInput.value;
  if (messageText.trim() !== "") {
    var chatMessages = document.getElementById("chat-messages");
    var messageDiv = document.createElement("div");
    messageDiv.textContent = messageText;
    messageDiv.className = "chat-message";
    chatMessages.appendChild(messageDiv);
    messageInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

// Optional: Handle file attachment selection
document
  .getElementById("attachment-input")
  .addEventListener("change", function () {
    if (this.files && this.files.length > 0) {
      var fileName = this.files[0].name;
      // Display the attached file name in the chat messages area as a system message
      var chatMessages = document.getElementById("chat-messages");
      var fileMessage = document.createElement("div");
      fileMessage.textContent = "Attached file: " + fileName;
      fileMessage.className = "chat-message system";
      chatMessages.appendChild(fileMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });

// Optional: Close sidebar when clicking outside on mobile devices
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  const header = document.querySelector(".dashboard-header");
  if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
    if (!sidebar.contains(e.target) && !header.contains(e.target)) {
      toggleSidebar();
    }
  }
});
