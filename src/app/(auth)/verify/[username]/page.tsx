"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema } from "@/src/schemas/verifySchema";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { Apiresponse } from "@/src/types/ApiResponse";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
 
const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    // setIsSubmitting(true);
    try {
      const respose = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code,
      });
      toast.success(respose.data.message);
      router.replace(`/sign-in`);
    } catch (error) {
      const axioserror = error as AxiosError<Apiresponse>;
      const errorMessage =
        axioserror.response?.data.message ?? "Error in submition";
      toast.error(errorMessage);
    } finally {
      //   setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4">
      <div className="bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Join Mystery Message</h2>
          <p className="text-gray-500">
            Sign up and start your anonymous adventure
          </p>
        </div>
 
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code.." {...field} />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  className="bg-black text-white rounded-2xl p-3 font-semibold" type="submit">Submit</Button>
      </form>
    </Form>
  
   
      </div>
    </div>
  );
};

export default VerifyAccount;
