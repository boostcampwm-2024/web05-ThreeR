import FormInput from "@/components/RssRegistration/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { validateRssUrl, validateName, validateEmail, validateBlogger } from "./RssValidation";
import { useRegisterModalStore } from "@/store/useRegisterModalStrore";

export default function RssRegistrationModal({ onClose, rssOpen }: { onClose: () => void; rssOpen: boolean }) {
  const {
    rssUrl,
    bloggerName,
    userName,
    email,
    setRssUrl,
    setBloggerName,
    setUserName,
    setEmail,
    setRssUrlValid,
    setBloggerNameValid,
    setUserNameValid,
    setEmailValid,
    resetInputs,
    handleInputChange,
    isFormValid,
  } = useRegisterModalStore();

  return (
    <Dialog open={rssOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>RSS 등록</DialogTitle>
          <DialogDescription className="flex flex-col">
            <span>RSS 주소 검토 후 운영진이 서비스에 추가합니다.</span>
            <span>검토 및 등록에는 영업일 기준 3-5일이 소요될 수 있습니다.</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <FormInput
            id="rss"
            label="RSS URL"
            onChange={(value: string) => handleInputChange(value, setRssUrl, setRssUrlValid, validateRssUrl)}
            placeholder="https://example.com/rss"
            value={rssUrl}
          />
          <FormInput
            id="blog"
            label="블로그명"
            onChange={(value: string) => handleInputChange(value, setBloggerName, setBloggerNameValid, validateBlogger)}
            placeholder="블로그명을 입력하세요"
            value={bloggerName}
          />
          <FormInput
            id="name"
            label="신청자 이름"
            onChange={(value: string) => handleInputChange(value, setUserName, setUserNameValid, validateName)}
            placeholder="이름을 입력하세요"
            value={userName}
          />
          <FormInput
            id="email"
            label="이메일"
            onChange={(value: string) => handleInputChange(value, setEmail, setEmailValid, validateEmail)}
            placeholder="example@denamu.com"
            value={email}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              resetInputs();
            }}
            disabled={!isFormValid()}
            className="bg-black hover:bg-gray-800 text-white"
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
