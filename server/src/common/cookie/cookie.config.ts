export const cookieConfig = {
  production: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  },
  development: {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    path: '/',
  },
  test: {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    path: '/',
  },
};
