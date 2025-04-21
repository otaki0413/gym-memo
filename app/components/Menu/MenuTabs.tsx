import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export function MenuTabs() {
  return (
    <Tabs defaultValue="all">
      <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="all"
          className="data-[state=active]:after:bg-primary relative rounded-none py-2 font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          すべて
        </TabsTrigger>
        <TabsTrigger
          value="fav"
          className="data-[state=active]:after:bg-primary relative rounded-none py-2 font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          お気に入り
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div>TODO: すべてのメニューが表示</div>
      </TabsContent>
      <TabsContent value="fav">
        <div>TODO: お気に入りのメニューが表示</div>
      </TabsContent>
    </Tabs>
  );
}
