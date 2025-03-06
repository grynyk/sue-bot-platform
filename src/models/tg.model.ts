export enum PARSE_MODE {
  MARKDOWN_V2 = 'MarkdownV2',
  HTML = 'HTML',
}

export interface DeleteAndReplyOptions {
  deletePreviousMessage?: boolean;
  image?: string
}
