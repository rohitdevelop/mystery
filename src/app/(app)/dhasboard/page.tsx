"use client";

import { useCallback, useEffect, useState } from "react";
import { Message, User } from "@/src/models/User";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcceptMessageSchema } from "@/src/schemas/acceptMessageSchema";
import axios, { AxiosError } from "axios";
import { Apiresponse } from "@/src/types/ApiResponse";
import { Switch } from "@radix-ui/react-switch";
import { Separator } from "@/src/components/ui/separator";
import MessageCard from "@/src/components/MessageCard";

const Page = () => {
  const [message, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);

  const { data: sessions } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  // ------------------------------------------------------------
  // FETCH ACCEPT MESSAGE SETTING
  // ------------------------------------------------------------
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get<Apiresponse>("/api/accept-message");
      setValue("acceptMessages", response.data.isAcceptinMessages ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(axiosError.response?.data.message || "Something went wrong");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // ------------------------------------------------------------
  // FETCH USER MESSAGES
  // ------------------------------------------------------------
  const fetchMessages = useCallback(
    async (refrese: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);

      try {
        const response = await axios.get<Apiresponse>("/api/get-message");
        setMessages(response.data.messages || []);

        if (refrese) toast.success("Messages refreshed!");
      } catch (error) {
        const axiosError = error as AxiosError<Apiresponse>;
        toast.error(
          axiosError.response?.data.message || "Something went wrong"
        );
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setMessages]
  );

  // ------------------------------------------------------------
  // INITIAL LOAD
  // ------------------------------------------------------------
  useEffect(() => {
    if (sessions?.user) {
      fetchAcceptMessage();
      fetchMessages();
    }
  }, [sessions, fetchAcceptMessage, fetchMessages]);

  // ------------------------------------------------------------
  // SWITCH TOGGLE
  // ------------------------------------------------------------
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<Apiresponse>("/api/accept-message", {
        isAcceptinMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message || "Settings updated");
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(axiosError.response?.data.message || "Something went wrong");
    }
  };

  // ------------------------------------------------------------
  // DELETE MESSAGE (LOCAL UPDATE)
  // ------------------------------------------------------------
  const handleDeleteMessage = (messageId: string) => {
    const updated = message.filter((msg) => msg._id !== messageId);
    setMessages(updated);
  };

  // ------------------------------------------------------------
  // IF USER NOT LOGGED IN
  // ------------------------------------------------------------
  if (!sessions || !sessions.user) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  // Now safe to destructure
  const { username } = sessions.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/profile/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile URL copied!");
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">User Dashboard</h1>

      {/* Profile Link */}
      <div>
        <h2 className="font-semibold">Copy Your Unique Link</h2>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={profileUrl}
            readOnly
            className="border p-2 w-full"
          />
          <button onClick={copyToClipboard} className="bg-blue-500 text-white px-4 py-2 rounded">
            Copy
          </button>
        </div>
      </div>

      {/* Switch Control */}
      <div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Accept Messages</h4>
          <p className="text-sm text-muted-foreground">
            Turn on/off message acceptance.
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <Switch
            {...register("acceptMessages")}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span>{acceptMessages ? "On" : "Off"}</span>
        </div>

        <Separator className="my-4" />

        {/* Refresh Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Loading..." : "Refresh Messages"}
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {message.length > 0 ? (
          message.map((msg) => (
            <MessageCard
              key={msg._id}
              message={msg}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
