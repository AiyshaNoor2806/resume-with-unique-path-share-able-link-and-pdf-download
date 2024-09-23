// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    var resumeData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        skills: document.getElementById('skills').value.trim().split('\n'),
        education: document.getElementById('education').value.trim(),
        experience: {
            company: document.getElementById('company-name').value.trim(),
            designation: document.getElementById('designation-name').value.trim(),
            details: document.getElementById('experience-details').value.trim(),
        },
        languages: document.getElementById('languages').value.trim().split('\n'),
    };
    var resumeId = Date.now().toString();
    localStorage.setItem("resume-".concat(resumeId), JSON.stringify(resumeData));
    var shareableLink = "".concat(window.location.origin, "/resume.html?id=").concat(resumeId);
    generateResumePreview(resumeData, shareableLink);
}
// Function to generate and display the editable resume preview
function generateResumePreview(data, shareableLink) {
    var previewElement = document.getElementById('resume-preview');
    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }
    previewElement.scrollIntoView({ behavior: 'smooth' });
    previewElement.innerHTML = "\n        <div>\n            <h2>Editable Resume by Aiysha Noor</h2>\n            <section class=\"sec1\">\n                <h2><input type=\"text\" id=\"edit-name\" value=\"".concat(data.name, "\" /></h2>\n                <p><strong>Email:</strong> <input type=\"email\" id=\"edit-email\" value=\"").concat(data.email, "\" /></p>\n                <p><strong>Phone:</strong> <input type=\"tel\" id=\"edit-phone\" value=\"").concat(data.phone, "\" /></p>\n                <p><strong>Address:</strong> <input type=\"text\" id=\"edit-address\" value=\"").concat(data.address, "\" /></p>\n            </section>\n            <section class=\"sec2\">\n                <h3>Education</h3>\n                <textarea id=\"edit-education\">").concat(data.education, "</textarea>\n                <h3>Experience</h3>\n                <p><strong>Company:</strong> <input type=\"text\" id=\"edit-company\" value=\"").concat(data.experience.company, "\" /></p>\n                <p><strong>Designation:</strong> <input type=\"text\" id=\"edit-designation\" value=\"").concat(data.experience.designation, "\" /></p>\n                <p><strong>Details:</strong> <textarea id=\"edit-details\">").concat(data.experience.details, "</textarea></p>\n                <h3>Skills</h3>\n                <textarea id=\"edit-skills\">").concat(data.skills.join('\n'), "</textarea>\n                <h3>Languages</h3>\n                <textarea id=\"edit-languages\">").concat(data.languages.join('\n'), "</textarea>\n            </section>\n            <h3>Shareable Link:</h3>\n            <input type=\"text\" value=\"").concat(shareableLink, "\" readonly />\n            <button id=\"save-resume\">Save</button>\n            <button id=\"download-resume\">Download as PDF</button>\n        </div>\n    ");
    var saveButton = document.getElementById('save-resume');
    if (saveButton) {
        saveButton.addEventListener('click', saveResume);
    }
    var downloadButton = document.getElementById('download-resume');
    if (downloadButton) {
        downloadButton.addEventListener('click', function () { return downloadResume(data); });
    }
}
// Function to save the edited resume data
function saveResume() {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeId = urlParams.get('id'); // Get the resume ID from the URL
    if (!resumeId) {
        console.error('Resume ID not found in URL');
        return;
    }
    var resumeData = {
        name: document.getElementById('edit-name').value.trim(),
        email: document.getElementById('edit-email').value.trim(),
        phone: document.getElementById('edit-phone').value.trim(),
        address: document.getElementById('edit-address').value.trim(),
        skills: document.getElementById('edit-skills').value.trim().split('\n'),
        education: document.getElementById('edit-education').value.trim(),
        experience: {
            company: document.getElementById('edit-company').value.trim(),
            designation: document.getElementById('edit-designation').value.trim(),
            details: document.getElementById('edit-details').value.trim(),
        },
        languages: document.getElementById('edit-languages').value.trim().split('\n'),
    };
    localStorage.setItem("resume-".concat(resumeId), JSON.stringify(resumeData));
    console.log('Updated Resume Data:', resumeData);
}
// Function to download the resume as a PDF
// Function to download the resume as a PDF
function downloadResume(data) {
    var jsPDF = window.jspdf.jsPDF; // Ensure you're accessing jsPDF correctly
    var doc = new jsPDF(); // Create a new PDF document
    doc.setFontSize(22);
    doc.text('Editable Resume by Aiysha Noor', 14, 20);
    doc.setFontSize(16);
    doc.text("Name: ".concat(data.name), 14, 40);
    doc.text("Email: ".concat(data.email), 14, 50);
    doc.text("Phone: ".concat(data.phone), 14, 60);
    doc.text("Address: ".concat(data.address), 14, 70);
    doc.text("Education: ".concat(data.education), 14, 90);
    doc.text("Company: ".concat(data.experience.company), 14, 110);
    doc.text("Designation: ".concat(data.experience.designation), 14, 120);
    doc.text("Experience Details: ".concat(data.experience.details), 14, 130);
    doc.text("Skills: ".concat(data.skills.join(', ')), 14, 150);
    doc.text("Languages: ".concat(data.languages.join(', ')), 14, 160);
    doc.save('resume.pdf');
}
// Function to initialize form event listeners
function initializeForm() {
    var form = document.getElementById('resume-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    else {
        console.error('Could not find resume-form element.');
    }
}
// Initialize form when the document is fully loaded
window.addEventListener('DOMContentLoaded', initializeForm);
