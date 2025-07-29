import React from 'react';
import './Help.css';

const HelpPage = () => {
  return (
    <div className="help-container">
      <h2>Need Help? We’re Here for You!</h2>

      <section className="help-section">
        <h3>📘 Getting Started</h3>
        <p>
          Use the sidebar to navigate between Bookings, Drivers, Reports, and more.
          Each section is designed to help you manage your Rent-A-Car operations smoothly.
        </p>
      </section>

      <section className="help-section">
        <h3>❓ Frequently Asked Questions</h3>
        <ul>
          <li><strong>Q:</strong> How do I add a new booking?<br /><strong>A:</strong> Go to the Bookings page and click "Add Booking" on the top right.</li>
          <li><strong>Q:</strong> Can I edit driver details?<br /><strong>A:</strong> Yes, head to the Drivers section and click the "Edit" button next to a driver.</li>
          <li><strong>Q:</strong> Where can I download monthly reports?<br /><strong>A:</strong> Go to the Report section and click "Export PDF" or "Export Excel".</li>
        </ul>
      </section>

      <section className="help-section">
        <h3>📞 Contact Support</h3>
        <p>If you're experiencing issues, you can reach out:</p>
        <ul>
          <li>Email: <a href="mailto:support@bismillahrentacar.com">support@bismillahrentacar.com</a></li>
          <li>WhatsApp: <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer">+92 300 1234567</a></li>
          <li>Phone: +92 51 1234567</li>
        </ul>
      </section>

      <section className="help-section">
        <h3>📄 Resources & Downloads</h3>
        <ul>
          <li><a href="/docs/user-guide.pdf" download>User Guide (PDF)</a></li>
          <li><a href="/docs/privacy-policy.pdf" download>Privacy Policy</a></li>
          <li><a href="/docs/terms-and-conditions.pdf" download>Terms & Conditions</a></li>
        </ul>
      </section>
    </div>
  );
};

export default HelpPage;
