export type Entry = {
  id: number;
  content: string;
  createdAt: Date;
  deletedAt?: Date | null;
  occurredAt?: Date | null;
};

export type DeleteAction = (
  id: number,
  deleteType?: string,
) => Promise<{ success: boolean; error?: string } | undefined>;
