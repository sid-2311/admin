import React from "react";

const ServiceInputForm = ({ serviceData }) => {
  if (!serviceData) return null;

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Service Data</h2>
      {/* Example fields */}
      {serviceData.data?.heading && (
        <div className="mb-2">
          <label className="font-semibold">Heading:</label>
          <input
            type="text"
            value={serviceData.data.heading}
            className="border rounded px-2 py-1 ml-2"
            readOnly
          />
        </div>
      )}
      {serviceData.data?.description && (
        <div className="mb-2">
          <label className="font-semibold">Description:</label>
          <textarea
            value={serviceData.data.description}
            className="border rounded px-2 py-1 ml-2 w-full"
            rows={3}
            readOnly
          />
        </div>
      )}
      {/* Example for FAQ */}
      {serviceData.data?.faqItems && (
        <div className="mb-2">
          <label className="font-semibold">FAQs:</label>
          <ul className="list-disc ml-6">
            {serviceData.data.faqItems.map((faq, idx) => (
              <li key={idx}>{faq.answer}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Add more fields as needed */}
    </div>
  );
};

export default ServiceInputForm;