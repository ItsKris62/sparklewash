import { useState } from 'react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I book a laundry service?',
      answer: 'You can easily book a service by signing up or logging into your account, selecting the service you need, and scheduling a pickup.',
    },
    {
      question: 'Do you offer same-day delivery?',
      answer: 'Yes, we offer same-day delivery for laundry services depending on your location. Contact us to find out if this service is available in your area.',
    },
    {
      question: 'How can I track my order?',
      answer: 'After placing an order, you can track the status of your laundry through your account dashboard under the "Orders" section.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards, PayPal, and mobile payments.',
    },
    {
      question: 'Can I cancel or modify my order?',
      answer: 'Yes, you can modify or cancel your order up until it’s picked up. Once in progress, changes cannot be made.',
    },
  ];

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 py-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">{faq.question}</h3>
              <span className="text-gray-700">{openFAQ === index ? '-' : '+'}</span>
            </div>
            {openFAQ === index && (
              <p className="mt-2 text-gray-600 transition-all duration-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
