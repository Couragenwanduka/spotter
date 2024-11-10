import React, { FC } from 'react';
import { TbWorld } from 'react-icons/tb';
import { IoLocationOutline } from 'react-icons/io5';
import { GrCurrency } from 'react-icons/gr';

interface Props {
  location?: string;
}
const Footer: FC<Props> = ({ location }) => {
  return (
    <main className="flex flex-col justify-center items-center mt-5 border-t border-b border-[#5f6368] md:h-[15rem] md:w-[69rem] md:ml-[9%] ">
      <div className="flex flex-col md:flex-row gap-10">
        <button className="flex justify-center items-center border rounded-3xl border-[#5f6368] text-[#8ab4f8] text-sm gap-5 pl-4 pr-4 h-8 focus:outline-none outline-none focus:ring-0 ">
          <TbWorld /> Language English (United Kingdom)
        </button>
        <button className="flex justify-center items-center border rounded-3xl border-[#5f6368] text-[#8ab4f8] text-sm gap-5 pl-4 pr-4 h-8">
          <IoLocationOutline />
          {location ? location : 'Location'}
        </button>
        <button className="flex justify-center items-center border rounded-3xl border-[#5f6368] text-[#8ab4f8] text-sm gap-5 pl-4 pr-4 h-8">
          <GrCurrency />
          {location ? location : 'Money'}
        </button>
      </div>

      <div className="break-words md:w-[40rem] text-[14px] mt-5 md:ml-8 text-center text-[#9aa0a6]">
        <p>
          Current language and currency options applied: English (United
          Kingdom) - {location ? location : 'Location'} - NGN Displayed
          currencies may differ from the currencies used to purchase flights.{' '}
          <a
            className="text-[#8ab4f8] underline"
            href="https://www.google.com/googlefinance/disclaimer?hl=en-GB&gl=NG"
          >
            Learn more
          </a>{' '}
        </p>
      </div>

      <div className=" gap-10 mt-5 text-[#8ab4f8]  hidden md:flex ">
        <p>About</p>
        <p>Privacy</p>
        <p>Terms</p>
        <p>Join user studies</p>
        <p>Feedback</p>
        <p>Help Centre</p>
      </div>
      <div className="flex  flex-col gap-10 mt-5 text-[#8ab4f8] md:hidden text-center ">
       <div className='flex gap-10'>
       <p>About</p>
        <p>Privacy</p>
        <p>Terms</p>
       </div>
        <div className='flex gap-10'>
        <p>Join user studies</p>
        <p>Feedback</p>
        <p>Help Centre</p>
        </div>
      </div>
    </main>
  );
};

export default Footer;
