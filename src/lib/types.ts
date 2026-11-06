export type Entry = {
  id: number;
  content: string;
  createdAt: Date;
  deletedAt?: Date | null;
  occurredAt?: Date | null;
  tag?: string | null;
  _key?: number; // Used for framer-motion to avoid re-animating on updates
};

// occurredAt is user-editable (e.g. backfilled Daily entries); createdAt is
// the Prisma-managed insertion time, used as a fallback when there's no occurredAt.
export const getEntryDate = (entry: Entry): Date =>
  new Date(entry.occurredAt ?? entry.createdAt);

export type DeleteAction = (
  id: number,
  deleteType?: string,
) => Promise<{ success: boolean; error?: string } | undefined>;
