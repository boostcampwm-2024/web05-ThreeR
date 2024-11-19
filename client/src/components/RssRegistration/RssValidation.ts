export const validateRssUrl = (url: string) => {
  const urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
  return urlRegex.test(url) || false;
};

export const validateName = (name: string) => {
  return name.trim().length > 0 || false;
};

export const validateBlogger = (bloggerName: string) => {
  return bloggerName.trim().length > 0 || false;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) || false;
};
