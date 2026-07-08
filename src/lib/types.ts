export type Entry = {
  id: number;
  content: string;
  createdAt: Date;
  deletedAt?: Date | null;
  occurredAt?: Date | null;
  _key?: number; // Used for framer-motion to avoid re-animating on updates
};

export type DeleteAction = (
  id: number,
  deleteType?: string,
) => Promise<{ success: boolean; error?: string } | undefined>;
