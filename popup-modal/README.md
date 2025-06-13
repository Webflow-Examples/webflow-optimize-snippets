# Popup Modal Utility for Webflow Optimize

This utility adds a fully customizable popup modal to your site using Webflow Optimize. It supports two trigger types – time delay or exit intent – and allows for flexible content and responsive two-column layouts.

It is designed to be accessible and easy to adapt.

---

## 🛠 Setup

1. Add `popup-modal-utility.js` to your **Global JavaScript** in Webflow Optimize (Account Settings).
2. In your variation, call `popupModal()` with your desired content and behavior.

---

## ⚙️ Options

| Option                | Type     | Description                                                                 |
|------------------------|----------|-----------------------------------------------------------------------------|
| `leftHtml`             | `string` | Optional. HTML content for the left side (e.g., image or illustration).     |
| `rightHtml`            | `string` | Optional. HTML content for the right side (e.g., headings, text, CTA).      |
| `trigger`              | `string` | `'delay'` or `'exit-intent'`. Controls when the modal appears.              |
| `delayMs`              | `number` | Milliseconds to wait before showing (only if `trigger: 'delay'`). Default: 5000. |
| `exitIntentOptions`    | `object` | Optional. Configures behavior of `exit-intent` trigger.                     |
| `customClassName`      | `string` | Optional. Adds a custom class to the modal wrapper for styling.             |

---

### 🧠 `exitIntentOptions`

Used only when `trigger` is set to `'exit-intent'`.

| Option         | Type     | Description                                                                 |
|----------------|----------|-----------------------------------------------------------------------------|
| `idleDelay`    | `number` | Time (ms) after page load before monitoring for exit behavior. Default: 1000 |
| `triggerEdge`  | `number` | Distance from top of screen (in pixels) that counts as exit intent. Default: 50 |

Example: `triggerEdge: 30` means the modal will appear if the user’s mouse moves within 30 pixels of the top of the viewport.

---

## 🧪 Example usage

```js
window.wf_optimize.utils.popupModal({
  leftHtml: '<img src="https://placehold.co/400x300?text=Popup+Image" alt="Product screenshot" />',
  rightHtml: `
    <h2 id="modal-heading">Ready to get started?</h2>
    <p>Let us help you choose the right plan.</p>
    <button onclick="alert('CTA clicked!')">Book a demo</button>
  `,
  trigger: 'exit-intent',
  exitIntentOptions: {
    idleDelay: 1000,
    triggerEdge: 50
  },
  customClassName: 'custom-popup'
});
