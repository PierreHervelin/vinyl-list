import mongoose, { Schema } from 'mongoose';
import { Vinyl } from '../__generated__/resolvers-types';

type IVinyl = Omit<Vinyl, 'id'> & { discogsId: number; createdAt: string };

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
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

export const VinylModel = mongoose.model('Vinyl', VinylSchema, 'vinyls');
