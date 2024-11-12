import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { validateRssUrl, validateName, validateEmail, validateBlogger } from "./RssValidation";
import { useRegisterModalStore } from "@/store/useRegisterModalStrore";

export default function RssRegistrationModal({ onClose, rssOpen }: { onClose: () => void; rssOpen: boolean }) {
  const { rssUrl, bloggerName, userName, email, setRssUrl, setBloggerName, setUserName, setEmail, resetInputs } =
    useRegisterModalStore();
  const [rssUrlValid, setRssUrlValid] = useState<boolean>(false);
  const [bloggerNameValid, setBloggerNameValid] = useState<boolean>(false);
  const [userNameValid, setUserNameValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);

  const handleInputChange = (
    value: string,
    setValue: (v: string) => void,
    setValid: (v: boolean) => void,
    validate: (v: string) => boolean
  ) => {
    setValue(value);
    setValid(validate(value));
  };

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
          <div className="flex items-center gap-4">
            <Label htmlFor="rss" className="text-sm font-medium">
              RSS URL
            </Label>
            <Input
              id="rss"
              value={rssUrl}
              onChange={(e) => handleInputChange(e.target.value, setRssUrl, setRssUrlValid, validateRssUrl)}
              placeholder="https://example.com/rss"
              className="flex-grow  w-auto"
            />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="blog" className="text-sm font-medium ">
              블로그명
            </Label>
            <Input
              id="blog"
              value={bloggerName}
              onChange={(e) => handleInputChange(e.target.value, setBloggerName, setBloggerNameValid, validateBlogger)}
              placeholder="블로그명을 입력하세요"
              className="flex-grow  w-auto"
            />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-sm font-medium ">
              신청자 이름
            </Label>
            <Input
              id="name"
              value={userName}
              onChange={(e) => handleInputChange(e.target.value, setUserName, setUserNameValid, validateName)}
              placeholder="이름을 입력하세요"
              className="flex-grow w-auto"
            />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="email" className="text-sm font-medium ">
              이메일
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => handleInputChange(e.target.value, setEmail, setEmailValid, validateEmail)}
              placeholder="example@denamu.com"
              className="flex-grow  w-auto"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              console.log(rssUrlValid, bloggerNameValid, userNameValid, emailValid);
              resetInputs();
            }}
            disabled={!rssUrlValid || !bloggerNameValid || !userNameValid || !emailValid}
            className="bg-black hover:bg-gray-800 text-white"
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
