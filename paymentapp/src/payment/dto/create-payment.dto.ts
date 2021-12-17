import { IsString, IsInt, IsNumber, IsUrl, IsNotEmpty, IsOptional, NotEquals, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export enum Status {
    CREATED = 'CREATED',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    DELIVERED = 'DELIVERED',
}
export class CreatePaymentDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @NotEquals(null)
    readonly orderId: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @NotEquals(null)
    readonly name: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly description: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly userID: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @NotEquals(null)
    readonly address: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @NotEquals(null)
    readonly price: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @NotEquals(null)
    readonly orderNumber: string;
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @NotEquals(null)
    readonly quantity: number;
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly category: string;
    @ApiProperty()
    @IsUrl()
    @IsOptional()
    readonly image: string;
    @ApiProperty()
    @IsEnum(Status)
    status: Status
    @ApiProperty()
    @IsDate()
    readonly createTimestamp: Date;
    @ApiProperty()
    @IsDate()
    readonly updateTimestamp: Date;
}
