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

export const normalizeTags = (tags: string[]) => {
  const uniqueTags: string[] = [];

  tags.forEach((tag) => {
    const sanitizedTag = tag
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    if (sanitizedTag.length > 0 && !uniqueTags.includes(sanitizedTag)) {
      uniqueTags.push(sanitizedTag);
    }
  });

  return uniqueTags;
};

export const getChangedFields = <T extends Record<string, any>>(
  original: T,
  updated: T,
  includeNewFields = false
): Partial<T> => {
  const changes: Partial<T> = {};

  for (const key in original) {
    if (original.hasOwnProperty(key)) {
      const originalValue = original[key];
      const updatedValue = updated[key];

      if (!areEqual(originalValue, updatedValue)) {
        changes[key] = updatedValue;
      }
    }
  }

  if (includeNewFields) {
    for (const key in updated) {
      if (updated.hasOwnProperty(key) && !(key in original)) {
        changes[key] = updated[key];
      }
    }
  }

  return changes;
};

const areEqual = (a: any, b: any): boolean => {
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((value, index) => areEqual(value, b[index]));
  }

  return a === b;
};
