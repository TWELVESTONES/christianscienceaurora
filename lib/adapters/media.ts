export type MediaRecord = { url: string; altText: string; width: number; height: number; mimeType: string; permissionStatus: string };
export interface MediaAdapter { upload(file: Uint8Array, metadata: Omit<MediaRecord, "url">): Promise<MediaRecord>; delete(url: string): Promise<void>; }
class LocalMediaAdapter implements MediaAdapter {
  async upload(): Promise<MediaRecord> { throw new Error("Production media storage is not configured."); }
  async delete(): Promise<void> { return; }
}
export const mediaAdapter: MediaAdapter = new LocalMediaAdapter();
