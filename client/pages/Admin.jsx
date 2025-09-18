import AdminTable from "@/components/app/AdminTable";

export default function Admin() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin & Moderation</h1>
        <p className="text-sm text-muted-foreground">Approve therapists, remove content, review flags.</p>
      </div>
      <AdminTable />
    </div>
  );
}
