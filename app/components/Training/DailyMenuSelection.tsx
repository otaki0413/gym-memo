"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { MenuSelect } from "./MenuSelect";

// モックメニュー
const MOCK_MENUS: TrainingMenu[] = [
  { id: 1, name: "ベンチプレス", sets: 3, reps: 10 },
  { id: 2, name: "スクワット", sets: 4, reps: 8 },
  { id: 3, name: "デッドリフト", sets: 3, reps: 5 },
  { id: 4, name: "ラットプルダウン", sets: 3, reps: 12 },
  { id: 5, name: "ショルダープレス", sets: 3, reps: 10 },
  { id: 6, name: "アームカール", sets: 3, reps: 15 },
  { id: 7, name: "レッグプレス", sets: 4, reps: 10 },
  { id: 8, name: "プルアップ", sets: 3, reps: 8 },
  { id: 9, name: "ディップス", sets: 3, reps: 12 },
  { id: 10, name: "カーフレイズ", sets: 4, reps: 20 },
];

type TrainingMenu = {
  id: number;
  name: string;
  sets: number;
  reps: number;
};

export const DailyMenuSelection = () => {
  const [selectedMenus, setSelectedMenus] = useState<TrainingMenu[]>([]);

  // メニュー選択時の処理
  const handleAddMenu = (menuId: number) => {
    const menu = MOCK_MENUS.find((m) => m.id === menuId);
    if (menu && !selectedMenus.some((m) => m.id === menuId)) {
      setSelectedMenus([...selectedMenus, menu]);
    }
  };

  // メニュー削除時の処理
  const handleRemoveMenu = (menuId: number) => {
    setSelectedMenus(selectedMenus.filter((m) => m.id !== menuId));
  };

  return (
    <div className="space-y-3">
      {/* トレーニングメニュー選択エリア */}
      <MenuSelect menus={MOCK_MENUS} onSelect={handleAddMenu} />

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
                        {menu.name}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {menu.sets}セット × {menu.reps}回
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
            className="h-10 w-full font-bold"
          >
            このメニューで開始する！
          </Button>
        </div>
      ) : (
        <div className="text-muted-foreground py-8 text-center">
          <p>TODO: 未選択のときは遊び心で画像を表示する</p>
        </div>
      )}
    </div>
  );
};
