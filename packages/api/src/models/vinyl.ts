import mongoose, { Schema } from 'mongoose';
import { Vinyl } from '../__generated__/resolvers-types';

export type VinylStatus = 'have' | 'want' | 'monthly';

type IVinyl = Omit<Vinyl, 'id'> & { discogsId: number; status: VinylStatus; monthlyDate?: string; createdAt: string };

export const VinylSchema = new Schema<IVinyl>({
    discogsId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    year: {
        type: String,
    },
    genre: {
        type: [String],
        required: true,
    },
    coverImage: {
        type: String,
    },
    status: {
        type: String,
        enum: ['have', 'want', 'monthly'],
        default: 'want',
    },
    monthlyDate: {
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

export const VinylModel = mongoose.model('Vinyl', VinylSchema, 'vinyls');
