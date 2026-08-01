export type SearchResult = { title: string; href: string; summary: string; type: string };
export interface SearchAdapter { search(query: string): Promise<SearchResult[]>; index(): Promise<void>; }
class LocalSearchAdapter implements SearchAdapter {
  async search(): Promise<SearchResult[]> { return []; }
  async index(): Promise<void> { return; }
}
export const searchAdapter: SearchAdapter = new LocalSearchAdapter();
