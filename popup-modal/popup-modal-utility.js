(() => {
  window.wf_optimize = window.wf_optimize || {};
  window.wf_optimize.utils = window.wf_optimize.utils || {};

  window.wf_optimize.utils.popupModal = function ({
    leftHtml = "",
    rightHtml = "",
    trigger = "delay",
    delayMs = 5000,
    exitIntentOptions = { idleDelay: 1000, triggerEdge: 50 },
    customClassName = "",
  } = {}) {
    let previousActiveElement;

    const trapFocus = (modal) => {
      const focusable = modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      modal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    };

    const closeModal = () => {
      const backdrop = document.querySelector(".wfoptimize-modal-backdrop");
      if (backdrop) {
        document.body.removeChild(backdrop);
        document.body.style.overflow = "";
        if (previousActiveElement) previousActiveElement.focus();
      }
    };

    const createModal = () => {
      if (!document.getElementById("wfoptimize-custom-modal-style")) {
        const style = document.createElement("style");
        style.id = "wfoptimize-custom-modal-style";
        style.textContent = `
          .wfoptimize-modal-backdrop {
            position: fixed; inset: 0; background: rgba(0,0,0,0.6);
            display: flex; justify-content: center; align-items: center;
            z-index: 9999;
          }
          .wfoptimize-modal {
            display: flex;
            flex-direction: column;
            background: white;
            border-radius: 8px;
            max-width: 800px;
            width: 95%;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            font-family: sans-serif;
            opacity: 0;
            transition: opacity 0.3s ease;
            position: relative;
          }
          .wfoptimize-modal.ready {
            opacity: 1;
          }
          .wfoptimize-modal.two-column {
            flex-direction: row;
          }
          .wfoptimize-modal .modal-left,
          .wfoptimize-modal .modal-right {
            padding: 32px;
            box-sizing: border-box;
          }
          .wfoptimize-modal .modal-left {
            flex: 1 1 50%;
            background: #f9f9f9;
          }
          .wfoptimize-modal .modal-right {
            flex: 1 1 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .wfoptimize-modal .modal-right h2 {
            margin-top: 0;
          }
          .wfoptimize-modal-close {
            position: absolute;
            top: 12px;
            right: 12px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10;
          }
          @media (max-width: 768px) {
            .wfoptimize-modal.two-column {
              flex-direction: column;
            }
          }
        `;
        document.head.appendChild(style);
      }

      previousActiveElement = document.activeElement;

      const backdrop = document.createElement("div");
      backdrop.className = "wfoptimize-modal-backdrop";
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal();
      });

      const modal = document.createElement("div");
      modal.className = `wfoptimize-modal ${customClassName}`.trim();
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "modal-heading");
      modal.setAttribute("tabindex", "-1");

      const hasLeft = Boolean(leftHtml?.trim());
      const hasRight = Boolean(rightHtml?.trim());
      if (hasLeft && hasRight) modal.classList.add("two-column");

      const closeBtn = document.createElement("button");
      closeBtn.className = "wfoptimize-modal-close";
      closeBtn.setAttribute("aria-label", "Close modal");
      closeBtn.innerHTML = "&times;";
      closeBtn.addEventListener("click", closeModal);

      if (hasLeft) {
        const left = document.createElement("div");
        left.className = "modal-left";
        left.innerHTML = leftHtml;
        modal.appendChild(left);
      }

      if (hasRight) {
        const right = document.createElement("div");
        right.className = "modal-right";
        right.innerHTML = rightHtml;
        modal.appendChild(right);
      }

      modal.appendChild(closeBtn);
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        modal.classList.add("ready");
        modal.focus();
        trapFocus(modal);
      }, 50);
    };

    const triggerModal = () => {
      if (document.querySelector(".wfoptimize-modal-backdrop")) return;
      createModal();
    };

    if (trigger === "exit-intent") {
      const { idleDelay = 1000, triggerEdge = 50 } = exitIntentOptions || {};
      const onMouseMove = (e) => {
        if (e.clientY <= triggerEdge) {
          window.removeEventListener("mousemove", onMouseMove);
          triggerModal();
        }
      };
      setTimeout(
        () => window.addEventListener("mousemove", onMouseMove),
        idleDelay
      );
    } else {
      setTimeout(triggerModal, delayMs);
    }
  };
})();
