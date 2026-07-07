import React, { useState, useEffect, useCallback } from 'react';

// ── Toast Component ──
function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 4500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] max-w-sm transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-black text-white px-6 py-4 shadow-2xl border-l-4 border-legal-gold flex items-start gap-3">
        <svg className="w-5 h-5 text-legal-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <p className="font-sans text-sm font-semibold">Submission Received</p>
          <p className="font-sans text-xs text-neutral-400 mt-1 leading-relaxed">{message}</p>
        </div>
        <button onClick={onClose} className="ml-auto text-neutral-500 hover:text-white transition-colors" aria-label="Dismiss notification">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Inline Error Helper ──
function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
}

export default function IntakeSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', summary: '' });
  const [errors, setErrors] = useState({});
  const [toastVisible, setToastVisible] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full legal name is required.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number is required.';
    } else if (!/^[+\d\s()-]{7,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.summary.trim()) newErrors.summary = 'A brief matter summary is required.';
    return newErrors;
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors
    setErrors({});

    // In a real app, this is where you'd send data to an Express/Node.js backend
    console.log("Intake captured:", formData);

    // Show toast & reset form
    setToastVisible(true);
    setFormData({ name: '', phone: '', summary: '' });
  };

  // Clear a field's error when the user starts typing in it
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="intake" className="bg-neutral-50 py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">

        {/* ── Section Heading ── */}
        <h2 className="text-3xl md:text-4xl font-serif text-black text-center">
          Schedule a Consultation
        </h2>
        <div className="h-px w-16 bg-legal-gold mx-auto mt-6 mb-4" />
        <p className="text-neutral-500 text-sm text-center max-w-lg mx-auto mb-12">
          Submit your details for a conflict check and initial case evaluation. All information is protected by attorney-client privilege.
        </p>

        {/* ── Intake Form ── */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6 font-sans text-sm">
          <div>
            <label className="block text-xs uppercase tracking-wider mb-2 text-neutral-700">Full Legal Name *</label>
            <input
              type="text"
              className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors rounded-none ${
                errors.name
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-black/20 focus:border-legal-gold'
              }`}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <FieldError message={errors.name} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-2 text-neutral-700">Contact Number *</label>
            <input
              type="tel"
              className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors rounded-none ${
                errors.phone
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-black/20 focus:border-legal-gold'
              }`}
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <FieldError message={errors.phone} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-2 text-neutral-700">Brief Matter Summary *</label>
            <textarea
              rows="5"
              className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors rounded-none resize-none ${
                errors.summary
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-black/20 focus:border-legal-gold'
              }`}
              value={formData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
            ></textarea>
            <FieldError message={errors.summary} />
          </div>
          <button type="submit" className="w-full bg-black text-white text-xs uppercase tracking-widest py-4 font-medium hover:bg-legal-gold transition-colors duration-300">
            Submit Case Evaluation Request
          </button>
        </form>

      </div>

      {/* ── Floating Toast Notification ── */}
      <Toast
        message="The chambers have received your details. We will verify our court schedule conflicts and reply shortly."
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </section>
  );
}