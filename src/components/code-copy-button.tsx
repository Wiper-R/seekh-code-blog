import { useEffect } from "react";

export function CodeCopyButton() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll<HTMLElement>("pre.astro-code");

    const handleCopyClick = (button: HTMLButtonElement, text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        button.textContent = "Copied";
        setTimeout(() => {
          button.textContent = "Copy";
        }, 2000);
      });
    };

    const setupCodeBlocks = () => {
      codeBlocks.forEach((codeBlock) => {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("tabindex", "0");
        wrapper.style.position = "relative";

        const button = document.createElement("button");
        button.className = "code-copy-button";
        button.textContent = "Copy";
        button.setAttribute("aria-label", "Copy code to clipboard");

        codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);
        wrapper.appendChild(button);

        const text = codeBlock.textContent || "";
        button.addEventListener("click", () => handleCopyClick(button, text));
      });
    };

    setupCodeBlocks();

    return () => {
      // Cleanup: Remove wrappers and buttons if necessary
      codeBlocks.forEach((codeBlock) => {
        const wrapper = codeBlock.parentElement;
        if (wrapper?.querySelector(".code-copy-button")) {
          wrapper.replaceWith(codeBlock);
        }
      });
    };
  }, []);

  return <></>;
}
