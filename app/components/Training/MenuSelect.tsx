import type { SelectTrainingMenu } from "~/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type MenuSelectProps = {
  menus: SelectTrainingMenu[];
  onSelect: (menuId: number) => void;
};

export const MenuSelect: React.FC<MenuSelectProps> = ({ menus, onSelect }) => {
  const handleSelect = (value: string) => {
    onSelect(Number(value));
  };

  return (
    <div>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="マイメニューから選択" />
        </SelectTrigger>
        <SelectContent className="max-h-96 overflow-y-auto sm:max-h-none">
          {menus.length === 0 ? (
            <div className="space-y-2 py-6 text-center">
              <p className="text-muted-foreground text-sm">
                メニューが見つかりません
              </p>
            </div>
          ) : (
            menus.map((menu) => (
              <SelectItem key={menu.id} value={menu.id.toString()}>
                <div className="flex flex-col items-start">
                  <span>{menu.menuName}</span>
                  <span className="text-muted-foreground text-xs">
                    {menu.sets}セット ×{" "}
                    {menu.reps_per_set && `${menu.reps_per_set}回`}{" "}
                    {menu.time_per_set && `${menu.time_per_set}分`}
                  </span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
