export const convertObjectToFormData = (object: Record<string, any>) => {
  const formData = new FormData();

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];

      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, String(item));
        });
      } else if (Boolean(value)) {
        formData.append(key, String(value));
      }
    }
  }

  return formData;
};
