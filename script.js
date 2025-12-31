// Typewriter Effect
const phrases = [
  "Computer Science student at York University",
  "I love building software",
  "Exploring new technologies",
  "Seeking Summer 2026 Internship Opportunities",
  "Backend & Full-Stack Developer",
  "Problem solver at heart",
  "Always learning something new"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

const typewriterElement = document.getElementById('typewriter');
const typingSpeed = 80;
const deletingSpeed = 50;
const pauseTime = 2000; // Pause after typing complete phrase
const deleteDelay = 1000; // Pause before starting to delete

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  
  if (!isDeleting && !isPaused) {
    // Typing
    if (charIndex < currentPhrase.length) {
      typewriterElement.textContent += currentPhrase.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      // Finished typing, pause before deleting
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        typeWriter();
      }, pauseTime);
    }
  } else if (isDeleting && !isPaused) {
    // Deleting
    if (charIndex > 0) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeWriter, deletingSpeed);
    } else {
      // Finished deleting, move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, deleteDelay);
    }
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize typewriter when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    typeWriter();
  }, 500);
});