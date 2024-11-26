import { useState } from "react";

import { AxiosError } from "axios";

import { RejectModal } from "@/components/admin/rss/RejectModal";
import AcceptedTab from "@/components/admin/taps/AcceptedTap";
import PendingTab from "@/components/admin/taps/PendingTap";
import RejectedTab from "@/components/admin/taps/RejectedTap";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useFetchRss, useFetchAccept, useFetchReject } from "@/hooks/queries/useFetchRss";
import { useAdminAccept, useAdminReject } from "@/hooks/queries/useRssActions";

import { AdminRssData } from "@/types/rss";
import { AdminRequest } from "@/types/rss";

type SelectedBlogType = {
  blogName: string;
  blogId: number;
};

export const AdminTabs = () => {
  const [selectedBlog, setSelectedBlog] = useState<SelectedBlogType>({ blogId: 0, blogName: "" });
  const [reason, setReason] = useState("");

  const {
    data: pendingData,
    isLoading: isPendingLoading,
    error: pendingError,
    refetchData: refetchRss,
  } = useFetchRss();

  const {
    data: acceptedData,
    isLoading: isAcceptedLoading,
    error: acceptedError,
    refetchData: refetchAccept,
  } = useFetchAccept();

  const {
    data: rejectedData,
    isLoading: isRejectedLoading,
    error: rejectedError,
    refetchData: refetchReject,
  } = useFetchReject();

  const onSuccess = () => {
    setReason("");
    refetchRss();
    refetchAccept();
    refetchReject();
  };

  const onError = (error: unknown) => {
    if (error instanceof AxiosError) {
      console.error("Axios Error:", error.message, error.response?.data);
    } else if (error instanceof Error) {
      console.error("General Error:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    setReason("");
    refetchRss();
    refetchAccept();
    refetchReject();
  };

  const { mutate: acceptMutate } = useAdminAccept(onSuccess, onError);
  const { mutate: rejectMutate } = useAdminReject(onSuccess, onError);

  const handleActions = (data: AdminRequest, actions: "accept" | "reject") => {
    actions === "accept" ? acceptMutate(data) : rejectMutate(data);
  };

  const handleSelectedBlog = ({ blogName, blogId }: SelectedBlogType) => {
    setSelectedBlog({ blogName, blogId });
  };

  if (isPendingLoading || isAcceptedLoading || isRejectedLoading) return <div>Loading...</div>;
  if (pendingError || acceptedError || rejectedError) return <div>Error loading data</div>;

  const pendingRss: AdminRssData[] = pendingData.data;
  const acceptedRss: AdminRssData[] = acceptedData.data;
  const rejectedRss: AdminRssData[] = rejectedData.data;
  return (
    <div>
      <Tabs defaultValue="pending" className="mb-8">
        <TabsList className="flex w-full lg:w-auto items-center">
          <TabsTrigger value="pending" className="relative w-full">
            대기 중
            <Badge variant="secondary" className="ml-2">
              {pendingRss.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="accepted" className="w-full">
            승인됨
          </TabsTrigger>
          <TabsTrigger value="rejected" className="w-full">
            거부됨
          </TabsTrigger>
        </TabsList>

        <PendingTab
          data={pendingRss}
          onApprove={(request) => handleActions(request, "accept")}
          onReject={(request) => handleSelectedBlog({ blogName: request.name, blogId: request.id })}
        />
        <AcceptedTab data={acceptedRss} />
        <RejectedTab data={rejectedRss} />
      </Tabs>
      <RejectModal
        blogName={selectedBlog?.blogName}
        onSubmit={() => handleActions({ id: selectedBlog.blogId, rejectMessage: reason }, "reject")}
        onCancel={() => setSelectedBlog({ blogId: 0, blogName: "" })}
        rejectMessage={reason}
        handleReason={setReason}
      />
    </div>
  );
};
