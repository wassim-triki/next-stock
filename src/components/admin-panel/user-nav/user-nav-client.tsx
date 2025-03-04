// UserNavClient.tsx
"use client";

import React from "react";
import Link from "next/link";
import { LayoutGrid, LogOut, User as UserUI } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { ApiSuccessResponse, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthUser, logoutUser } from "@/api/auth";
import { queryKeys } from "@/lib/constants";

export function UserNavClient() {
  const { data } = useQuery({
    queryKey: [queryKeys.users],
    queryFn: getAuthUser,
  });
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.auth] });
      toast({
        variant: "success",
        title: data.message,
      });
      router.refresh();
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
  };

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    {getInitials(
                      data?.data?.profile?.firstName +
                        " " +
                        data?.data?.profile?.lastName,
                    )}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.data.profile?.firstName} {data?.data.profile?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data?.data.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <UserUI className="mr-3 h-4 w-4 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
