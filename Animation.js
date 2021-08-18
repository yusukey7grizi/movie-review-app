export const HomeAnimation = {
  hidden: {
    opacity: 0,
    y: -1000,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 3,
    },
  },
};

export const SearchAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 3,
    },
  },
};

export const DetailTextAnimation = {
  hidden: {
    x: -1000,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2,
      delay: 0.5,
    },
  },
};

export const DetailPosterAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  },
};
export const ReviewAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 2,
      delay: 2.5,
    },
  },
};
