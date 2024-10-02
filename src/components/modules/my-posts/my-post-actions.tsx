"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectUrls } from "@/const";
import { cn } from "@/utils/styles";
import {
  BookDashed,
  Calendar,
  Ellipsis,
  Eye,
  Flame,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";

type Props = {
  type?: "all-posts" | "post";
  postId: string;
  isPostAlreadyPublished: boolean;
  onDeletePostClick: () => void;
  onSchedulePublicationDateClick: () => void;
  onChangePublicationStatusClick: () => void;
  canChangePublicationStatus: boolean;
};

export const MyPostActionsDropdown = (props: Props) => {
  const {
    type = "all-posts",
    isPostAlreadyPublished,
    canChangePublicationStatus,
    onChangePublicationStatusClick,
    postId,
    onDeletePostClick,
    onSchedulePublicationDateClick,
  } = props;

  const scheduleInner = (
    <>
      <Calendar className="w-4 h-4" /> Schedule post
    </>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={type === "all-posts" ? "icon" : undefined}
          variant={"outline"}
          color={"secondary"}
          className={cn(type === "post" && "flex items-center gap-2")}
          aria-label="Open menu"
        >
          {type === "post" ? (
            <>
              Select action <Flame />
            </>
          ) : (
            <Ellipsis />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {type === "all-posts" && (
          <DropdownMenuItem asChild>
            <Link
              href={ProjectUrls.myPost(postId)}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> See post
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link
            href={ProjectUrls.editMyPost(postId)}
            className="flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" /> Edit post
          </Link>
        </DropdownMenuItem>
        {!isPostAlreadyPublished ? (
          <DropdownMenuItem asChild>
            <button
              onClick={onSchedulePublicationDateClick}
              className="flex items-center gap-2"
            >
              {scheduleInner}
            </button>
          </DropdownMenuItem>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenuItem disabled asChild>
                <button className="flex items-center gap-2">
                  {scheduleInner}
                </button>
              </DropdownMenuItem>
            </TooltipTrigger>
            <TooltipContent>
              The publication date cannot be changed as the post has already
              been published.
            </TooltipContent>
          </Tooltip>
        )}

        {canChangePublicationStatus && (
          <DropdownMenuItem asChild>
            <button
              type="button"
              onClick={onChangePublicationStatusClick}
              className="flex items-center gap-2"
            >
              <BookDashed className="w-4 h-4" /> Change publication status
            </button>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <button
            type="button"
            onClick={onDeletePostClick}
            className="flex items-center gap-2 text-destructive"
          >
            <Trash className="w-4 h-4" /> Delete post
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
