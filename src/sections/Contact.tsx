/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import GmailIcon from "@/assets/icons/google-gmail.svg";
import OutlookIcon from "@/assets/icons/ms-outlook.svg";
import grainImage from "@/assets/images/grain.jpg";

const ContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "jaruphat.kp@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset สถานะหลัง 2 วินาที
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900 hover:bg-gray-800 transition-all"
      >
        <span className="font-semibold">Contact Me</span>
        <ArrowUpRightIcon className="size-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Get in touch</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                  <span className="text-xl">✕</span>
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📋</span>
                    <span className="font-medium text-gray-200">Copy Email Address</span>
                  </div>
                  {copied ? (
                    <span className="text-xs font-bold text-green-400">Copied!</span>
                  ) : (
                    <span className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">Click to copy</span>
                  )}
                </button>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                  target="_blank"
                  className="w-full flex items-center gap-3 p-4 rounded-xl border border-red-800 text-red-300 bg-red-800 hover:bg-red-700 transition-colors"
                >
                  <GmailIcon className="size-5" />
                  <span className="font-medium">Open in Gmail</span>
                </a>
                <a
                  href={`https://outlook.office.com/mail/deeplink/compose?to=${email}`}
                  target="_blank"
                  className="w-full flex items-center gap-3 p-4 rounded-xl border border-blue-800 text-blue-300 bg-blue-800 hover:bg-blue-700 transition-colors"
                >
                  <OutlookIcon className="size-5" />
                  <span className="font-medium">Open in Outlook</span>
                </a>
              </div>
            </div>
            
            <div className="bg-gray-800 p-4 text-center">
               <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ContactSection = () => {
  return (
    <div id="contact" className="py-16 pt-12 lg:py-24 lg:pt-20">
      <div className="container">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-0">
          <div
            className="absolute inset-0 opacity-5 -z-10"
            style={{ backgroundImage: `url(${grainImage.src})` }}
          ></div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                Ready to Grow Your Team?
              </h2>
              <p className="text-sm md:text-base mt-2">
                I'm currently looking for new opportunities and would love to discuss how I can contribute to your company's success.
              </p>
            </div>
            <div>
              <ContactModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
