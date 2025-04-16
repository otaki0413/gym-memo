"use client";

import { useState } from "react";

import { Edit, PlusIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type TrainingMenu = {
  id: string;
  name: string;
  sets: number;
  reps: number;
};

type MenuListProps = {
  initialMenus: TrainingMenu[];
};

export function MenuList({ initialMenus }: MenuListProps) {
  const [menus, setMenus] = useState<TrainingMenu[]>(initialMenus);

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
    <div className="grid gap-3 sm:grid-cols-2">
      {menus.map((menu) => (
        <Card key={menu.id} className="py-3">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">{menu.name}</h3>
                <p className="text-muted-foreground">
                  {menu.sets}セット × {menu.reps}回
                </p>
              </div>
              <div className="flex gap-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() =>
                    alert("TODO: メニュー編集モーダルが表示されます")
                  }
                >
                  <Edit size={20} aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12"
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
