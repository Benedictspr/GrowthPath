document.addEventListener('DOMContentLoaded', () => {
    // Set target heights for bars so they animate correctly via CSS
    document.querySelector('.bar-1').style.setProperty('--target-height', '30%');
    document.querySelector('.bar-2').style.setProperty('--target-height', '50%');
    document.querySelector('.bar-3').style.setProperty('--target-height', '40%');
    document.querySelector('.bar-4').style.setProperty('--target-height', '80%');
    document.querySelector('.bar-5').style.setProperty('--target-height', '100%');

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle (simple version for demo)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            alert('Mobile menu clicked');
        });
    }

    // Interactive abstract chart hover effect
    const chart = document.querySelector('.abstract-chart');
    if (chart) {
        chart.addEventListener('mousemove', (e) => {
            const rect = chart.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Adjust the multiplier for subtle 3D rotational effect
            chart.style.transform = `rotateY(${x * -0.05}deg) rotateX(${y * 0.05}deg)`;
        });

        chart.addEventListener('mouseleave', () => {
            chart.style.transform = `rotateY(-5deg) rotateX(5deg)`;
            chart.style.transition = 'transform 0.5s ease-out';
            setTimeout(() => {
                chart.style.transition = '';
            }, 500);
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('Failed to send message: ' + (result.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred while sending the message. Please ensure the backend server is running.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                website: document.getElementById('website').value,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                meetingTime: document.getElementById('meetingTime').value,
                goal: document.getElementById('goal').value
            };

            try {
                const response = await fetch('http://localhost:3000/api/book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Booking submitted successfully! We will see you at the chosen time.');
                    bookingForm.reset();
                } else {
                    alert('Failed to submit booking: ' + (result.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred while submitting the form. Please check the server connection.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
