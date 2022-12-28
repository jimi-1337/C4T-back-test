import {
    Prop,
    Schema,
    SchemaFactory
  } from '@nestjs/mongoose';
import {
    Document, SchemaTypes, Types
} from 'mongoose';
import { GenreType } from '../form.types';

  
export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    releaseDate: Date;

    @Prop()
    rating: Number;

    @Prop({ enum: GenreType })
    genre: string;

    @Prop()
    actors: string[];

    @Prop()
    poster: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);