import { useState } from "react";

import { AxiosError } from "axios";

import { RejectModal } from "@/components/admin/rss/RejectModal";
import { RssRequestCard } from "@/components/admin/rss/RssRequestCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { useFetchRss } from "@/hooks/useFetchRss";
import { useAdminAccept, useAdminReject } from "@/hooks/useRssActions";

import { AdminRequest } from "@/types/rss";

type SelectedBlogType = {
  blogName: string;
  blogId: number;
};
export const AdminTabs = () => {
  const [selectedBlog, setSelectedBlog] = useState<SelectedBlogType>({ blogId: 0, blogName: "" });
  const { data, isLoading, error, refetchRss } = useFetchRss();

  const onSuccess = () => {
    refetchRss();
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
  };

  const { mutate: acceptMutate } = useAdminAccept(onSuccess, onError);
  const { mutate: rejectMutate } = useAdminReject(onSuccess, onError);

  const handleActions = (data: AdminRequest, actions: "accept" | "reject") => {
    actions === "accept" ? acceptMutate(data) : rejectMutate(data);
  };

  const handleSelectedBlog = ({ blogName, blogId }: SelectedBlogType) => {
    setSelectedBlog({ blogName, blogId });
  };

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const pendingRss = data?.data;

  return (
    <div>
      <Tabs defaultValue="pending" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="pending" className="relative">
            대기 중
            <Badge variant="secondary" className="ml-2">
              {pendingRss.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">승인됨</TabsTrigger>
          <TabsTrigger value="rejected">거부됨</TabsTrigger>
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
      </Tabs>
      <RejectModal
        blogName={selectedBlog?.blogName}
        onSubmit={() => handleActions({ id: selectedBlog.blogId }, "reject")}
        onCancel={() => setSelectedBlog({ blogId: 0, blogName: "" })}
      />
    </div>
  );
};
