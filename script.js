// Dynamic copyright year
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile menu toggle
var mobileToggle = document.getElementById('mobile-toggle');
if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        document.getElementById('nav-links').classList.toggle('active');
    });
}

// Mobile dropdown toggle
document.querySelectorAll('.nav-dropdown > a').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        }
    });
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        var toggle = document.getElementById('mobile-toggle');
        if (toggle) toggle.classList.remove('active');
        var navLinks = document.getElementById('nav-links');
        if (navLinks) navLinks.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            var navHeight = document.getElementById('navbar').offsetHeight;
            var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});

// Netlify form submission with success modal (only on pages with the form)
var form = document.getElementById('quote-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var submitBtn = form.querySelector('.btn-full');
        var originalText = submitBtn.textContent;
        var spinner = document.createElement('i');
        spinner.className = 'fas fa-spinner fa-spin';
        submitBtn.textContent = ' Sending...';
        submitBtn.insertBefore(spinner, submitBtn.firstChild);
        submitBtn.disabled = true;

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(new FormData(form)).toString()
        }).then(function() {
            submitBtn.textContent = '';
            var icon = document.createElement('i');
            icon.className = 'fas fa-paper-plane';
            submitBtn.appendChild(icon);
            submitBtn.appendChild(document.createTextNode(' Get My Quote'));
            submitBtn.disabled = false;
            form.reset();
            document.getElementById('success-modal').style.display = 'flex';
        }).catch(function() {
            submitBtn.textContent = '';
            var icon = document.createElement('i');
            icon.className = 'fas fa-paper-plane';
            submitBtn.appendChild(icon);
            submitBtn.appendChild(document.createTextNode(' Get My Quote'));
            submitBtn.disabled = false;
            alert('Something went wrong. Please call us at (708) 497-8893.');
        });
    });
}

// Modal close (only on pages with the modal)
var closeModalBtn = document.getElementById('close-modal');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        document.getElementById('success-modal').style.display = 'none';
    });
}

window.addEventListener('click', function(e) {
    var modal = document.getElementById('success-modal');
    if (modal && e.target === modal) {
        modal.style.display = 'none';
    }
});
