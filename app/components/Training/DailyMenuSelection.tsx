"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { MenuSelect } from "./MenuSelect";
import type { SelectTrainingMenu } from "~/db/schema";
import logoRunningMan from "./logo-running-man.svg";

export const DailyMenuSelection = ({
  myMenus,
}: {
  myMenus: SelectTrainingMenu[];
}) => {
  const [selectedMenus, setSelectedMenus] = useState<SelectTrainingMenu[]>([]);

  // メニュー選択時の処理
  const handleAddMenu = (menuId: string) => {
    const menu = myMenus.find((m) => m.id === menuId);
    if (menu && !selectedMenus.some((m) => m.id === menuId)) {
      setSelectedMenus([...selectedMenus, menu]);
    }
  };

  // メニュー削除時の処理
  const handleRemoveMenu = (menuId: string) => {
    setSelectedMenus(selectedMenus.filter((m) => m.id !== menuId));
  };

  return (
    <div className="space-y-3">
      {/* トレーニングメニュー選択エリア */}
      <MenuSelect menus={myMenus} onSelect={handleAddMenu} />

      {/* 選択したトレーニングリスト */}
      {selectedMenus.length > 0 ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selectedMenus.map((menu) => (
              <Card
                key={menu.id}
                className="max-w-[600px] overflow-hidden p-2 sm:w-full"
              >
                <CardContent className="p-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="line-clamp-2 font-semibold">
                        {menu.menuName}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {menu.sets}セット ×{" "}
                        {menu.reps_per_set && `${menu.reps_per_set}回`}{" "}
                        {menu.time_per_set && `${menu.time_per_set}分`}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleRemoveMenu(menu.id)}
                      >
                        <Trash size={16} aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            onClick={() => alert("TODO: 本日のメニューを登録します")}
            className="h-10 w-full font-semibold"
          >
            このメニューで開始する！
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-[400px]">
            <img src={logoRunningMan} alt="Running Man" />
          </div>
        </div>
      )}
    </div>
  );
};
