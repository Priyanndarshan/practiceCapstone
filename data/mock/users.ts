export const users = [
  { email: "priyan@gmail.com", password: "123" },
  { email: "demo@studenthub.demo", password: "demo123" },
];

export function findUserByEmailAndPassword(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );
}
