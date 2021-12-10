import { IsString, IsInt, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    readonly name: string;
    @ApiProperty()
    @IsNumber()
    readonly price: number;
    @ApiProperty()
    @IsString()
    readonly address: string;
    @ApiProperty()
    @IsInt()
    readonly quantity: number;
    @ApiProperty()
    @IsString()
    readonly description: string;
    @ApiProperty()
    @IsString()
    readonly category: string;
    @ApiProperty()
    @IsUrl()
    readonly image: string;
}