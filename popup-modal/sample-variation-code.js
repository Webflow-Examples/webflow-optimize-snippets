window.wf_optimize.utils.popupModal({
  leftHtml: `
    <img src="https://placehold.co/400x300?text=Popup+Image" alt="Example modal image" />
  `,
  rightHtml: `
    <h2 id="modal-heading">Need help choosing?</h2>
    <p>Let us help you find the right solution for your team.</p>
    <button class="modal-cta" onclick="alert('CTA clicked!')">Get a Recommendation</button>
  `,
  trigger: "exit-intent",
  exitIntentOptions: {
    idleDelay: 1000,
    triggerEdge: 50,
  },
  customClassName: "custom-tour-modal",
});
