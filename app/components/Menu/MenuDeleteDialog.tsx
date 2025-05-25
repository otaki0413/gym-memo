import { useState } from "react";
import { useFetcher } from "react-router";
import { Trash, CircleAlertIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type MenuDeleteDialogProps = {
  menuId: string;
  menuName: string;
};

export const MenuDeleteDialog: React.FC<MenuDeleteDialogProps> = ({
  menuId,
  menuName,
}) => {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <Trash size={20} aria-hidden="true" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>メニューの削除</AlertDialogTitle>
            <AlertDialogDescription>
              「{menuName}」を削除しますか？ この操作は元に戻せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <fetcher.Form method="POST">
            <input type="hidden" name="menuId" value={menuId} />
            <AlertDialogAction asChild>
              <Button
                type="submit"
                name="intent"
                value="delete"
                variant="destructive"
                className="w-full"
                disabled={fetcher.state !== "idle"}
              >
                {fetcher.state !== "idle" ? "削除中..." : "削除する"}
              </Button>
            </AlertDialogAction>
          </fetcher.Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
