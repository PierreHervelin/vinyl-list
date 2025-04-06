import { ListVinyl } from '../__generated__/resolvers-types';
import { VinylModel } from '../models/vinyl';
import { Types, type Document } from 'mongoose';

export const transformMongoDocumentToObject = <T>(document: Document<unknown>, typename?: string): T => {
    const { _id, ...rest } = document.toObject();
    return {
        ...rest,
        ...(typename && { __typename: typename }),
        _id: _id.toString(),
    };
};

export class ListDataSource {
    async getList(): Promise<ListVinyl[]> {
        const list = await VinylModel.find();
        return list.map(vinyl => {
            return transformMongoDocumentToObject<ListVinyl>(vinyl, 'ListVinyl');
        });
    }

    async addInList(vinyl: Partial<ListVinyl>): Promise<ListVinyl> {
        const vinylModel = new VinylModel(vinyl);
        const saved = await vinylModel.save();
        return transformMongoDocumentToObject<ListVinyl>(saved, 'ListVinyl');
    }

    async removeFromList(_id: string): Promise<ListVinyl> {
        const id = new Types.ObjectId(_id);
        const removed = await VinylModel.findByIdAndDelete(id);
        return transformMongoDocumentToObject<ListVinyl>(removed, 'ListVinyl');
    }
}
