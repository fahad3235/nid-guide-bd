// NID Guide BD — content data (EN + বাংলা).
// Fee figures: EC NID Wing schedule as reported by The Daily Star (gazette)
// and UNB; labelled "reported" in the UI — the portal amount at application
// time is final. Process steps follow the official portal flow
// (services.nidw.gov.bd) as described in those reports.
(function (root) {
  'use strict';

  var GUIDES = [
    {
      id: 'new',
      title: { en: 'New voter registration', bn: 'নতুন ভোটার নিবন্ধন' },
      time: { en: 'About 2–4 weeks to enrolment', bn: 'নিবন্ধনে প্রায় ২–৪ সপ্তাহ' },
      steps: [
        { id: 'new-1', title: { en: 'Collect your documents', bn: 'কাগজপত্র সংগ্রহ করুন' },
          detail: { en: 'Birth certificate, SSC/JSC/HSC certificate or admit card, copies of your parents’ NID cards, a utility bill or holding-tax receipt for address proof, and a chairman / ward commissioner certificate.', bn: 'জন্ম নিবন্ধন সনদ, এসএসসি/জেএসসি/এইচএসসি সনদ বা প্রবেশপত্র, বাবা-মায়ের এনআইডি কার্ডের কপি, ঠিকানার প্রমাণ হিসেবে বিদ্যুৎ/গ্যাস বিল বা হোল্ডিং ট্যাক্সের রসিদ, এবং চেয়ারম্যান / ওয়ার্ড কমিশনারের সনদপত্র।' } },
        { id: 'new-2', title: { en: 'Fill in Form-2', bn: 'ফরম-২ পূরণ করুন' },
          detail: { en: 'Apply online at services.nidw.gov.bd, or collect Form-2 from your upazila / thana election office and fill it in by hand.', bn: 'services.nidw.gov.bd-তে অনলাইনে আবেদন করুন, অথবা উপজেলা / থানা নির্বাচন অফিস থেকে ফরম-২ নিয়ে হাতে পূরণ করুন।' } },
        { id: 'new-3', title: { en: 'Submit and keep your form number', bn: 'জমা দিয়ে ফরম নম্বর সংরক্ষণ করুন' },
          detail: { en: 'After submission you get a form number. Keep it safe — you need it to check your status and to download your NID later.', bn: 'জমা দেওয়ার পর একটি ফরম নম্বর পাবেন। এটি যত্নে রাখুন — অবস্থা যাচাই ও পরে এনআইডি ডাউনলোড করতে এটি লাগবে।' } },
        { id: 'new-4', title: { en: 'Give biometrics at the election office', bn: 'নির্বাচন অফিসে বায়োমেট্রিক দিন' },
          detail: { en: 'Go to your upazila / thana election office on the given date for your photo, fingerprints and iris scan. Bring the original documents.', bn: 'নির্ধারিত তারিখে উপজেলা / থানা নির্বাচন অফিসে গিয়ে ছবি, আঙুলের ছাপ ও চোখের স্ক্যান দিন। মূল কাগজপত্র সঙ্গে নিন।' } },
        { id: 'new-5', title: { en: 'Verification and voter-list entry', bn: 'যাচাই ও ভোটার তালিকায় অন্তর্ভুক্তি' },
          detail: { en: 'The election office verifies your documents and address. Once approved, your name enters the voter list.', bn: 'নির্বাচন অফিস আপনার কাগজপত্র ও ঠিকানা যাচাই করে। অনুমোদন হলে আপনার নাম ভোটার তালিকায় যুক্ত হয়।' } },
        { id: 'new-6', title: { en: 'Collect your smart card', bn: 'স্মার্ট কার্ড সংগ্রহ করুন' },
          detail: { en: 'Collect the smart NID card from your upazila / thana election office when it is ready. You can also download a copy online with your form number.', bn: 'প্রস্তুত হলে উপজেলা / থানা নির্বাচন অফিস থেকে স্মার্ট এনআইডি কার্ড সংগ্রহ করুন। ফরম নম্বর দিয়ে অনলাইনেও কপি ডাউনলোড করা যায়।' } }
      ]
    },
    {
      id: 'correction',
      title: { en: 'Correcting information', bn: 'তথ্য সংশোধন' },
      time: { en: 'Often 15–20 days for simple corrections (reported); up to about 2 months for the corrected smart card', bn: 'সাধারণ সংশোধনে প্রায় ১৫–২০ দিন (প্রতিবেদন অনুযায়ী); সংশোধিত স্মার্ট কার্ড পেতে প্রায় ২ মাস পর্যন্ত' },
      steps: [
        { id: 'cor-1', title: { en: 'Register / log in on the NID portal', bn: 'এনআইডি পোর্টালে নিবন্ধন / লগইন করুন' },
          detail: { en: 'Go to services.nidw.gov.bd and create an account (or log in) with your NID number, date of birth and mobile number. Face verification uses the NID Wallet app.', bn: 'services.nidw.gov.bd-তে গিয়ে এনআইডি নম্বর, জন্ম তারিখ ও মোবাইল নম্বর দিয়ে অ্যাকাউন্ট খুলুন (বা লগইন করুন)। মুখ যাচাইয়ের জন্য এনআইডি Wallet অ্যাপ লাগে।' } },
        { id: 'cor-2', title: { en: 'Pay the correction fee online', bn: 'অনলাইনে সংশোধন ফি দিন' },
          detail: { en: 'Pay with bKash, Rocket, OK Wallet or T-Cash. Printed info (name, date of birth): ৳230 first time, ৳345 second, ৳575 after that. Other info: ৳115. Both together: ৳345. Never pay anyone outside the official system.', bn: 'বিকাশ, রকেট, ওকে ওয়ালেট বা টি-ক্যাশ দিয়ে দিন। ছাপানো তথ্য (নাম, জন্ম তারিখ): প্রথমবার ৳২৩০, দ্বিতীয়বার ৳৩৪৫, এরপর ৳৫৭৫। অন্যান্য তথ্য: ৳১১৫। দুটো একসঙ্গে: ৳৩৪৫। সরকারি পদ্ধতির বাইরে কাউকে টাকা দেবেন না।' } },
        { id: 'cor-3', title: { en: 'Wait about 30 minutes for editing to unlock', bn: 'সম্পাদনা খুলতে প্রায় ৩০ মিনিট অপেক্ষা করুন' },
          detail: { en: 'After the payment is confirmed, the edit option opens after about 30 minutes (as reported).', bn: 'পেমেন্ট নিশ্চিত হওয়ার প্রায় ৩০ মিনিট পর সম্পাদনার অপশন খুলে যায় (প্রতিবেদন অনুযায়ী)।' } },
        { id: 'cor-4', title: { en: 'Edit and upload proof documents', bn: 'সংশোধন করুন ও প্রমাণপত্র আপলোড করুন' },
          detail: { en: 'Change only what is wrong. Upload the right proof: SSC certificate for a name, birth certificate for a date of birth, utility bill for an address. Wrong or missing proof is the most common reason for rejection.', bn: 'শুধু ভুল অংশটুকু বদলান। সঠিক প্রমাণ আপলোড করুন: নামের জন্য এসএসসি সনদ, জন্ম তারিখের জন্য জন্ম সনদ, ঠিকানার জন্য বিদ্যুৎ বিল। ভুল বা অনুপস্থিত প্রমাণই বাতিলের সবচেয়ে সাধারণ কারণ।' } },
        { id: 'cor-5', title: { en: 'Submit and track the status', bn: 'জমা দিয়ে অবস্থা দেখুন' },
          detail: { en: 'Submit the application and check its status on the portal. The election office may ask for more documents or a hearing for date-of-birth changes.', bn: 'আবেদন জমা দিয়ে পোর্টালে অবস্থা দেখুন। জন্ম তারিখ পরিবর্তনের ক্ষেত্রে নির্বাচন অফিস অতিরিক্ত কাগজ বা শুনানি চাইতে পারে।' } },
        { id: 'cor-6', title: { en: 'Collect the corrected smart card', bn: 'সংশোধিত স্মার্ট কার্ড সংগ্রহ করুন' },
          detail: { en: 'Once approved, collect the corrected smart card from your own constituency / upazila election office. It can take up to about two months.', bn: 'অনুমোদন হলে নিজ নির্বাচনী এলাকা / উপজেলা নির্বাচন অফিস থেকে সংশোধিত স্মার্ট কার্ড সংগ্রহ করুন। এতে প্রায় ২ মাস পর্যন্ত লাগতে পারে।' } }
      ]
    },
    {
      id: 'reissue',
      title: { en: 'Re-issue a lost or damaged card', bn: 'হারানো / নষ্ট কার্ড পুনরায় ইস্যু' },
      time: { en: 'Fee depends on how many times before; urgent delivery costs more', bn: 'আগে কতবার নিয়েছেন তার ওপর ফি নির্ভর করে; জরুরি ডেলিভারিতে বেশি' },
      steps: [
        { id: 'rei-1', title: { en: 'File a GD at the police station (lost card)', bn: 'থানায় জিডি করুন (হারানো কার্ডের ক্ষেত্রে)' },
          detail: { en: 'For a lost card, first file a General Diary (GD) at your nearest police station and keep a copy. For a damaged card, keep the damaged card itself.', bn: 'হারানো কার্ডের জন্য প্রথমে নিকটস্থ থানায় সাধারণ ডায়েরি (জিডি) করুন ও কপি রাখুন। নষ্ট কার্ডের ক্ষেত্রে নষ্ট কার্ডটিই রাখুন।' } },
        { id: 'rei-2', title: { en: 'Apply for re-issue on the portal', bn: 'পোর্টালে পুনরায় ইস্যুর আবেদন করুন' },
          detail: { en: 'Log in at services.nidw.gov.bd and choose the re-issue option. Attach the GD copy (lost) or a photo of the damaged card.', bn: 'services.nidw.gov.bd-তে লগইন করে পুনরায় ইস্যুর অপশন বেছে নিন। জিডির কপি (হারানো) বা নষ্ট কার্ডের ছবি যুক্ত করুন।' } },
        { id: 'rei-3', title: { en: 'Pay the re-issue fee', bn: 'পুনরায় ইস্যুর ফি দিন' },
          detail: { en: 'First time: ৳200 regular / ৳300 urgent. Second time: ৳300 / ৳500. Third time or more: ৳500 / ৳1,000. Pay online by mobile banking.', bn: 'প্রথমবার: ৳২০০ সাধারণ / ৳৩০০ জরুরি। দ্বিতীয়বার: ৳৩০০ / ৳৫০০। তৃতীয়বার বা এরপর: ৳৫০০ / ৳১,০০০। মোবাইল ব্যাংকিংয়ে অনলাইনে দিন।' } },
        { id: 'rei-4', title: { en: 'Verification', bn: 'যাচাই' },
          detail: { en: 'The election office verifies the GD and your record before printing a new card.', bn: 'নতুন কার্ড ছাপানোর আগে নির্বাচন অফিস জিডি ও আপনার রেকর্ড যাচাই করে।' } },
        { id: 'rei-5', title: { en: 'Collect the new card', bn: 'নতুন কার্ড সংগ্রহ করুন' },
          detail: { en: 'Collect the replacement card from your upazila / thana election office when it is ready.', bn: 'প্রস্তুত হলে উপজেলা / থানা নির্বাচন অফিস থেকে নতুন কার্ড সংগ্রহ করুন।' } }
      ]
    }
  ];

  var CHECKLISTS = [
    {
      id: 'new',
      title: { en: 'New registration', bn: 'নতুন নিবন্ধন' },
      items: [
        { id: 'new-doc-1', text: { en: 'Birth certificate (original + photocopy)', bn: 'জন্ম নিবন্ধন সনদ (মূল + ফটোকপি)' } },
        { id: 'new-doc-2', text: { en: 'SSC / JSC / HSC certificate or admit card', bn: 'এসএসসি / জেএসসি / এইচএসসি সনদ বা প্রবেশপত্র' } },
        { id: 'new-doc-3', text: { en: 'Father’s NID card copy', bn: 'বাবার এনআইডি কার্ডের কপি' } },
        { id: 'new-doc-4', text: { en: 'Mother’s NID card copy', bn: 'মায়ের এনআইডি কার্ডের কপি' } },
        { id: 'new-doc-5', text: { en: 'Utility bill or holding-tax receipt (address proof)', bn: 'বিদ্যুৎ/গ্যাস বিল বা হোল্ডিং ট্যাক্সের রসিদ (ঠিকানার প্রমাণ)' } },
        { id: 'new-doc-6', text: { en: 'Chairman / ward commissioner certificate', bn: 'চেয়ারম্যান / ওয়ার্ড কমিশনারের সনদপত্র' } }
      ]
    },
    {
      id: 'name',
      title: { en: 'Name correction', bn: 'নাম সংশোধন' },
      items: [
        { id: 'name-doc-1', text: { en: 'SSC / JSC / HSC certificate (shows the correct spelling)', bn: 'এসএসসি / জেএসসি / এইচএসসি সনদ (সঠিক বানান দেখায়)' } },
        { id: 'name-doc-2', text: { en: 'Birth certificate', bn: 'জন্ম নিবন্ধন সনদ' } },
        { id: 'name-doc-3', text: { en: 'Parents’ NID card copies', bn: 'বাবা-মায়ের এনআইডি কার্ডের কপি' } },
        { id: 'name-doc-4', text: { en: 'Old NID card copy', bn: 'পুরনো এনআইডি কার্ডের কপি' } },
        { id: 'name-doc-5', text: { en: 'Affidavit / deed poll — only if the name itself was legally changed', bn: 'এফিডেভিট / ডিড পোল — শুধু নাম আইনত বদলে থাকলে' } }
      ]
    },
    {
      id: 'dob',
      title: { en: 'Date-of-birth correction', bn: 'জন্ম তারিখ সংশোধন' },
      items: [
        { id: 'dob-doc-1', text: { en: 'Birth certificate (main proof)', bn: 'জন্ম নিবন্ধন সনদ (প্রধান প্রমাণ)' } },
        { id: 'dob-doc-2', text: { en: 'SSC certificate (must match the birth certificate)', bn: 'এসএসসি সনদ (জন্ম সনদের সঙ্গে মিলতে হবে)' } },
        { id: 'dob-doc-3', text: { en: 'Passport, if you have one', bn: 'পাসপোর্ট, থাকলে' } },
        { id: 'dob-doc-4', text: { en: 'Old NID card copy', bn: 'পুরনো এনআইডি কার্ডের কপি' } }
      ]
    },
    {
      id: 'address',
      title: { en: 'Address correction', bn: 'ঠিকানা সংশোধন' },
      items: [
        { id: 'address-doc-1', text: { en: 'Utility bill (electricity / gas / water) for the new address', bn: 'নতুন ঠিকানার বিদ্যুৎ / গ্যাস / পানির বিল' } },
        { id: 'address-doc-2', text: { en: 'Holding-tax receipt', bn: 'হোল্ডিং ট্যাক্সের রসিদ' } },
        { id: 'address-doc-3', text: { en: 'Chairman / ward commissioner certificate', bn: 'চেয়ারম্যান / ওয়ার্ড কমিশনারের সনদপত্র' } },
        { id: 'address-doc-4', text: { en: 'Old NID card copy', bn: 'পুরনো এনআইডি কার্ডের কপি' } }
      ]
    },
    {
      id: 'reissue',
      title: { en: 'Lost / damaged card re-issue', bn: 'হারানো / নষ্ট কার্ড পুনরায় ইস্যু' },
      items: [
        { id: 'rei-doc-1', text: { en: 'GD copy from the police station (lost card)', bn: 'থানার জিডির কপি (হারানো কার্ডের ক্ষেত্রে)' } },
        { id: 'rei-doc-2', text: { en: 'Damaged card itself (damaged card)', bn: 'নষ্ট কার্ডটি (নষ্ট কার্ডের ক্ষেত্রে)' } },
        { id: 'rei-doc-3', text: { en: 'Old NID photocopy, if available', bn: 'পুরনো এনআইডির ফটোকপি, থাকলে' } },
        { id: 'rei-doc-4', text: { en: 'Online re-issue application (form number)', bn: 'অনলাইন পুনরায় ইস্যুর আবেদন (ফরম নম্বর)' } }
      ]
    }
  ];

  var QUIZ = [
    { id: 'q1',
      q: { en: 'What is the official NID services portal?', bn: 'এনআইডি সেবার সরকারি পোর্টাল কোনটি?' },
      options: [
        { en: 'services.nidw.gov.bd', bn: 'services.nidw.gov.bd' },
        { en: 'nid.gov.bd', bn: 'nid.gov.bd' },
        { en: 'ec.org.bd', bn: 'ec.org.bd' },
        { en: 'bangladesh.gov.bd', bn: 'bangladesh.gov.bd' } ],
      answer: 0,
      why: { en: 'All NID services — registration, correction, re-issue — run through services.nidw.gov.bd.', bn: 'নিবন্ধন, সংশোধন, পুনরায় ইস্যু — সব এনআইডি সেবা services.nidw.gov.bd-তে চলে।' } },
    { id: 'q2',
      q: { en: 'What is the fee for a first-time correction of a name or date of birth?', bn: 'নাম বা জন্ম তারিখ প্রথমবার সংশোধনের ফি কত?' },
      options: [
        { en: '৳115', bn: '৳১১৫' },
        { en: '৳230', bn: '৳২৩০' },
        { en: '৳345', bn: '৳৩৪৫' },
        { en: '৳575', bn: '৳৫৭৫' } ],
      answer: 1,
      why: { en: 'Printed-info correction costs ৳230 the first time, ৳345 the second, ৳575 after that.', bn: 'ছাপানো তথ্য সংশোধনে প্রথমবার ৳২৩০, দ্বিতীয়বার ৳৩৪৫, এরপর ৳৫৭৫।' } },
    { id: 'q3',
      q: { en: 'What is the fee to correct non-printed info, like occupation or mobile number?', bn: 'পেশা বা মোবাইল নম্বরের মতো ছাপানো নয় এমন তথ্য সংশোধনের ফি কত?' },
      options: [
        { en: '৳100', bn: '৳১০০' },
        { en: '৳115', bn: '৳১১৫' },
        { en: '৳200', bn: '৳২০০' },
        { en: '৳230', bn: '৳২৩০' } ],
      answer: 1,
      why: { en: 'Other (non-printed) information costs ৳115 to correct.', bn: 'অন্যান্য (ছাপানো নয় এমন) তথ্য সংশোধনে ৳১১৫ লাগে।' } },
    { id: 'q4',
      q: { en: 'Regular fee to re-issue a lost card for the first time?', bn: 'হারানো কার্ড প্রথমবার পুনরায় ইস্যুর সাধারণ ফি কত?' },
      options: [
        { en: '৳100', bn: '৳১০০' },
        { en: '৳150', bn: '৳১৫০' },
        { en: '৳200', bn: '৳২০০' },
        { en: '৳300', bn: '৳৩০০' } ],
      answer: 2,
      why: { en: 'First re-issue: ৳200 regular, ৳300 urgent. Second: ৳300 / ৳500. Third or more: ৳500 / ৳1,000.', bn: 'প্রথম পুনরায় ইস্যু: ৳২০০ সাধারণ, ৳৩০০ জরুরি। দ্বিতীয়: ৳৩০০ / ৳৫০০। তৃতীয় বা এরপর: ৳৫০০ / ৳১,০০০।' } },
    { id: 'q5',
      q: { en: 'After how many years must an NID card be renewed?', bn: 'কত বছর পর এনআইডি কার্ড নবায়ন করতে হয়?' },
      options: [
        { en: '5 years', bn: '৫ বছর' },
        { en: '10 years', bn: '১০ বছর' },
        { en: '15 years', bn: '১৫ বছর' },
        { en: '20 years', bn: '২০ বছর' } ],
      answer: 2,
      why: { en: 'NID cards must be renewed after 15 years. Regular renewal is ৳100, urgent ৳150.', bn: 'এনআইডি কার্ড ১৫ বছর পর নবায়ন করতে হয়। সাধারণ নবায়ন ৳১০০, জরুরি ৳১৫০।' } },
    { id: 'q6',
      q: { en: 'In which year was the smart NID card launched?', bn: 'স্মার্ট এনআইডি কার্ড কোন সালে চালু হয়?' },
      options: [
        { en: '2006', bn: '২০০৬' },
        { en: '2010', bn: '২০১০' },
        { en: '2016', bn: '২০১৬' },
        { en: '2020', bn: '২০২০' } ],
      answer: 2,
      why: { en: 'The chip-based smart NID card was launched on 2 October 2016.', bn: 'চিপযুক্ত স্মার্ট এনআইডি কার্ড চালু হয় ২০১৬ সালের ২ অক্টোবর।' } },
    { id: 'q7',
      q: { en: 'In which year did the NID programme start in Bangladesh?', bn: 'বাংলাদেশে এনআইডি কার্যক্রম কোন সালে শুরু হয়?' },
      options: [
        { en: '2000', bn: '২০০০' },
        { en: '2006', bn: '২০০৬' },
        { en: '2011', bn: '২০১১' },
        { en: '2016', bn: '২০১৬' } ],
      answer: 1,
      why: { en: 'National ID cards have been issued to citizens since 22 July 2006.', bn: '২০০৬ সালের ২২ জুলাই থেকে নাগরিকদের জাতীয় পরিচয়পত্র দেওয়া হচ্ছে।' } },
    { id: 'q8',
      q: { en: 'After paying a correction fee online, when does editing unlock?', bn: 'অনলাইনে সংশোধন ফি দেওয়ার কতক্ষণ পর সম্পাদনা খোলে?' },
      options: [
        { en: 'Immediately', bn: 'সঙ্গে সঙ্গে' },
        { en: 'After about 30 minutes', bn: 'প্রায় ৩০ মিনিট পর' },
        { en: 'After 24 hours', bn: '২৪ ঘণ্টা পর' },
        { en: 'After 7 days', bn: '৭ দিন পর' } ],
      answer: 1,
      why: { en: 'As reported, data editing can start about 30 minutes after the fee payment.', bn: 'প্রতিবেদন অনুযায়ী, ফি দেওয়ার প্রায় ৩০ মিনিট পর তথ্য সম্পাদনা শুরু করা যায়।' } },
    { id: 'q9',
      q: { en: 'Where do you collect a corrected smart card?', bn: 'সংশোধিত স্মার্ট কার্ড কোথা থেকে সংগ্রহ করবেন?' },
      options: [
        { en: 'Any bank branch', bn: 'যেকোনো ব্যাংক শাখা' },
        { en: 'Your own constituency / upazila election office', bn: 'নিজ নির্বাচনী এলাকা / উপজেলা নির্বাচন অফিস' },
        { en: 'The post office', bn: 'ডাকঘর' },
        { en: 'A Union Digital Centre only', bn: 'শুধু ইউনিয়ন ডিজিটাল সেন্টার' } ],
      answer: 1,
      why: { en: 'A corrected smart card is collected directly from your own constituency / upazila election office.', bn: 'সংশোধিত স্মার্ট কার্ড নিজ নির্বাচনী এলাকা / উপজেলা নির্বাচন অফিস থেকে সরাসরি সংগ্রহ করতে হয়।' } },
    { id: 'q10',
      q: { en: 'Which is NOT an accepted way to pay NID fees?', bn: 'এনআইডি ফি দেওয়ার গ্রহণযোগ্য উপায় কোনটি নয়?' },
      options: [
        { en: 'bKash', bn: 'বিকাশ' },
        { en: 'Rocket', bn: 'রকেট' },
        { en: 'OK Wallet', bn: 'ওকে ওয়ালেট' },
        { en: 'Cash handed to a broker', bn: 'দালালের হাতে নগদ টাকা' } ],
      answer: 3,
      why: { en: 'Fees are paid online by mobile banking inside the official system. Never pay a broker — it is a known scam pattern.', bn: 'ফি সরকারি পদ্ধতিতে মোবাইল ব্যাংকিংয়ে অনলাইনে দিতে হয়। দালালকে কখনো টাকা দেবেন না — এটি পরিচিত প্রতারণার ধরন।' } }
  ];

  var FACTS = [
    { en: 'NID since 22 July 2006', bn: 'এনআইডি ২২ জুলাই ২০০৬ থেকে' },
    { en: 'Smart card since 2 Oct 2016', bn: 'স্মার্ট কার্ড ২ অক্টোবর ২০১৬ থেকে' },
    { en: 'Renew every 15 years', bn: '১৫ বছর পর নবায়ন' },
    { en: 'Portal: services.nidw.gov.bd', bn: 'পোর্টাল: services.nidw.gov.bd' }
  ];

  var api = { GUIDES: GUIDES, CHECKLISTS: CHECKLISTS, QUIZ: QUIZ, FACTS: FACTS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.NidData = api;
})(typeof window !== 'undefined' ? window : globalThis);
