import { Form } from "react-router";
import { getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const schema = z.object({
  name: z.string(),
  sets: z.number(),
  reps: z.number().optional(),
  time: z.number().optional(),
  distance: z.number().optional(),
});

export const MenuCreateModal = () => {
  const [form, field] = useForm({ constraint: getZodConstraint(schema) });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="aspect-square max-sm:p-0">
          <PlusIcon size={16} aria-hidden="true" />
          新規作成
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>新しいメニューを作成</DialogTitle>
          <DialogDescription>
            作成するメニューの情報を入力してください
          </DialogDescription>
        </DialogHeader>
        {/* メニュー登録フォーム */}
        <Form method="POST">
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name" className="text-right">
                種目名
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="ベンチプレス" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bench_press">ベンチプレス</SelectItem>
                  <SelectItem value="squat">スクワット</SelectItem>
                  <SelectItem value="deadlift">デッドリフト</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">メニュー名</Label>
              <Input id="name" placeholder="覚えやすい名前をつけてください" />
            </div>
            <div>
              <Label htmlFor="sets" className="text-right">
                セット数（回）
              </Label>
              <Input id="sets" placeholder="3" className="col-span-3" />
            </div>
            <div>
              <Label htmlFor="min" className="text-right">
                時間（分）
              </Label>
              <Input id="min" placeholder="3" className="col-span-3" />
            </div>

            <DialogFooter>
              <Button type="submit">作成する</Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
