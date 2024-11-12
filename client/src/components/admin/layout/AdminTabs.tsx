import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { RssRequestCard } from "../rss/RssRequestCard";
import { RssRequest, RssRequestStatus } from "@/types/rss";

interface AdminTabsProps {
  requests: RssRequest[];
  onAction: (request: RssRequest, action: "approve" | "reject") => void;
}

export const AdminTabs = ({ requests, onAction }: AdminTabsProps) => {
  const getRequestsByStatus = (status: RssRequestStatus) => requests.filter((req) => req.status === status);
  const pendingRequests = getRequestsByStatus("pending");

  return (
    <Tabs defaultValue="pending" className="mb-8">
      <TabsList className="grid w-full grid-cols-3 lg:w-auto">
        <TabsTrigger value="pending" className="relative">
          대기 중
          <Badge variant="secondary" className="ml-2">
            {pendingRequests.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="approved">승인됨</TabsTrigger>
        <TabsTrigger value="rejected">거부됨</TabsTrigger>
      </TabsList>

      <TabsContent value="pending" className="space-y-4 mt-4">
        {pendingRequests.map((request) => (
          <RssRequestCard
            key={request.id}
            request={request}
            onApprove={() => onAction(request, "approve")}
            onReject={() => onAction(request, "reject")}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};
