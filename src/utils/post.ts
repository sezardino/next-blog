export const numberToReadableFormat = (views: number) => {
  if (views < 1000) {
    return views.toString();
  } else if (views >= 1000 && views < 1000000) {
    return (views / 1000).toFixed(1) + "K";
  } else if (views >= 1000000 && views < 1000000000) {
    return (views / 1000000).toFixed(1) + "M";
  } else {
    return (views / 1000000000).toFixed(1) + "B";
  }
};
