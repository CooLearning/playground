import { Link as ImportedLink } from '../../playground/nn';

export type Link = ImportedLink & {
  savedWeight: number;
}
