import MaterialIcon from "../../common/MaterialIcon";

export default function ContactPage() {
  return (
    <>
      <section className="p-page h-screen bg-[url('/images/illustrations/contact-bg.jpg')] bg-cover bg-right-bottom">
        <div className="py-8">
          <h1 className="text-4xl font-medium text-red-950">Let's Talk</h1>
          <p className="my-3 w-1/2 text-justify text-sm">
            We appreciate your interest in AgroSurance and welcome any
            questions, suggestions, or collaboration opportunities you may have.
            Our team is here to assist you and provide the information you need.
            Please don't hesitate to reach out to us
          </p>
          <form
            className="my-12 flex flex-col gap-y-6"
            action="https://formspree.io/f/xyyaqwlg"
            method="POST"
          >
            <input
              type="text"
              className="w-1/3 rounded-lg bg-transparent px-4 py-2 text-red-950 outline outline-red-950"
              placeholder="Your Name"
              name="name"
              required
            />
            <input
              type="text"
              className="w-1/3 rounded-lg bg-transparent px-4 py-2 text-red-950 outline outline-red-950"
              placeholder="Your Email Address"
              name="email"
              required
            />
            <textarea
              rows={6}
              className="w-1/3 resize-none rounded-lg bg-transparent px-4 py-2 text-red-950 outline outline-red-950"
              placeholder="Your Message"
              name="message"
              required
            />
            <div className="flex w-1/3 justify-center">
              <button className="flex w-max items-center gap-x-2 rounded-md bg-red-950 px-6 py-1 text-white duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
                Submit <MaterialIcon codepoint="e163" className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
