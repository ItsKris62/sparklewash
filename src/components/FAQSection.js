import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
    <section className="my-16 px-4 sm:px-6 lg:px-0">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-navy">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-b ${openFAQ === index ? 'border-blue-500' : 'border-gray-300'} py-4 sm:py-6`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg sm:text-xl font-medium text-gray-800">{faq.question}</h3>
              <span className="text-blue-500 transition-transform duration-300">
                {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {openFAQ === index && (
              <p className="mt-3 sm:mt-4 text-gray-600 text-base sm:text-lg transition-all duration-500 ease-in-out">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
