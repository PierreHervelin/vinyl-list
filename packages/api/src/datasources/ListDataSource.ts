import { DateTime } from 'luxon';
import { Types, type Document } from 'mongoose';
import { ListVinyl } from '../__generated__/resolvers-types';
import { VinylModel, VinylStatus } from '../models/vinyl';

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

    async updateInList(_id: string, status: VinylStatus): Promise<ListVinyl> {
        const id = new Types.ObjectId(_id);
        const updated = await VinylModel.findByIdAndUpdate(id, { $set: { status } }, { new: true });
        return transformMongoDocumentToObject<ListVinyl>(updated, 'ListVinyl');
    }

    async getMonthly(month: Date): Promise<ListVinyl> {
        const start = DateTime.fromJSDate(month).toUTC().startOf('month').toJSDate().toISOString();
        const monthly = await VinylModel.find({ status: 'monthly', monthlyDate: start });
        if (monthly.length > 0) {
            throw new Error('MONTHLY_ALREADY_EXISTS');
        }
        const vinyls = await VinylModel.find({ status: 'want' });
        const randomIndex = Math.floor(Math.random() * vinyls.length);
        const updated = await VinylModel.findByIdAndUpdate(
            vinyls[randomIndex]._id,
            { $set: { status: 'monthly', monthlyDate: start } },
            { new: true },
        );
        return transformMongoDocumentToObject<ListVinyl>(updated, 'ListVinyl');
    }
}
