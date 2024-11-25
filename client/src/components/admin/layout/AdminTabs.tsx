import { useState } from "react";

import { AxiosError } from "axios";

import { RejectModal } from "@/components/admin/rss/RejectModal";
import { RssRequestCard } from "@/components/admin/rss/RssRequestCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { useFetchRss, useFetchAccept, useFetchReject } from "@/hooks/queries/useFetchRss";
import { useAdminAccept, useAdminReject } from "@/hooks/queries/useRssActions";

import { AdminRequest } from "@/types/rss";

type SelectedBlogType = {
  blogName: string;
  blogId: number;
};

export const AdminTabs = () => {
  const [selectedBlog, setSelectedBlog] = useState<SelectedBlogType>({ blogId: 0, blogName: "" });
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

  const pendingRss = pendingData.data;
  const acceptedRss = acceptedData.data;
  const rejectedRss = rejectedData.data;
  console.log(pendingData);
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

        <TabsContent value="pending" className="space-y-4 mt-4">
          {pendingRss.map((request) => (
            <RssRequestCard
              key={request.id}
              request={request}
              onApprove={() => handleActions(request, "accept")}
              onReject={() =>
                handleSelectedBlog({
                  blogName: request.name,
                  blogId: request.id,
                })
              }
            />
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4 mt-4">
          {acceptedRss.map((request) => (
            <RssRequestCard
              key={request.id}
              request={request}
              onApprove={() => handleActions(request, "accept")}
              onReject={() =>
                handleSelectedBlog({
                  blogName: request.name,
                  blogId: request.id,
                })
              }
            />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 mt-4">
          {rejectedRss.map((request) => (
            <RssRequestCard
              key={request.id}
              request={request}
              onApprove={() => handleActions(request, "accept")}
              onReject={() =>
                handleSelectedBlog({
                  blogName: request.name,
                  blogId: request.id,
                })
              }
            />
          ))}
        </TabsContent>
      </Tabs>
      <RejectModal
        blogName={selectedBlog?.blogName}
        onSubmit={() => handleActions({ id: selectedBlog.blogId }, "reject")}
        onCancel={() => setSelectedBlog({ blogId: 0, blogName: "" })}
      />
    </div>
  );
};
