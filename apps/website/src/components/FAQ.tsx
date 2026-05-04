const faqs = [
  {
    question: 'Does sub-addressing work with my email provider?',
    answer:
      "Sub-addressing using the + symbol is supported by Gmail, Outlook, ProtonMail, Fastmail, Hey, and most modern email providers. A small number of older providers or services may not support it — the extension's generated address will still be valid, but some services may reject addresses containing +.",
  },
  {
    question: 'Will using a sub-address prevent spam?',
    answer:
      "Sub-addressing doesn't prevent spam on its own, but it helps you identify where an address was used and makes filtering much easier. If a sub-address starts receiving unwanted email, you can create a rule to automatically delete or archive it.",
  },
  {
    question: 'Is my base email address safe?',
    answer:
      "Yes. Your base email is stored using Chrome's built-in sync storage — it lives in your browser profile and is never transmitted to any server by this extension. The sub-addresses generated are based on the hostname and date; they're computed locally and not recorded anywhere.",
  },
  {
    question: 'Can I use this with Gmail?',
    answer:
      'Yes. Gmail natively supports sub-addressing. Emails sent to you+tag@gmail.com arrive in the same inbox as you@gmail.com. You can create filters in Gmail using the "To" field to organise them.',
  },
  {
    question: "What if a website doesn't accept + in email addresses?",
    answer:
      "Some websites incorrectly reject valid email addresses containing the + character. In that case, you'll need to use your base email address directly. The extension won't cause any issues — simply don't use the generated address for that site.",
  },
  {
    question: 'Do I need to create a new email account?',
    answer:
      'No. Sub-addressing works with your existing email address. All emails sent to any sub-address arrive in your main inbox (or a folder if you set up filters). No new accounts are needed.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Frequently asked questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-200 mb-2">{faq.question}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
