function Autoplay(interval = 5000) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  return (slider: any) => {
    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, interval);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => (mouseOver = true));
      slider.container.addEventListener("mouseout", () => (mouseOver = false));
      nextTimeout();
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };
}

export default Autoplay;