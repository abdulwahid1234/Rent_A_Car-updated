import React, { useState } from "react";
import "./Help.css";

const HelpPage = () => {
  const [search, setSearch] = useState("");

  const faqs = [
    {
      q: "How do I add a new booking?",
      a: "Go to the Bookings page and click 'Add Booking' at the top right."
    },
    {
      q: "Can I edit driver details?",
      a: "Yes, head to the Drivers section and click the 'Edit' button next to a driver."
    },
    {
      q: "Where can I download monthly reports?",
      a: "Go to the Report section and click 'Export PDF' or 'Export Excel'."
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

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
        <input
          type="text"
          className="faq-search"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          {filteredFaqs.map((f, i) => (
            <li key={i}>
              <strong>Q:</strong> {f.q}
              <br />
              <strong>A:</strong> {f.a}
            </li>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="muted">No results found.</p>
          )}
        </ul>
      </section>

      <section className="help-section">
        <h3>📞 Contact Support</h3>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:support@bismillahrentacar.com">
              support@bismillahrentacar.com
            </a>
          </li>
          <li>
            WhatsApp:{" "}
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer">
              +92 300 1234567
            </a>
          </li>
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
