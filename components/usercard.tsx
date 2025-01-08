import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UserCardProps {
  id: string;
  displayName: string;
  email: string;
  createdAt: any;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  displayName,
  email,
  createdAt,
}) => {
  return (
    <Card className="mb-6 w-full max-w-sm rounded-lg shadow-md bg-white hover:shadow-lg transform transition-transform duration-200 border border-gray-200">
      <CardHeader className="border-b border-gray-300 pb-4">
        <CardTitle className="text-lg font-medium text-gray-800">
          {displayName || "Unnamed User"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <p className="text-sm">
          <strong className="text-gray-500">ID:</strong>{" "}
          <span className="text-gray-700">{id}</span>
        </p>
        <p className="text-sm">
          <strong className="text-gray-500">Email:</strong>{" "}
          <span className="text-gray-700">{email || "N/A"}</span>
        </p>
        <p className="text-sm">
          <strong className="text-gray-500">Created At:</strong>{" "}
          <span className="text-gray-700">
            {createdAt
              ? new Date(createdAt.seconds * 1000).toLocaleString()
              : "N/A"}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
