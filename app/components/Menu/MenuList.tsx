"use client";

import { useState } from "react";
import { Edit, PlusIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import type { SelectTrainingMenu } from "~/db/schema";

type MenuListProps = {
  initialMenus: SelectTrainingMenu[];
};

export function MenuList({ initialMenus = [] }: MenuListProps) {
  const [menus, setMenus] = useState<SelectTrainingMenu[]>(initialMenus);

  if (menus.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-2 text-lg font-medium">メニューがありません</h3>
        <p className="text-muted-foreground mb-4">
          新しいトレーニングメニューを作成しましょう
        </p>
        <Button variant="outline" className="aspect-square max-sm:p-0">
          <PlusIcon size={16} aria-hidden="true" />
          新規作成
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {menus.map((menu) => (
        <Card key={menu.id} className="p-2">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="line-clamp-1 font-semibold">
                  {menu.menuName}
                </div>
                <div className="text-muted-foreground text-sm">
                  {menu.sets}セット ×{" "}
                  {menu.reps_per_set && `${menu.reps_per_set}回`}{" "}
                  {menu.time_per_set && `${menu.time_per_set}分`}
                </div>
              </div>
              <div className="flex gap-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() =>
                    alert("TODO: メニュー編集モーダルが表示されます")
                  }
                >
                  <Edit size={20} aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => alert("TODO: メニューを削除します")}
                >
                  <Trash size={20} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
