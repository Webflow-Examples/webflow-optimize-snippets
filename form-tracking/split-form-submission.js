/**
 * Split form submission tracking
 *
 * Tracks submissions for Marketo form ID 2312 shown on:
 * - the demo page: /data-intelligence/demo/
 * - the platform page: /data-intelligence/platform/
 *
 * Fires distinct sendEvent() calls so Optimize can track them separately.
 */

(() => {
  const formId = 2312;

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

/** End: Split form submission tracking **/
