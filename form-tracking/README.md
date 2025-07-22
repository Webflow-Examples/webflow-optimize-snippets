# Split Marketo Form Submission Tracking

This snippet helps you track submissions for the **same Marketo form** when it appears on **multiple pages** of your site. It fires different `sendEvent()` calls depending on which page the form is submitted from — perfect for A/B testing CTA strategies or understanding which placement drives more conversions.

For example, you might place the same form:

- On a dedicated demo page
- Embedded in a product or platform page (e.g. in the footer)

By sending different events for each version, you can track performance separately in Webflow Optimize.

---

## 🛠 Setup

1. Add the contents of `split-form-submission.js` to your **Global JavaScript** in Webflow Optimize (Account Settings).
2. Update the `formId` and URL paths if needed (defaults shown below work for the example use case).
3. Create matching custom events in Optimize to track submissions by location (see below).

---

## 🔍 How it works

This snippet uses the [Marketo Forms 2.0 JavaScript API](https://developers.marketo.com/javascript-api/forms/) to safely detect when a form has been submitted successfully. It avoids brittle DOM selectors and ensures your tracking only fires when Marketo confirms the form went through.

---

## 🧪 Example logic

```js
(() => {
  const formId = 2312; // Update this to match your Marketo form ID

  MktoForms2.whenReady((form) => {
    if (form.getId() !== formId) return;

    form.onSuccess(() => {
      const path = window.location.pathname;

      if (path === "/data-intelligence/demo/") {
        intellimize.sendEvent("demo_form_submission");
      } else if (path === "/data-intelligence/platform/") {
        intellimize.sendEvent("footer_form_submission");
      }

      return true; // Let default success behavior proceed
    });
  });
})();
```

> 💡 You can customize the path checks and event names to match your own pages and goals.

---

## 📊 Event tracking setup

To report on these submissions in Webflow Optimize:

1. Go to **Components** → **Events**
2. Click **New event** → **New custom event**
3. Enter the event names used in the snippet (e.g. `demo_form_submission` and `footer_form_submission`)

You can then:

- Use these events as conversion goals in experiments
- Filter by event type in reporting to compare page-level performance

---

## 📄 License

This utility is open source and shared under the [MIT License](../LICENSE). You’re welcome to adapt and reuse it for your own Webflow Optimize projects.
