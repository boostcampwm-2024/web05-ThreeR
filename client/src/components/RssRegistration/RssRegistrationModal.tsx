import { useState } from "react";

import FormInput from "@/components/RssRegistration/FormInput";
import Alert from "@/components/common/Alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { useRegisterRss } from "@/hooks/queries/useRegisterRss";

import { validateRssUrl, validateName, validateEmail, validateBlogger } from "./RssValidation";
import { useRegisterModalStore } from "@/store/useRegisterModalStrore";
import { AlertType } from "@/types/alert";
import { RegisterRss } from "@/types/rss";

const Rss = [
  {
    name: "Tistory",
    url: "https://{blogname}.tistory.com/rss",
  },
  {
    name: "Velog",
    url: "https://v2.velog.io/rss/@{username}",
  },
  {
    name: "Medium",
    url: "https://medium.com/feed/@{username}",
  },
];

export default function RssRegistrationModal({ onClose, rssOpen }: { onClose: () => void; rssOpen: boolean }) {
  const [alertOpen, setAlertOpen] = useState<AlertType>({ title: "", content: "", isOpen: false });

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

  const onSuccess = () => {
    setAlertOpen({
      title: "RSS 요청 성공!",
      content: "관리자가 검토후 처리 결과를 입력해주신 메일을 통해 전달드릴 예정이에요!",
      isOpen: true,
    });
  };

  const onError = () => {
    setAlertOpen({
      title: "RSS 요청 실패!",
      content: "입력한 정보를 확인하거나 다시 시도해주세요. 문제가 계속되면 관리자에게 문의하세요!",
      isOpen: true,
    });
  };

  const { mutate } = useRegisterRss(onSuccess, onError);

  const handleAlertClose = () => {
    setAlertOpen({ title: "", content: "", isOpen: false });
    resetInputs();
    onClose();
  };
  const handleRegister = () => {
    const data: RegisterRss = {
      rssUrl: rssUrl,
      blog: bloggerName,
      name: userName,
      email: email,
    };

    mutate(data);
  };
  return (
    <Dialog open={rssOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground font-bold">RSS 등록</DialogTitle>
          <DialogDescription className="flex flex-col text-muted-foreground">
            <span>RSS 주소 검토 후 운영진이 서비스에 추가합니다.</span>
            <span>검토 및 등록에는 영업일 기준 3-5일이 소요될 수 있습니다.</span>
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>RSS 예시</AccordionTrigger>
            <AccordionContent>
              <InfoCard />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
            onClick={handleRegister}
            disabled={!isFormValid()}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
      <Alert alertOpen={alertOpen} onClose={handleAlertClose} />
    </Dialog>
  );
}

function InfoCard() {
  return (
    <>
      {Rss.map((r) => {
        return (
          <div>
            <b>{r.name}</b>
            <p>{r.url}</p>
            <Separator className="my-2" />
          </div>
        );
      })}
    </>
  );
}
