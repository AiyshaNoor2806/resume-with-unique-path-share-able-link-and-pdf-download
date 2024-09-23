interface ResumeData {
    name: string;
    email: string;
    phone: string;
    address: string;
    skills: string[];
    education: string;
    experience: {
        company: string;
        designation: string;
        details: string;
    };
    languages: string[];
}

// Function to handle form submission
function handleFormSubmit(event: Event): void {
    event.preventDefault();

    const resumeData: ResumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value.trim(),
        email: (document.getElementById('email') as HTMLInputElement).value.trim(),
        phone: (document.getElementById('phone') as HTMLInputElement).value.trim(),
        address: (document.getElementById('address') as HTMLInputElement).value.trim(),
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value.trim().split('\n'),
        education: (document.getElementById('education') as HTMLTextAreaElement).value.trim(),
        experience: {
            company: (document.getElementById('company-name') as HTMLInputElement).value.trim(),
            designation: (document.getElementById('designation-name') as HTMLInputElement).value.trim(),
            details: (document.getElementById('experience-details') as HTMLTextAreaElement).value.trim(),
        },
        languages: (document.getElementById('languages') as HTMLTextAreaElement).value.trim().split('\n'),
    };

    const resumeId = Date.now().toString();
    localStorage.setItem(`resume-${resumeId}`, JSON.stringify(resumeData));

    const shareableLink = `${window.location.origin}/resume.html?id=${resumeId}`;
    generateResumePreview(resumeData, shareableLink);
}

// Function to generate and display the editable resume preview
function generateResumePreview(data: ResumeData, shareableLink: string): void {
    const previewElement = document.getElementById('resume-preview') as HTMLElement;

    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }

    previewElement.scrollIntoView({ behavior: 'smooth' });

    previewElement.innerHTML = `
        <div>
            <h2>Editable Resume by Aiysha Noor</h2>
            <section class="sec1">
                <h2><input type="text" id="edit-name" value="${data.name}" /></h2>
                <p><strong>Email:</strong> <input type="email" id="edit-email" value="${data.email}" /></p>
                <p><strong>Phone:</strong> <input type="tel" id="edit-phone" value="${data.phone}" /></p>
                <p><strong>Address:</strong> <input type="text" id="edit-address" value="${data.address}" /></p>
            </section>
            <section class="sec2">
                <h3>Education</h3>
                <textarea id="edit-education">${data.education}</textarea>
                <h3>Experience</h3>
                <p><strong>Company:</strong> <input type="text" id="edit-company" value="${data.experience.company}" /></p>
                <p><strong>Designation:</strong> <input type="text" id="edit-designation" value="${data.experience.designation}" /></p>
                <p><strong>Details:</strong> <textarea id="edit-details">${data.experience.details}</textarea></p>
                <h3>Skills</h3>
                <textarea id="edit-skills">${data.skills.join('\n')}</textarea>
                <h3>Languages</h3>
                <textarea id="edit-languages">${data.languages.join('\n')}</textarea>
            </section>
            <h3>Shareable Link:</h3>
            <input type="text" value="${shareableLink}" readonly />
            <button id="save-resume">Save</button>
            <button id="download-resume">Download as PDF</button>
        </div>
    `;

    const saveButton = document.getElementById('save-resume') as HTMLButtonElement;
    if (saveButton) {
        saveButton.addEventListener('click', saveResume);
    }

    const downloadButton = document.getElementById('download-resume') as HTMLButtonElement;
    if (downloadButton) {
        downloadButton.addEventListener('click', () => downloadResume(data));
    }
}

// Function to save the edited resume data
function saveResume(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('id'); // Get the resume ID from the URL

    if (!resumeId) {
        console.error('Resume ID not found in URL');
        return;
    }

    const resumeData: ResumeData = {
        name: (document.getElementById('edit-name') as HTMLInputElement).value.trim(),
        email: (document.getElementById('edit-email') as HTMLInputElement).value.trim(),
        phone: (document.getElementById('edit-phone') as HTMLInputElement).value.trim(),
        address: (document.getElementById('edit-address') as HTMLInputElement).value.trim(),
        skills: (document.getElementById('edit-skills') as HTMLTextAreaElement).value.trim().split('\n'),
        education: (document.getElementById('edit-education') as HTMLTextAreaElement).value.trim(),
        experience: {
            company: (document.getElementById('edit-company') as HTMLInputElement).value.trim(),
            designation: (document.getElementById('edit-designation') as HTMLInputElement).value.trim(),
            details: (document.getElementById('edit-details') as HTMLTextAreaElement).value.trim(),
        },
        languages: (document.getElementById('edit-languages') as HTMLTextAreaElement).value.trim().split('\n'),
    };

    localStorage.setItem(`resume-${resumeId}`, JSON.stringify(resumeData));
    console.log('Updated Resume Data:', resumeData);
}

// Function to download the resume as a PDF
// Function to download the resume as a PDF
function downloadResume(data: ResumeData): void {
    const { jsPDF } = window.jspdf; // Ensure you're accessing jsPDF correctly

    const doc = new jsPDF(); // Create a new PDF document

    doc.setFontSize(22);
    doc.text('Editable Resume by Aiysha Noor', 14, 20);
    doc.setFontSize(16);
    doc.text(`Name: ${data.name}`, 14, 40);
    doc.text(`Email: ${data.email}`, 14, 50);
    doc.text(`Phone: ${data.phone}`, 14, 60);
    doc.text(`Address: ${data.address}`, 14, 70);
    doc.text(`Education: ${data.education}`, 14, 90);
    doc.text(`Company: ${data.experience.company}`, 14, 110);
    doc.text(`Designation: ${data.experience.designation}`, 14, 120);
    doc.text(`Experience Details: ${data.experience.details}`, 14, 130);
    doc.text(`Skills: ${data.skills.join(', ')}`, 14, 150);
    doc.text(`Languages: ${data.languages.join(', ')}`, 14, 160);

    doc.save('resume.pdf');
}


// Function to initialize form event listeners
function initializeForm(): void {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Could not find resume-form element.');
    }
}

// Initialize form when the document is fully loaded
window.addEventListener('DOMContentLoaded', initializeForm);
