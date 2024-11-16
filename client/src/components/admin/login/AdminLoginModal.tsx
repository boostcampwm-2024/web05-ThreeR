import { useState } from "react";

import FormInput from "@/components/RssRegistration/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLogin({ setLogin }: { setLogin: () => void }) {
  const [loginData, setLoginData] = useState<{ id: string; password: string }>({ id: "", password: "" });
  const handleChange = (field: string, value: string) => {
    setLoginData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <div className="h-[100vh] flex justify-center items-center bg-black/80">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>관리자 로그인</CardTitle>
          <CardDescription>관리자 로그인 페이지입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 py-4">
            <FormInput
              id="id"
              label="ID"
              onChange={(value) => handleChange("id", value)}
              placeholder="아이디를 입력해주세요."
              value={loginData.id}
            />
            <FormInput
              id="password"
              label="Password"
              onChange={(value) => handleChange("password", value)}
              placeholder="비밀번호를 입력해주세요."
              value={loginData.password}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-black hover:bg-gray-800 text-white" onClick={setLogin}>
            로그인
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
