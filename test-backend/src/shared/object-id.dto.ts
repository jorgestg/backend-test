import { IsObjectId } from '../shared/object-id.decorator';

/** Use to validate ObjectIDs on params. */
export class ObjectIdDto {
  @IsObjectId()
  id: string;
}
