type Args = {
  email: string;
  firstName: string | null;
  lastName: string | null;
};

export const getUserAvatarFallback = (args: Args) => {
  const { email, firstName, lastName } = args;

  if (!firstName || !lastName) return email.slice(0, 2).toUpperCase();

  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};
