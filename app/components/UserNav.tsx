import { Home, LogOut, SettingsIcon } from "lucide-react";
import { useNavigate, useSubmit } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import type { SessionUser } from "~/services/auth.server";

type Props = {
  user: SessionUser;
};

export const UserNav: React.FC<Props> = ({ user }) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const avatarUrl = user?.avatarUrl
    ? user.avatarUrl
    : `https://avatar.vercel.sh/${user.avatarUrl}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <Avatar className="rounded-md bg-black">
            <AvatarImage
              src={avatarUrl}
              alt={user?.displayName ?? "User avatar"}
            />
            <AvatarFallback className="text-xs font-bold uppercase">
              {user?.displayName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]" forceMount>
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-semibold">
            {user?.displayName ?? user?.email}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/")}>
            <Home size={16} aria-hidden="true" />
            <span>ホーム</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/")}>
            <SettingsIcon size={16} aria-hidden="true" />
            <span>設定</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                submit(null, { method: "POST", action: "/auth/logout" });
              }, 100);
            }}
          >
            <LogOut size={16} aria-hidden="true" />
            <span>ログアウト</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
