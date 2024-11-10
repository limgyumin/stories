export const preventScroll = () => {
  const { body } = document;

  if (!body.getAttribute("scrollY")) {
    const scrollY = window.scrollY || window.pageYOffset;

    body.setAttribute("scrollY", scrollY.toString());

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
  }
};

export const allowScroll = () => {
  const { body } = document;

  if (body.getAttribute("scrollY")) {
    body.style.removeProperty("position");
    body.style.removeProperty("top");
    body.style.removeProperty("left");
    body.style.removeProperty("right");

    window.scrollTo(0, Number(body.getAttribute("scrollY")));

    body.removeAttribute("scrollY");
  }
};
