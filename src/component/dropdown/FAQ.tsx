import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const FAQ = () => {
  // State to manage which FAQ is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Example FAQ data
  const faqs = [
    {
      question: 'What are some good flight destinations from Asaba?',
      answer:
        'Some popular flight destinations from Asaba are Lagos, Abuja, Port Harcourt, Kano, Enugu, and London. To find more cheap flights to other destinations, use the Explore tool by interacting with the map above.',
    },
    {
      question: 'How do I search for flights?',
      answer:
        "You can search for flights by entering your destination and preferred dates in the search bar above. We'll find the best flights for your criteria!",
    },
    {
      question: 'Is there a mobile app?',
      answer:
        'Currently, we only have a web app, but a mobile version is in development. Stay tuned for updates!',
    },
  ];

  // Toggle the FAQ's answer visibility
  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Close the currently open FAQ if clicked again
  };

  return (
    <div className="max-w-[69rem] mx-auto mt-1 p-6 bg-transparent text-white rounded-lg  focus:outline-none outline-none">
      <div className="space-y-4 focus:outline-none outline-none">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-[#5f6368] focus:outline-none outline-none"
          >
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-white text-left text-lg font-semibold py-2 px-4 focus:outline-none focus:ring-0 hover:outline-none border-none flex justify-between items-center"
            >
              {faq.question}
              <div
                className={`h-10 w-10 flex justify-center items-center rounded-full transition-transform duration-300 focus:outline-none outline-none ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                <IoIosArrowUp />
              </div>
            </button>

            {openIndex === index && (
              <div className="p-4 mt-1 text-white bg-transparent rounded-md font-roboto text-base focus:outline-none outline-none">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
