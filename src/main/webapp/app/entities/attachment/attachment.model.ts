export interface IAttachment {
  id?: number;
  name?: string;
  fileContentType?: string | null;
  file?: string | null;
}

export class Attachment implements IAttachment {
  constructor(public id?: number, public name?: string, public fileContentType?: string | null, public file?: string | null) {}
}

export function getAttachmentIdentifier(attachment: IAttachment): number | undefined {
  return attachment.id;
}
