export const validateRssUrl = (url: string) => {
  const urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[\w./?=%&-]*)?$/;
  return urlRegex.test(url) || "유효한 URL을 입력하세요.";
};

export const validateName = (name: string) => {
  return name.trim().length > 0 || "신청자 이름을 입력하세요.";
};

export const validateBlogger = (bloggerName: string) => {
  return bloggerName.trim().length > 0 || "블로그명을 입력하세요.";
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) || "유효한 이메일 주소를 입력하세요.";
};
