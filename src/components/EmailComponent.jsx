import React from "react";

function EmailComponent() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Replace "YOUR_ACCESS_KEY_HERE"
    formData.append("access_key", "fed716cb-f940-4c8d-8099-c13ac1fcd0ea");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <div className="containerwe  ">
      <div className="row justify-content-center">
        <div className="col-md-6 ">
          <h2 className="mb-4 text-center">Contact Us via Email</h2>
          <form onSubmit={onSubmit} className="p-4 border rounded border-primary mb-3">
            <div className="mb-3 border-primary mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input type="text" className="form-control" id="name" name="name" />
            </div>
            <div className="mb-3 border-primary mb-3">
              <label htmlFor="email" className="form-label">Your Email address</label>
              <input type="email" className="form-control" id="email" name="email" />
            </div>
            <div className="mb-3 border-primary mb-3">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea className="form-control" id="message" name="message" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmailComponent;